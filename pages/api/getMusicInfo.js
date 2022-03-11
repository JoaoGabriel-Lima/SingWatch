/* eslint-disable require-jsdoc */

export default async function handler(req, res) {
  const music = req.body.music;
  const axios = require("axios");
  if (req.method === "POST") {
    if (music.trim() === "") {
      res.status(400).json({ error: "Missing Music" });
    }

    await axios
      .get(
        `https://cors.jg-limamarinho202.workers.dev/?https://api.deezer.com/search?q=${encodeURI(
          music
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )}`,
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      )
      .then((music) => {
        res.status(200).json({ data: music.data.data[0] });
      });
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
