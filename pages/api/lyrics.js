/* eslint-disable require-jsdoc */
import { getLyrics } from "genius-lyrics-api";
const api = process.env.GENIUS_API;

export default async function handler(req, res) {
  const author = req.body.author;
  const title = req.body.title;
  if (req.method === "POST") {
    const options = {
      apiKey: api,
      title: title,
      artist: author,
      optimizeQuery: true,
    };
    await getLyrics(options)
      .then((lyrics) => {
        res.status(200).json({ lyrics: lyrics });
      })
      .catch((err) => res.status(400).json({ error: err }));
  }
}
