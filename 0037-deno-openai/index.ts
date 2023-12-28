import OpenAI from "npm:openai";
import { Hono } from "npm:hono";
import { zValidator } from "npm:@hono/zod-validator";
import { z } from "npm:zod";
import { load } from "https://deno.land/std@0.210.0/dotenv/mod.ts";

const app = new Hono();

await load();

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

app.get(
  "/api/talk",
  zValidator(
    "query",
    z.object({
      message: z.string(),
    })
  ),
  async (c) => {
    const message = c.req.query("message") ?? "No message for you.";
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });
    return c.json(completion.choices);
  }
);

Deno.serve(app.fetch);
