/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
// eslint-disable camelcase
const qs = require("qs");
require("dotenv").config();
import axios from "axios";

const client_id = process.env.SPOTIFY_CLIENT_ID;

const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const auth_token = Buffer.from(
  `${client_id}:${client_secret}`,
  "utf-8"
).toString("base64");

async function callToken() {
  const token_url = "https://accounts.spotify.com/api/token";
  const data = qs.stringify({ grant_type: "client_credentials" });

  const res = await axios.post(token_url, data, {
    headers: {
      Authorization: `Basic ${auth_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data.access_token;
}

export default async function handler(req, res) {
  const music = req.body.music;
  const token_ac = await callToken();

  if (req.method === "POST") {
    if (music.trim() === "") {
      res.status(400).json({ error: "Missing Music" });
    }

    await axios
      .get(
        `${"https://api.spotify.com/v1/search?q"}=${encodeURI(
          music
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )}&type=track&limit=1`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token_ac}`,
          },
        }
      )
      .then((music) => {
        const info = music.data.tracks;
        console.log(info);
        if (info != undefined) {
          const data = {
            title: info.items[0].name,
            artist: {
              name: info.items[0].artists[0].name,
            },
            album: {
              title: info.items[0].album.name,
              cover: info.items[0].album.images[1].url,
            },
          };
          res.status(200).json({ data: data });
        } else {
          res.status(200).json({ data: {} });
        }
      });
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
