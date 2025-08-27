'use client';
import { useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import BidList from '@/components/BidList';
import BidForm from '@/components/BidForm';
import StatusBadge from '@/components/StatusBadge';

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const { posts, users, setStatus, currentUser } = useStore();
  const post = posts.find(p => p.id === params.id);
  if (!post) return <div>Post not found.</div>;

  const seller = users.find(u => u.id === post.sellerId);
  const isSeller = currentUser.id === post.sellerId;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="card p-6">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-semibold">Padel Court Booking @ {post.location}</h1>
            <StatusBadge status={post.status} />
          </div>
          <div className="text-zinc-700 space-y-1">
            <div>Date: {new Date(post.dateISO).toLocaleDateString()} • {post.startTime}–{post.endTime}</div>
            <div>Minimum Bid: <strong>€{post.minBid}</strong></div>
            <div className="text-sm text-zinc-500">Posted by: <span className="font-medium">{seller?.username}</span></div>
          </div>
          {post.notes && <p className="text-sm text-zinc-600 mt-3">{post.notes}</p>}
          <hr className="divider" />
          {isSeller ? (
            <div className="flex gap-3">
              <button onClick={()=>setStatus(post.id,'OPEN')} className="btn btn-outline">Mark OPEN</button>
              <button onClick={()=>setStatus(post.id,'CLOSED')} className="btn btn-outline">Mark CLOSED</button>
            </div>
          ) : (
            <p className="text-xs text-zinc-500">Seller contact is hidden. Seller will reach out if they accept your bid.</p>
          )}
        </div>
        <BidList post={post} />
        {post.status === 'OPEN' && !isSeller && <BidForm postId={post.id} minBid={post.minBid} />}
      </div>
      <aside className="space-y-4">
        <div className="card p-5 text-sm text-zinc-600">
          <h4 className="font-semibold mb-2">Important</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>No transactions on this platform.</li>
            <li>Seller must contact buyer to proceed.</li>
            <li>Buyer: check transferability & proof of ownership.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
