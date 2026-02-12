require("dotenv").config(); // ✅ VERY IMPORTANT

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // ✅ use your Groq key
  baseURL: "https://api.groq.com/openai/v1",
});

(async () => {
  const res = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: "Hello AI" }],
  });

  console.log(res.choices[0].message.content);
})();
