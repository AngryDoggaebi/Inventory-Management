import { connectDB } from '@/utill/database';

/**
 * 어제 데이터 조회 후 데이터가 없는 경우 빈 데이터 생성
 * @param {*} req
 * @param {*} res
 * @returns
 */

export default async function handler(req, res) {
  const db = (await connectDB).db('checklist');

  // =================================================
  // 조회 GET
  // =================================================
  if (req.method === 'GET') {
    const yesterday = req.query.yesterday;
    // 어제 날짜의 데이터 체크
    const checkYesterdayData = await db
      .collection('inventory')
      .findOne({ date: yesterday });

    // 어제 날짜의 데이터 없으면 빈 값 POST
    if (!checkYesterdayData) {
      try {
        // 마지막 데이터
        const lastData = await db
          .collection('inventory')
          .find()
          .sort({ _id: -1 })
          .limit(1)
          .toArray();
        // 마지막 데이터의 dataNum
        const lastDataNum = Number(lastData[0].dataNum);

        await db.collection('inventory').insertOne({
          date: yesterday,
          data: {
            aditor: '-',
            saftybag_2: '-',
            saftybag_3: '-',
            saftybag_4: '-',
            box_cardboard: '-',
            box_tag4: '-',
            box_m: '-',
            opp_45: '-',
            opp_12: '-',
            opp_kyobo: '-',
            wrappingPaper: '-',
          },
          directInput: false,
          dataNum: (lastDataNum + 1).toString(),
        });

        return res.redirect(302, '/');
      } catch (err) {
        // DB 에러
        return res.status(500).json('DB 에러');
      }
    }
    try {
      return res.redirect(302, '/');
    } catch (err) {
      // DB 에러
      return res.status(500).json('DB 에러');
    }
  }
}
