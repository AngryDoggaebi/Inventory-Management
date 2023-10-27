import { ObjectId } from 'mongodb';
import { connectDB } from '@/utill/database';

/**
 * 재고 데이터 crud
 *
 * Delete
 * @param { id: string } req
 *
 * post
 * @param { date: string, data: { aditor: string, saftybag_1: string, saftybag_2: string, saftybag_3: string, pen_1: string, pen_2: string, pen_3: string, opp_1: string, opp_2: string, opp_pattern: string, paper: string, }, directInput: boolean } req
 *
 * get
 * @param {selectedDate: selectedDate,formattedToday: formattedToday,} req
 */

export default async function handler(req, res) {
  const db = (await connectDB).db('checklist');
  // 마지막 데이터
  const lastData = await db
    .collection('inventory')
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray();
  // 마지막 데이터의 dataNum
  const lastDataNum = Number(lastData[0].dataNum);

  // =================================================
  // 삭제 DELETE
  // =================================================
  if (req.method === 'DELETE') {
    // 통과
    let result = await db
      .collection('inventory')
      .deleteOne({ _id: new ObjectId(req.body.id) });

    if (result.deletedCount === 1) {
      return res.status(200).json('삭제됨');
    } else {
      return res.status(500).json('삭제됨');
    }
  }
  // =================================================
  // 추가 POST
  // =================================================
  if (req.method === 'POST') {
    const formattedToday = req.body.date;

    // 이미 등록했는지 확인(하루 한 번만 post 가능)
    const isPosted = await db
      .collection('inventory')
      .findOne({ date: formattedToday });
    if (isPosted) {
      return res.status(409).json('오늘 재고는 이미 등록되어 있습니다');
    }
    // 빈 값 검사
    const allValues = Object.values(req.body.data);
    const filteredValues = allValues.filter(v => v.length !== 0);
    if (filteredValues.length !== allValues.length) {
      return res.status(400).json('빈 값 있음');
    }

    // 마지막 데이터의 dataNum에 1 더해 req.body에 추가
    req.body.dataNum = (lastDataNum + 1).toString();

    try {
      // 통과
      await db.collection('inventory').insertOne(req.body);

      return res.status(200).json('post 성공');
    } catch (err) {
      // DB 에러
      return res.status(500).json('DB 에러');
    }
  }
  // =================================================
  // 조회 GET
  // =================================================
  if (req.method === 'GET') {
    const formattedToday = req.query.formattedToday;
    // 선택한 날짜, 데이터, 데이터 번호
    const selectedDate = req.query.selectedDate;
    const selectedData = await db
      .collection('inventory')
      .findOne({ date: selectedDate });
    const selectedDataNum = selectedData && Number(selectedData.dataNum);

    // 가져올 데이터의 시작 데이터 번호
    const startDataNum = selectedDataNum - 3;

    // error handling -----------------------------
    let toExcludeDataNum; // 제외할 데이터 개수

    // 선택한 날짜가 오늘 날짜이면서 데이터가 없을 때
    if (selectedDate === formattedToday && !selectedData) {
      toExcludeDataNum = lastDataNum - 6;
    }
    // 너무 뒷 날짜 선택한 경우
    else if (startDataNum > lastDataNum - 6) {
      toExcludeDataNum = lastDataNum - 6;
    }
    // 너무 앞 날짜 선택한 경우
    else if (startDataNum < 3) {
      toExcludeDataNum = 0;
    }
    // 그 외
    else {
      toExcludeDataNum = selectedDataNum - 3;
    }
    // ---------------------------------------------

    try {
      // 선택한 날짜에 맞는 데이터를 가운데 놓고 총 7개 데이터 출력
      let result = await db
        .collection('inventory')
        .find()
        .skip(toExcludeDataNum)
        .limit(7)
        .toArray();

      if (result.length !== 0) {
        return res.status(200).json(result);
      } else {
        return res.status(500).json('값 없음');
      }
    } catch (err) {
      // DB 에러
      return res.status(500).json('DB 에러');
    }
  }
}
