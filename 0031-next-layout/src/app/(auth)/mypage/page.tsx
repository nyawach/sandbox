import Link from "next/link";

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <Link href="/about">About Page</Link>
      <Link href="/">Home Page</Link>
    </div>
  );
}
