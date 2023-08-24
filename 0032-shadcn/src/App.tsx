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
import { Graph } from "./components/Graph";

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
        <Graph />
      </div>
      <div style={{ width: "100%", height: "80px" }}>
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gap: "20px",
            justifyContent: "center",
            alignItems: "stretch",
            gridTemplateColumns: "repeat(20,30vw)",
            height: "100%",
            scrollSnapType: "x mandatory",
            overflow: "auto",
          }}
        >
          {Array.from(new Array(20))
            .map((_, index) => index)
            .map((i) => (
              <div
                key={i + "red"}
                style={{
                  backgroundColor: "red",
                  flex: "none",
                  scrollSnapAlign: "center",
                  scrollSnapStop: "always",
                }}
              >
                {i}
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

export default App;
