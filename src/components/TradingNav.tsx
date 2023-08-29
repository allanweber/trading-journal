import Link from 'next/link';

export default function TradingNav() {
  return (
    <nav>
      <span>
        <Link href={`./dashboard`}>Dashboard</Link>
      </span>
      <span className="ml-2">
        <Link href={`./entries`}>Entries</Link>
      </span>
    </nav>
  );
}
