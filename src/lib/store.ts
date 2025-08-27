'use client';

import { create } from 'zustand';
import { Post, Bid, ID, User } from './types';
import { posts as seedPosts, users as seedUsers } from './mockData';

type State = {
  users: User[];
  posts: Post[];
  currentUser: User; // mock signed-in user
  createPost: (p: Omit<Post, 'id' | 'bids'>) => Post;
  placeBid: (postId: ID, bid: Omit<Bid, 'id'|'postId'|'createdAt'|'buyerId'>) => Bid;
  setStatus: (postId: ID, status: 'OPEN' | 'CLOSED') => void;
};

let idCounter = 1000;
const newId = () => 'id' + (++idCounter);

export const useStore = create<State>((set, get) => ({
  users: seedUsers,
  posts: seedPosts,
  currentUser: seedUsers[1], // default logged-in as a buyer for demo
  createPost: (p) => {
    const post: Post = { ...p, id: newId(), bids: [] };
    set({ posts: [post, ...get().posts] });
    return post;
  },
  placeBid: (postId, bid) => {
    const now = new Date().toISOString();
    const b: Bid = {
      ...bid,
      id: newId(),
      postId,
      createdAt: now,
      buyerId: get().currentUser.id,
    };
    set({
      posts: get().posts.map((p) =>
        p.id === postId ? { ...p, bids: [...p.bids, b] } : p
      ),
    });
    return b;
  },
  setStatus: (postId, status) => {
    set({
      posts: get().posts.map((p) =>
        p.id === postId ? { ...p, status } : p
      ),
    });
  },
}));
