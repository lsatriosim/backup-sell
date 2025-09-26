import type { Metadata } from 'next';
import './globals.css';
import { UserProvider } from './context/UserContext';
import BottomNavWrapper from '@/components/BottomNavigationBarWrapper';

export const metadata: Metadata = {
  title: 'Backup Sell — Community Resell Board',
  description: 'Platform to trade backup tickets and bookings',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='font-rubik'>       
        <UserProvider>
          <main className="pb-20 bg-neutral-100 min-h-screen w-full relative z-0">{children}</main>
          <BottomNavWrapper />
        </UserProvider>
      </body>
    </html>
  );
}
