'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Post } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const { createPost, currentUser } = useStore();
  const router = useRouter();
  const [form, setForm] = useState({
    title: 'Padel Court Booking',
    location: '',
    dateISO: '',
    startTime: '',
    endTime: '',
    minBid: 0,
    status: 'OPEN' as Post['status'],
    notes: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const post = createPost({ ...form, sellerId: currentUser.id });
    router.push('/post/' + post.id);
  };

  return (
    <div className="max-w-2xl mx-auto card p-6 space-y-4">
      <h1 className="text-xl font-semibold">Create New Listing</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-600">Court Location</label>
            <input className="input mt-1" value={form.location} onChange={e=>setForm({...form, location: e.target.value})} required />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Date</label>
            <input type="date" className="input mt-1" value={form.dateISO} onChange={e=>setForm({...form, dateISO: e.target.value})} required />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Start Time</label>
            <input type="time" className="input mt-1" value={form.startTime} onChange={e=>setForm({...form, startTime: e.target.value})} required />
          </div>
          <div>
            <label className="text-sm text-zinc-600">End Time</label>
            <input type="time" className="input mt-1" value={form.endTime} onChange={e=>setForm({...form, endTime: e.target.value})} required />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Minimum Bid (€)</label>
            <input type="number" className="input mt-1" value={form.minBid} onChange={e=>setForm({...form, minBid: Number(e.target.value)})} min={0} required />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Status</label>
            <select className="select mt-1" value={form.status} onChange={e=>setForm({...form, status: e.target.value as Post['status']})}>
              <option value="OPEN">OPEN</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm text-zinc-600">Notes</label>
          <textarea className="textarea mt-1" rows={4} value={form.notes} onChange={e=>setForm({...form, notes: e.target.value})} />
        </div>
        <button className="btn btn-primary">Post Item</button>
      </form>
      <p className="text-xs text-zinc-500">
        Reminder: No payments occur here. Keep your contact details in your profile; buyers cannot see seller contact.
      </p>
    </div>
  );
}
