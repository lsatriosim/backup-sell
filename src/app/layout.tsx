import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Backup Sell — Community Resell Board',
  description: 'Community board to resell padel court bookings. No transactions on-site.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container-responsive py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
