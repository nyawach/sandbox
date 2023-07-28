import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

function App() {
  return (
    <main>
      <Dialog>
        <DialogTrigger asChild>
          <Button>テスト</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>ヘッダー</DialogHeader>
          <DialogTitle>タイトル</DialogTitle>
          <DialogFooter>フッター</DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default App;
