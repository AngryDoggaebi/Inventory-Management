import { connectDB } from '@/utill/database';
import { ObjectId } from 'mongodb';

/**
 * 수정 관련 api
 * @param {*} req
 * @param {*} res
 * get
 * : 수정할 내용 input defaultValue 에 뿌려주기
 * : 수정 내용 입력 전 오늘자 데이터 있는지 확인 (없는 경우 post 요청 위해)
 * @returns  { date: string, data: { aditor: string, saftybag_2: string, saftybag_3: string, saftybag_4: string, box_cardboard: string, box_tag4: string, box_m: string, opp_45: string, opp_12: string, opp_kyobo: string,wrappingPaper: string, }, directInput: boolean, dataNum: string, }
 * patch
 * : 내용 수정
 * @returns
 */
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

      return res.redirect(302, '/inventory');
    } catch (err) {
      return res.status(500);
    }
  }
}
