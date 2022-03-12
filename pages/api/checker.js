/* eslint-disable require-jsdoc */
// import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
  // const client = await clientPromise;
  // const db = client.db(process.env.MONGO_DB);
  // const userID = req.body.userID;
  // // const data = JSON.stringify({
  // //   collection: "discord",
  // //   database: "SingWatch",
  // //   dataSource: "JaoDev",
  // //   // projection: {
  // //   //   _id: 1,
  // //   // },
  // //   filter: {
  // //     "channels.users": userID,
  // //   },
  // // });
  // // const config = {
  // //   method: "post",
  // //   url: "https://data.mongodb-api.com/app/data-acezk/endpoint/data/beta/action/findOne",
  // //   headers: {
  // //     "Content-Type": "application/json",
  // //     "Access-Control-Request-Headers": "*",
  // //     "api-key": process.env.DATABASE_URL,
  // //   },
  // //   data: data,
  // // };
  // if (req.method === "POST") {
  //   if (userID.trim() === "") {
  //     res.status(400).json({ error: "Missing userID" });
  //   }
  //   const data = await db.collection("discord").findOne({
  //     "channels.users": userID,
  //   });
  //   if (data) {
  //     // console.log(data);
  //     res.status(200).json({ data: data });
  //   } else {
  //     res.status(200).json({ data: null });
  //   }
  // } else {
  //   res.status(400).json({ error: "Invalid request" });
  // }
}
