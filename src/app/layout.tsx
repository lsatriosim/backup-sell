import type { Metadata } from 'next';
import './globals.css';
import BottomNavigationBar from '@/components/BottomNavigationBar';

export const metadata: Metadata = {
  title: 'Backup Sell — Community Resell Board',
  description: 'Community board to resell padel court bookings. No transactions on-site.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='font-rubik'>
        <main className="pb-16 bg-neutral-100 min-h-screen w-full">{children}</main>
        <BottomNavigationBar />
      </body>
    </html>
  );
}
