'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getHandler } from '../../utill/api/get';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FadeLoader } from 'react-spinners';
import { deleteHandler } from '../../utill/api/delete';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

/**
 * @todo: 로딩중 화면
 * @todo: 반응형
 * @todo: input 숫자 제한
 */

const Dailydata = () => {
  const [result, setResult] = useState();
  const params = useParams();
  const SelectedDate = useSelector(state => state.SelectedDateSlice);
  const formattedToday = useSelector(state => state.formattedTodaySlice);
  const formattedYesterday = useSelector(
    state => state.formattedYesterdaySlice,
  );

  // 어제 데이터 찾아보고 post 안 했으면 자동으로 빈 데이터 전송(수정 용이, 코드의 단순화 위해)
  useQuery(
    'yesterdayDataChecker',
    () => {
      axios.get('/api/dailyapi/yesterdayDataChecker', {
        params: {
          yesterday: formattedYesterday,
        },
      });
    },
    {
      staleTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
  );

  // 화면에 보여줄 데이터
  const { isLoading, data, refetch } = useQuery(
    'getDailyData',
    () => getHandler(SelectedDate, formattedToday),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    },
  );

  useEffect(() => {
    if (data) setResult(data.data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [SelectedDate]);

  // delete 요청
  const onClickHandler = async id => {
    deleteHandler(id).then(() => {
      // 리렌더링;
      refetch();
    });
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
                    v.date === SelectedDate ? { border: '2px solid red' } : null
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
                        v.data.pen_B === '충분' || Number(v.data.pen_B) >= 4
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
                        v.data.pen_C === '충분' || Number(v.data.pen_C) >= 4
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
                      onClickHandler(v._id);
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
