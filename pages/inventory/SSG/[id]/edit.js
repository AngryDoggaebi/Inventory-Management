import { patchHandler } from '@/utill/api/patch';
import { postHandler } from '@/utill/api/post';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reRandering } from '@/redux/daily';

const Edit = ({ res }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [originalData, setOriginalData] = useState(); // 수정 전 값
  const formattedToday = useSelector(state => state.formattedTodaySlice);
  const router = useRouter();
  const [inputData, setInputData] = useState({
    aditor: '',
    saftybag_1: '',
    saftybag_2: '',
    saftybag_3: '',
    pen_A: '',
    pen_B: '',
    pen_C: '',
    opp_1: '',
    opp_2: '',
    opp_pattern: '',
    paper: '',
  }); // 수정할 값

  useEffect(() => {
    if (res) {
      setOriginalData(res);
      // 기본값 저장
      setInputData({
        ...inputData,
        aditor: res.data.aditor,
        saftybag_1: res.data.saftybag_1,
        saftybag_2: res.data.saftybag_2,
        saftybag_3: res.data.saftybag_3,
        pen_A: res.data.pen_A,
        pen_B: res.data.pen_B,
        pen_C: res.data.pen_C,
        opp_1: res.data.opp_1,
        opp_2: res.data.opp_2,
        opp_pattern: res.data.opp_pattern,
        paper: res.data.paper,
      });
    }
  }, [res]);

  const inputHandler = e => {
    const { value, name } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const onClickHandler = async () => {
    // 데이터 수정중 삭제한 후 수정버튼 클릭한 경우
    // 데이터 존재하는지 확인
    await axios.get(`/api/dailyapi/edit?id=${params.id}`).then(res => {
      // 데이터 존재시 patch 요청
      if (res.data !== null) {
        patchHandler(params.id, inputData).then(() => {
          router.push('/inventory');
        });
      }
      // 데이터 존재하지 않는 경우 post 요청
      else {
        postHandler(formattedToday, inputData).then(() => {
          dispatch(reRandering());
        });
      }
    });
  };

  return (
    <form className="post-edit-input-form">
      <div className="post-title">
        <h2>수정하기</h2>
        <div id="edit-date">{originalData && originalData.date}</div>
      </div>
      <div className="post-input">
        <div className="post-input1">
          <div className="input-wrapper">
            <span className="input-name">작성자</span>
            <input
              placeholder="작성자"
              name="aditor"
              defaultValue={originalData && originalData.data.aditor}
              onChange={e => inputHandler(e)}
            />
          </div>
          <div className="input-wrapper">
            <span className="input-name">봉투 묶음 1호</span>
            <input
              placeholder="봉투 묶음 1호"
              name="saftybag_1"
              defaultValue={originalData && originalData.data.saftybag_1}
              onChange={e => inputHandler(e)}
            />
          </div>
          <div className="input-wrapper">
            <span className="input-name">봉투 묶음 2호</span>
            <input
              placeholder="봉투 묶음 2호"
              name="saftybag_2"
              defaultValue={originalData && originalData.data.saftybag_2}
              onChange={e => inputHandler(e)}
            />
          </div>
          <div className="input-wrapper">
            <span className="input-name">봉투 묶음 3호</span>
            <input
              placeholder="봉투 묶음 3호"
              name="saftybag_3"
              defaultValue={originalData && originalData.data.saftybag_3}
              onChange={e => inputHandler(e)}
            />
          </div>
          <div className="input-wrapper">
            <span className="input-name">* 볼펜 세트 A</span>
            <input
              placeholder="볼펜 세트 A"
              name="pen_A"
              defaultValue={originalData && originalData.data.pen_A}
              onChange={e => inputHandler(e)}
            />
          </div>
          <div className="input-wrapper">
            <span className="input-name">* 볼펜 세트 B</span>
            <input
              placeholder="볼펜 세트 B"
              name="pen_B"
              defaultValue={originalData && originalData.data.pen_B}
              onChange={e => inputHandler(e)}
            />
          </div>
        </div>
        <div className="post-input2">
          <div className="input-wrapper">
            <span className="input-name">* 볼펜 세트 C</span>
            <input
              placeholder="볼펜 세트 C"
              name="pen_C"
              defaultValue={originalData && originalData.data.pen_C}
              onChange={e => inputHandler(e)}
            />
          </div>
          <div className="input-wrapper">
            <span className="input-name">테이프 1cm</span>
            <input
              placeholder="테이프 1cm"
              name="opp_1"
              defaultValue={originalData && originalData.data.opp_1}
              onChange={e => inputHandler(e)}
            />
          </div>
          <div className="input-wrapper">
            <span className="input-name">테이프 2cm</span>
            <input
              placeholder="테이프 2cm"
              name="opp_2"
              defaultValue={originalData && originalData.data.opp_2}
              onChange={e => inputHandler(e)}
            />
          </div>
          <div className="input-wrapper">
            <span className="input-name">무늬 테이프</span>
            <input
              placeholder="무늬 테이프"
              name="opp_pattern"
              defaultValue={originalData && originalData.data.opp_pattern}
              onChange={e => inputHandler(e)}
            />
          </div>
          <div className="input-wrapper">
            <span className="input-name">종이</span>
            <input
              placeholder="종이"
              name="paper"
              defaultValue={originalData && originalData.data.paper}
              onChange={e => inputHandler(e)}
            />
          </div>
        </div>
      </div>

      <button className="submit-button" type="button" onClick={onClickHandler}>
        수정하기
      </button>

      <div className="color-info">
        <span>*</span>
        <span>
          <span className="square">🟩</span>: 4~, 충분
        </span>
        <span>
          <span className="square">🟨</span>: 1~3, 부족
        </span>
        <span>
          <span className="square">🟥</span>: 0, 없음
        </span>
      </div>
    </form>
  );
};

export default Edit;
