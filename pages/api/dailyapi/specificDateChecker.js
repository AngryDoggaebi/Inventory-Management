import { connectDB } from '@/utill/database';

/**
 * 특정한 날짜의 데이터 조회
 * @param {*} req
 * @param {*} res
 * @returns { date: string, data: { aditor: string, saftybag_2: string, saftybag_3: string, saftybag_4: string, box_cardboard: string, box_tag4: string, box_m: string, opp_45: string, opp_12: string, opp_kyobo: string,wrappingPaper: string, }, directInput: boolean, dataNum: string, }
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
