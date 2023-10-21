import { patchHandler } from '@/utill/api/patch';
import { postHandler } from '@/utill/api/post';
import { IsClickedAtom } from '@/recoil/daily';
import { formattedTodaySelector } from '@/recoil/date';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const Edit = ({ item }) => {
  const params = useParams();
  const [originalData, setOriginalData] = useState();
  const formattedToday = useRecoilValue(formattedTodaySelector);
  const [isClicked, setIsClicked] = useRecoilState(IsClickedAtom);
  const router = useRouter();
  const [inputData, setInputData] = useState({
    aditor: '',
    saftybag_2: '',
    saftybag_3: '',
    saftybag_4: '',
    box_cardboard: '',
    box_tag4: '',
    box_m: '',
    opp_45: '',
    opp_12: '',
    opp_kyobo: '',
    wrappingPaper: '',
  });

  useEffect(() => {
    setOriginalData(item);
    // 기본값 저장
    setInputData({
      ...inputData,
      aditor: item.data.aditor,
      saftybag_2: item.data.saftybag_2,
      saftybag_3: item.data.saftybag_3,
      saftybag_4: item.data.saftybag_4,
      box_cardboard: item.data.box_cardboard,
      box_tag4: item.data.box_tag4,
      box_m: item.data.box_m,
      opp_45: item.data.opp_45,
      opp_12: item.data.opp_12,
      opp_kyobo: item.data.opp_kyobo,
      wrappingPaper: item.data.wrappingPaper,
    });
  }, [item]);

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
        postHandler(formattedToday, inputData, setIsClicked, isClicked);
      }
    });
  };

  return (
    <div className="column-tag">
      <h2>수정하기</h2>

      <form className="post-edit-input">
        <div id="edit-date">{originalData && originalData.date}</div>
        <input
          placeholder="작성자"
          name="aditor"
          defaultValue={originalData && originalData.data.aditor}
          onChange={e => inputHandler(e)}
        />
        <input
          placeholder="안전봉투 2호"
          name="saftybag_2"
          defaultValue={originalData && originalData.data.saftybag_2}
          onChange={e => inputHandler(e)}
        />
        <input
          placeholder="안전봉투 3호"
          name="saftybag_3"
          defaultValue={originalData && originalData.data.saftybag_3}
          onChange={e => inputHandler(e)}
        />
        <input
          placeholder="안전봉투 4호"
          name="saftybag_4"
          defaultValue={originalData && originalData.data.saftybag_4}
          onChange={e => inputHandler(e)}
        />
        <input
          placeholder="박스 골판지"
          name="box_cardboard"
          defaultValue={originalData && originalData.data.box_cardboard}
          onChange={e => inputHandler(e)}
        />
        <input
          placeholder="박스 택4"
          name="box_tag4"
          defaultValue={originalData && originalData.data.box_tag4}
          onChange={e => inputHandler(e)}
        />
        <input
          placeholder="박스 중"
          name="box_m"
          defaultValue={originalData && originalData.data.box_m}
          onChange={e => inputHandler(e)}
        />
        <input
          placeholder="OPP테이프 4.5cm"
          name="opp_45"
          defaultValue={originalData && originalData.data.opp_45}
          onChange={e => inputHandler(e)}
        />
        <input
          placeholder="OPP테이프 1.2cm"
          name="opp_12"
          defaultValue={originalData && originalData.data.opp_12}
          onChange={e => inputHandler(e)}
        />
        <input
          placeholder="OPP테이프 교보"
          name="opp_kyobo"
          defaultValue={originalData && originalData.data.opp_kyobo}
          onChange={e => inputHandler(e)}
        />
        <input
          placeholder="포장지"
          name="wrappingPaper"
          defaultValue={originalData && originalData.data.wrappingPaper}
          onChange={e => inputHandler(e)}
        />
        <button type="button" onClick={onClickHandler}>
          수정하기
        </button>
      </form>
    </div>
  );
};

export default Edit;
