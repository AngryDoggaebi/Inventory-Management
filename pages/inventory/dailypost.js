import { useState } from 'react';
import { postHandler } from '../../utill/api/post';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getHandler } from '@/utill/api/get';
import { SelectedDateSlice } from '@/redux/date';

const Dailypost = () => {
  const formattedToday = useSelector(state => state.formattedTodaySlice);
  const { refetch } = useQuery(
    'getDailyData',
    () => getHandler(SelectedDateSlice, formattedToday),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    },
  );

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
    postHandler(formattedToday, inputData).then(() => {
      refetch();
    });
  };

  return (
    <>
      <form className="post-edit-input-form">
        <div className="post-title">
          <h2>오늘 재고</h2>
          <div>{formattedToday}</div>
        </div>
        <div className="post-input">
          <div className="post-input1">
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
              <span className="input-name">* 볼펜 세트 A</span>
              <input
                placeholder="볼펜 세트 A"
                name="pen_A"
                value={pen_A}
                onChange={e => inputHandler(e)}
              />
            </div>
            <div className="input-wrapper">
              <span className="input-name">* 볼펜 세트 B</span>
              <input
                placeholder="볼펜 세트 B"
                name="pen_B"
                value={pen_B}
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
          </div>
        </div>

        <button
          className="submit-button"
          type="button"
          onClick={onClickHandler}
        >
          입력하기
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
    </>
  );
};

export default Dailypost;
