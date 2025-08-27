import { Post } from '@/lib/types';

export default function StatusBadge({ status }: { status: Post['status'] }) {
  const isOpen = status === 'OPEN';
  return (
    <span className={`badge ${isOpen ? 'badge-open' : 'badge-closed'}`}>
      {isOpen ? 'OPEN' : 'CLOSED'}
    </span>
  );
}
