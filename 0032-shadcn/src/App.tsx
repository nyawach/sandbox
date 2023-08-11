import { useState } from "react";
import { Button } from "./components/ui/button";
import { Calendar } from "./components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
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
      <div className="grid justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </main>
  );
}

export default App;
