'use client';

import {
  SelectedDateAtom,
  formattedTodaySelector,
  formattedYesterdaySelector,
} from '@/recoil/date';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getHandler } from '../../utill/api/get';
import { IsClickedAtom } from '@/recoil/daily';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FadeLoader } from 'react-spinners';

/**
 * @todo: 로딩중 화면
 * @todo: 반응형
 * @todo: input 숫자 제한
 */

const Dailydata = () => {
  const [result, setResult] = useState();
  const selectedDate = useRecoilValue(SelectedDateAtom);
  const [isClicked, setIsClicked] = useRecoilState(IsClickedAtom);
  const formattedToday = useRecoilValue(formattedTodaySelector);
  const formattedYesterday = useRecoilValue(formattedYesterdaySelector);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // 어제 데이터 찾아보고 post 안 했으면 자동으로 빈 데이터 전송(수정 용이, 코드의 단순화 위해)
  useEffect(() => {
    const emptyDataHandler = async () => {
      try {
        await axios.get('/api/dailyapi/yesterdayDataChecker', {
          params: {
            yesterday: formattedYesterday,
          },
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    emptyDataHandler();
  }, []);

  useEffect(() => {
    // get 요청
    setIsLoading(true);
    getHandler(selectedDate, formattedToday).then(response => {
      setResult(response.data);
      setIsLoading(false);
    });
  }, [selectedDate, isClicked]);

  // delete 요청
  const deleteHandler = async id => {
    try {
      await axios
        .delete('/api/dailyapi/daily', { data: { id: id } })
        .then(() => {
          // 리렌더링;
          setIsClicked(isClicked + 1);
        });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-icon">
          <FadeLoader color="rgb(29, 38, 64)" />
        </div>
      ) : (
        result &&
        result.map(v => {
          const date = v.date && v.date.split('-');

          return (
            <div style={{ display: 'flex', flexFlow: 'column' }} key={v._id}>
              <table
                className={
                  v.directInput === false
                    ? 'grey-color dailydata-table'
                    : 'dailydata-table'
                }
              >
                <tbody
                  style={
                    v.date === selectedDate ? { border: '2px solid red' } : null
                  }
                >
                  <tr>
                    <td
                      className={
                        v.directInput === false ? 'grey-color' : 'table-color-a'
                      }
                      style={
                        v._id === params.id
                          ? { backgroundColor: 'skyblue' }
                          : null
                      }
                    >
                      {date && date[1] + '월' + ' ' + date[2] + '일'}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={
                        v.directInput === false ? 'grey-color' : 'table-color-a'
                      }
                    >
                      {v.data && v.directInput ? v.data.aditor : '-'}
                    </td>
                  </tr>
                  <tr
                    className={
                      v.directInput === false ? 'grey-color' : 'table-color-b'
                    }
                  >
                    <td>{v.data && v.directInput ? v.data.saftybag_1 : '-'}</td>
                  </tr>
                  <tr
                    className={
                      v.directInput === false ? 'grey-color' : 'table-color-b'
                    }
                  >
                    <td>{v.data && v.directInput ? v.data.saftybag_2 : '-'}</td>
                  </tr>
                  <tr
                    className={
                      v.directInput === false ? 'grey-color' : 'table-color-b'
                    }
                  >
                    <td>{v.data && v.directInput ? v.data.saftybag_3 : '-'}</td>
                  </tr>
                  <tr>
                    <td
                      className={
                        v.data.pen_A === '충분' || Number(v.data.pen_A) >= 4
                          ? 'green-color'
                          : v.data.pen_A === '부족' || Number(v.data.pen_A) >= 1
                          ? 'yellow-color'
                          : v.data.pen_A === '없음' || v.data.pen_A === '0'
                          ? 'red-color'
                          : ''
                      }
                    >
                      {v.data && v.directInput ? v.data.pen_A : '-'}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={
                        v.data.pen_B === '충분' || Number(v.data.pen_B) >= 3
                          ? 'green-color'
                          : v.data.pen_B === '부족' || Number(v.data.pen_B) >= 1
                          ? 'yellow-color'
                          : v.data.pen_B === '없음' || v.data.pen_B === '0'
                          ? 'red-color'
                          : ''
                      }
                    >
                      <span>
                        {v.data && v.directInput ? v.data.pen_B : '-'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={
                        v.data.pen_C === '충분' || Number(v.data.pen_C) >= 3
                          ? 'green-color'
                          : v.data.pen_C === '부족' || Number(v.data.pen_C) >= 1
                          ? 'yellow-color'
                          : v.data.pen_C === '없음' || v.data.pen_C === '0'
                          ? 'red-color'
                          : ''
                      }
                    >
                      <span>
                        {v.data && v.directInput ? v.data.pen_C : '-'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={
                        v.directInput === false ? 'grey-color' : 'table-color-b'
                      }
                    >
                      <span>
                        {v.data && v.directInput ? v.data.opp_1 : '-'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={
                        v.directInput === false ? 'grey-color' : 'table-color-b'
                      }
                    >
                      <span>
                        {v.data && v.directInput ? v.data.opp_2 : '-'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={
                        v.directInput === false ? 'grey-color' : 'table-color-b'
                      }
                    >
                      <span>
                        {v.data && v.directInput ? v.data.opp_pattern : '-'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={
                        v.directInput === false ? 'grey-color' : 'table-color-a'
                      }
                    >
                      <span>
                        {v.data && v.directInput ? v.data.paper : '-'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* v가 데이터의 마지막 요소이면서 날짜가 현재 날짜인지 확인 (당일 데이터만 삭제 가능) */}
              {v === result[result.length - 1] &&
              result[result.length - 1].date === formattedToday ? (
                <div className="buttons">
                  <Link href={`/inventory/${v._id}`}>
                    <button className="edit-delete-button">
                      ✏️<span>수정</span>
                    </button>
                  </Link>
                  <button
                    className="edit-delete-button"
                    onClick={() => {
                      deleteHandler(v._id);
                    }}
                  >
                    🗑️<span>삭제</span>
                  </button>
                </div>
              ) : (
                <Link href={`/inventory/${v._id}`}>
                  <button className="edit-delete-button">
                    ✏️<span>수정</span>
                  </button>
                </Link>
              )}
            </div>
          );
        })
      )}
    </>
  );
};

export default Dailydata;
