import { connectDB } from '@/utill/database';

/**
 * 특정한 날짜의 데이터 조회
 * @param {*} req
 * @param {*} res
 * @returns { date: string, data: { aditor: string, saftybag_1: string, saftybag_2: string, saftybag_3: string, pen_1: string, pen_2: string, pen_3: string, opp_1: string, opp_2: string, opp_pattern: string, paper: string, }, directInput: boolean, dataNum: string, }
 */

export default async function handler(req, res) {
  const db = (await connectDB).db('checklist');
  if (req.method === 'GET') {
    const date = req.query.date;
    try {
      const result = await db.collection('inventory').findOne({ date: date });
      res.status(200).json(result);
    } catch (err) {
      res.status(500);
    }
  }
}
