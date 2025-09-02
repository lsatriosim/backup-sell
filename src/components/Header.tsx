'use client';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { CircleHelp } from 'lucide-react';
import Image from "next/image";

export default function Header() {
  const { currentUser } = useStore();
  return (
    <header className="border-b border-zinc-200 bg-surface-primary text-neutral-900">
      <div className="container-responsive flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-surface-secondary ml-4 rounded-full flex items-center justify-center w-20 h-20">
            <Image
              src="/backupsell_logo.png"
              alt="BackupSell Logo"
              width={64}
              height={64}
              className="h-16 w-16"
              priority
            />
          </div>
          <div className="font-semibold text-2xl text-neutral-100">Backup Sell</div>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:bg-surface-secondary rounded-2xl"><p className='m-2 hover:text-brand text-xl'>Home</p></Link>
          <Link href="/marketplace" className="hover:bg-surface-secondary rounded-2xl"><p className='m-2 hover:text-brand text-xl'>Marketplace</p></Link>
          <Link href="/create" className="hover:bg-surface-secondary rounded-2xl"><p className='m-2 hover:text-brand text-xl'>Post Item</p></Link>
          <Link href="/about" className="hover:bg-surface-secondary rounded-2xl flex items-center gap-1"><p className='m-2 flex items-center gap-1 hover:text-brand text-xl'><CircleHelp className="h-4 w-4" /> Info</p></Link>
        </nav>
        <Link href={`/profile/${currentUser.id}`} className="text-sm px-3 py-1.5 rounded-lg hover:bg-zinc-200 m-4 bg-sky-300">{currentUser.username}</Link>
      </div>
    </header>
  );
}
