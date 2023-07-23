import { PropsWithChildren } from "react";
import { Header } from "../_components/Header";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Header title="Auth" />
      <section>{children}</section>
    </main>
  );
}
