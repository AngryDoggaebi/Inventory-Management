import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IsClickedAtom } from '@/recoil/daily';
import { formattedTodaySelector } from '@/recoil/date';
import { postHandler } from '../../utill/api/post';

const Dailypost = () => {
  const formattedToday = useRecoilValue(formattedTodaySelector);
  const [isClicked, setIsClicked] = useRecoilState(IsClickedAtom);
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
  });
  const {
    aditor,
    saftybag_1,
    saftybag_2,
    saftybag_3,
    pen_A,
    pen_B,
    pen_C,
    opp_1,
    opp_2,
    opp_pattern,
    paper,
  } = inputData;

  const inputHandler = e => {
    const { value, name } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const onClickHandler = () => {
    postHandler(formattedToday, inputData, setIsClicked, isClicked);
  };

  return (
    <>
      <form className="post-edit-input-form">
        <h2>오늘 재고</h2>
        <div>{formattedToday}</div>

        <div className="input-wrapper">
          <span className="input-name">작성자</span>
          <input
            placeholder="작성자"
            name="aditor"
            value={aditor}
            onChange={e => inputHandler(e)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-name">봉투 묶음 1호</span>
          <input
            placeholder="봉투 묶음 1호"
            name="saftybag_1"
            value={saftybag_1}
            onChange={e => inputHandler(e)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-name">봉투 묶음 2호</span>
          <input
            placeholder="봉투 묶음 2호"
            name="saftybag_2"
            value={saftybag_2}
            onChange={e => inputHandler(e)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-name">봉투 묶음 3호</span>
          <input
            placeholder="봉투 묶음 3호"
            name="saftybag_3"
            value={saftybag_3}
            onChange={e => inputHandler(e)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-name">볼펜 세트 A</span>
          <input
            placeholder="볼펜 세트 A"
            name="pen_A"
            value={pen_A}
            onChange={e => inputHandler(e)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-name">볼펜 세트 B</span>
          <input
            placeholder="볼펜 세트 B"
            name="pen_B"
            value={pen_B}
            onChange={e => inputHandler(e)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-name">볼펜 세트 C</span>
          <input
            placeholder="볼펜 세트 C"
            name="pen_C"
            value={pen_C}
            onChange={e => inputHandler(e)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-name">테이프 1cm</span>
          <input
            placeholder="테이프 1cm"
            name="opp_1"
            value={opp_1}
            onChange={e => inputHandler(e)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-name">테이프 2cm</span>
          <input
            placeholder="테이프 2cm"
            name="opp_2"
            value={opp_2}
            onChange={e => inputHandler(e)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-name">무늬 테이프</span>
          <input
            placeholder="무늬 테이프"
            name="opp_pattern"
            value={opp_pattern}
            onChange={e => inputHandler(e)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-name">종이</span>
          <input
            placeholder="종이"
            name="paper"
            value={paper}
            onChange={e => inputHandler(e)}
          />
        </div>

        <button
          className="submit-button"
          type="button"
          onClick={onClickHandler}
        >
          입력하기
        </button>
      </form>
    </>
  );
};

export default Dailypost;
