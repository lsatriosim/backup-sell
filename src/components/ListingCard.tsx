import Link from 'next/link';
import StatusBadge from './StatusBadge';
import { Post } from '@/lib/types';

export default function ListingCard({ post }: { post: Post }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Padel Court Booking</h3>
          <p className="text-muted">{new Date(post.dateISO).toLocaleDateString()} • {post.startTime}–{post.endTime}</p>
          <p className="text-muted">{post.location}</p>
          <p className="text-muted">Min Bid: <strong>€{post.minBid}</strong></p>
        </div>
        <StatusBadge status={post.status} />
      </div>
      <div className="mt-4">
        <Link className="btn btn-primary w-full sm:w-auto" href={`/post/${post.id}`}>View Details</Link>
      </div>
    </div>
  );
}
