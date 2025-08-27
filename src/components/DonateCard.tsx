export default function DonateCard() {
  return (
    <div className="card p-5">
      <h3 className="font-semibold">Support the platform</h3>
      <p className="text-sm text-zinc-600 mt-1">
        This service is free and run for community benefit. No fees, no responsibilities for transactions.
      </p>
      <div className="mt-3 flex gap-3">
        <a className="btn btn-primary" href="https://www.buymeacoffee.com/" target="_blank">Buy me a Coffee</a>
        <a className="btn btn-outline" href="#" aria-disabled>Become a Sponsor</a>
      </div>
    </div>
  );
}
