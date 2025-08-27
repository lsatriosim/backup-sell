'use client';
import { useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import ListingCard from '@/components/ListingCard';

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const { users, posts, currentUser } = useStore();
  const user = users.find(u => u.id === params.id);
  if (!user) return <div>User not found.</div>;

  const listings = posts.filter(p => p.sellerId === user.id);

  const isSelf = currentUser.id === user.id;

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-semibold">@{user.username}</h1>
        {isSelf ? (
          <div className="text-sm text-zinc-600 mt-1">Your contact (visible to sellers only on bids): <span className="font-medium">{user.contactPhone || '—'}</span></div>
        ) : (
          <div className="text-sm text-zinc-500 mt-1 italic">Seller contact is not displayed. Seller will contact you if your bid is selected.</div>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Listings</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {listings.map(p => <ListingCard key={p.id} post={p} />)}
        </div>
      </div>
    </div>
  );
}
