import { PropsWithChildren } from "react";
import { Header } from "../_components/Header";

export default function NoAuthLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Header title="No Auth" />
      <section>{children}</section>
    </main>
  );
}
