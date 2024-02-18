import { Hono } from 'hono'
import { streamText } from "hono/streaming";

const app = new Hono();

app.get('/', (c) => c.text('Hello Hono!')) 

app.get("/stream", (c) => {
  return streamText(c, async (stream) => {
    // Write a text with a new line ('\n').
    await stream.writeln("Hello");
    // Wait 1 second.
    await stream.sleep(1000);
    // Write a text without a new line.
    await stream.write(`Hono!`);
  });
});

export default app
