'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';

export default function BidForm({ postId, minBid }: { postId: string; minBid: number; }) {
  const { placeBid } = useStore();
  const [amount, setAmount] = useState<number>(minBid);
  const [contactPhone, setContactPhone] = useState('');
  const [contactNote, setContactNote] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < minBid) return alert(`Minimum bid is €${minBid}`);
    placeBid(postId, { amount, contactPhone, contactNote });
    setContactPhone(''); setContactNote('');
    alert('Bid placed! Seller will contact you directly if they choose your bid.');
  };

  return (
    <form onSubmit={onSubmit} className="card p-5 space-y-3">
      <h4 className="font-semibold">Place a Bid</h4>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-zinc-600">Your Bid (€)</label>
          <input type="number" className="input mt-1" value={amount} min={minBid} onChange={e=>setAmount(Number(e.target.value))} required />
          <p className="text-xs text-zinc-500 mt-1">Minimum bid set by seller: €{minBid}</p>
        </div>
        <div>
          <label className="text-sm text-zinc-600">Your Contact (visible to seller only)</label>
          <input className="input mt-1" placeholder="+62 ..." value={contactPhone} onChange={e=>setContactPhone(e.target.value)} required />
        </div>
      </div>
      <div>
        <label className="text-sm text-zinc-600">Note to Seller (optional)</label>
        <input className="input mt-1" placeholder="Preferred time to chat, etc." value={contactNote} onChange={e=>setContactNote(e.target.value)} />
      </div>
      <button className="btn btn-primary">Submit Bid</button>
      <p className="text-xs text-zinc-500">
        ⚠️ No payment on this platform. Seller will contact you directly. Verify transferability and proof of ownership.
      </p>
    </form>
  );
}
