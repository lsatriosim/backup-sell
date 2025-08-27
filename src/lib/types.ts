export type ID = string;

export type User = {
  id: ID;
  name: string;
  username: string;
  contactPhone?: string;
  contactNote?: string;
};

export type Bid = {
  id: ID;
  postId: ID;
  buyerId: ID;
  amount: number;
  createdAt: string;
  contactPhone?: string;
  contactNote?: string;
};

export type PostStatus = "OPEN" | "CLOSED";

export type Post = {
  id: ID;
  title: string;
  location: string;
  dateISO: string; // e.g., 2025-08-30
  startTime: string; // 18:00
  endTime: string;   // 19:00
  minBid: number;
  status: PostStatus;
  sellerId: ID;
  notes?: string;
  bids: Bid[];
};
