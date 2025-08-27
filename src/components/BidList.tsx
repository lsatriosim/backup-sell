'use client';
import { useStore } from '@/lib/store';
import { Post } from '@/lib/types';

export default function BidList({ post }: { post: Post }) {
  const { users, currentUser } = useStore();
  const isSeller = currentUser.id === post.sellerId;
  const fmt = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="card p-5">
      <h4 className="font-semibold mb-3">Current Bids</h4>
      {post.bids.length === 0 ? (
        <p className="text-sm text-zinc-500">No bids yet.</p>
      ) : (
        <ul className="space-y-3">
          {post.bids.map(b => {
            const buyer = users.find(u => u.id === b.buyerId);
            return (
              <li key={b.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b last:border-none pb-3">
                <div className="text-sm">
                  <span className="font-medium">{buyer?.username}</span> bid <strong>€{b.amount}</strong>
                  <span className="text-zinc-500"> • {fmt.format(new Date(b.createdAt))}</span>
                </div>
                <div className="text-xs text-zinc-600">
                  {isSeller ? (
                    <div>
                      <div>Contact: <span className="font-medium">{b.contactPhone || buyer?.contactPhone || '—'}</span></div>
                      {b.contactNote && <div>Note: {b.contactNote}</div>}
                    </div>
                  ) : (
                    <div className="italic">Buyer contact visible to seller only</div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
}
