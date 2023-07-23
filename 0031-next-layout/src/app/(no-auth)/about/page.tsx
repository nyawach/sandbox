import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <Link href="/mypage">My Page</Link>
      <Link href="/">Home Page</Link>
    </div>
  );
}
