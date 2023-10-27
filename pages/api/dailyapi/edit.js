import { connectDB } from '@/utill/database';
import { ObjectId } from 'mongodb';

/**
 * 수정 관련 api
 * @param {*} req
 * @param {*} res
 * get
 * : 수정할 내용 input defaultValue 에 뿌려주기
 * : 수정 내용 입력 전 오늘자 데이터 있는지 확인 (없는 경우 post 요청 위해)
 * @returns  { date: string, data: { aditor: string, saftybag_1: string, saftybag_2: string, saftybag_3: string, pen_1: string, pen_2: string, pen_3: string, opp_1: string, opp_2: string, opp_pattern: string, paper: string, }, directInput: boolean, dataNum: string, }
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
    // 빈 값 검사
    const allValues = Object.values(req.body);
    const filteredValues = allValues.filter(v => v.length !== 0);
    if (filteredValues.length !== allValues.length) {
      console.log('빈 값 있음');
      return res.status(400).json('빈 값 있음');
    }
    // db저장
    try {
      await db
        .collection('inventory')
        .updateOne(
          { _id: new ObjectId(req.query.id) },
          { $set: { data: req.body, directInput: true } },
        );

      return res.status(200).json('수정완료');
    } catch (err) {
      return res.status(500);
    }
  }
}
