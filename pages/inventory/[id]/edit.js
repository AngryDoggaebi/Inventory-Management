import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Edit = ({ item }) => {
  const params = useParams();
  const [originalData, setOriginalData] = useState();
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
    const dataHandler = async () => {
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
    };
    dataHandler();
  }, []);

  const inputHandler = e => {
    const { value, name } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const patchHandler = async () => {
    try {
      await axios
        .patch(`/api/dailyapi/edit?id=${params.id}`, inputData)
        .then(() => {
          router.push('/inventory');
        });
    } catch (error) {
      alert(error.response.data);
      throw error;
    }
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
        <button type="button" onClick={patchHandler}>
          수정하기
        </button>
      </form>
    </div>
  );
};

export default Edit;
