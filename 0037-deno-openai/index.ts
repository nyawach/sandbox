import OpenAI from "npm:openai";
import { load } from "https://deno.land/std@0.210.0/dotenv/mod.ts";

const env = await load();

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
