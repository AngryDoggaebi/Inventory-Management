import { ObjectId } from "mongodb";
import { connectDB } from "@/utill/database";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    // 통과
    const db = (await connectDB).db("checklist");
    let result = await db
      .collection("inventory")
      .deleteOne({ _id: new ObjectId(req.body.id) });

    if (result.deletedCount === 1) {
      return res.status(200).json("삭제됨");
    } else {
      return res.status(500).json("삭제됨");
    }
  }
  if (req.method === "POST") {
    // 빈 값 검사
    const allValues = Object.values(req.body);
    const filteredValues = allValues.filter((v) => v.length !== 0);
    if (filteredValues.length !== allValues.length) {
      return res.status(500).json("빈 값 있음");
    }

    try {
      // 통과
      const db = (await connectDB).db("checklist");
      await db.collection("inventory").insertOne(req.body);

      return res.redirect(302, "/");
    } catch (err) {
      //DB 에러
      return res.status(500).json("DB 에러");
    }
  }
  if (req.method === "GET") {
    const selectedDate = req.query.selectedDate;
    console.log("요청들어옴" + selectedDate);
    try {
      const db = (await connectDB).db("checklist");
      let result = await db.collection("inventory").find().toArray();
      if (result.length !== 0) {
        return res.status(200).json(result);
      } else {
        return res.status(500).json("값 없음");
      }
    } catch (err) {
      //DB 에러
      return res.status(500).json("DB 에러");
    }
  }
}
