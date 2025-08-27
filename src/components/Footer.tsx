import DonateCard from './DonateCard';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-zinc-200">
      <div className="container-responsive py-8 grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <h3 className="font-semibold text-zinc-800">Disclaimer</h3>
          <ul className="text-sm text-zinc-600 list-disc pl-6 space-y-1">
            <li>Platform does <strong>not</strong> handle payments or guarantees.</li>
            <li><strong>Seller</strong> must contact buyer to arrange transactions.</li>
            <li><strong>Buyer</strong> must verify transferability and proof of ownership (invoice, payment proof).</li>
            <li>Be cautious of suspicious contacts (foreign numbers, etc.).</li>
            <li>Platform carries <strong>no responsibilities</strong>; this is a community service with no fees.</li>
          </ul>
        </div>
        <DonateCard />
      </div>
      <div className="bg-zinc-50">
        <div className="container-responsive py-4 text-xs text-zinc-500">
          © {new Date().getFullYear()} Backup Sell — for the community.
        </div>
      </div>
    </footer>
  );
}
