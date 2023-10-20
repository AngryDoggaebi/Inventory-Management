import { connectDB } from '@/utill/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const db = (await connectDB).db('checklist');
  // =================================================
  // 조회 GET
  // =================================================
  if (req.method === 'GET') {
    try {
      let result = await db
        .collection('inventory')
        .findOne({ _id: new ObjectId(req.query.id) });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500);
    }
  }
  // =================================================
  // 수정 patch
  // =================================================
  if (req.method === 'PATCH') {
    try {
      await db
        .collection('inventory')
        .updateOne(
          { _id: new ObjectId(req.query.id) },
          { $set: { data: req.body } },
        );

      return res.status(200).json();
    } catch (err) {
      return res.status(500);
    }
  }
}
