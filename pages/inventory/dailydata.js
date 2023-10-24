'use client';

import {
  SelectedDateAtom,
  formattedTodaySelector,
  formattedYesterdaySelector,
} from '@/recoil/date';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getHandler } from '../../utill/api/get';
import { IsClickedAtom } from '@/recoil/daily';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Dailydata = () => {
  const [result, setResult] = useState();
  const selectedDate = useRecoilValue(SelectedDateAtom);
  const isClicked = useRecoilValue(IsClickedAtom);
  const formattedToday = useRecoilValue(formattedTodaySelector);
  const formattedYesterday = useRecoilValue(formattedYesterdaySelector);
  const params = useParams();

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
    getHandler(selectedDate, formattedToday).then(response => {
      setResult(response.data);
    });
  }, [selectedDate, isClicked]);

  // delete 요청
  const deleteHandler = async (id, e) => {
    try {
      await axios
        .delete('/api/dailyapi/daily', { data: { id: id } })
        .then(() => {
          // 클릭한 버튼의 부모요소의 부모요소 삭제(안보이게)
          e.target.parentElement.parentElement.style.display = 'none';
        });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {result &&
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
                    <td>{v.data && v.directInput ? v.data.saftybag_2 : '-'}</td>
                  </tr>
                  <tr
                    className={
                      v.directInput === false ? 'grey-color' : 'table-color-b'
                    }
                  >
                    <td>{v.data && v.directInput ? v.data.saftybag_3 : '-'}</td>
                  </tr>
                  <tr
                    className={
                      v.directInput === false ? 'grey-color' : 'table-color-b'
                    }
                  >
                    <td>{v.data && v.directInput ? v.data.saftybag_4 : '-'}</td>
                  </tr>
                  <tr>
                    <td
                      className={
                        v.data.box_cardboard === '충분' ||
                        Number(v.data.box_cardboard) >= 3
                          ? 'green-color'
                          : v.data.box_cardboard === '부족' ||
                            Number(v.data.box_cardboard) >= 1
                          ? 'yellow-color'
                          : v.data.box_cardboard === '없음' ||
                            v.data.box_cardboard === '0'
                          ? 'red-color'
                          : ''
                      }
                    >
                      {v.data && v.directInput ? v.data.box_cardboard : '-'}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={
                        v.data.box_tag4 === '충분' ||
                        Number(v.data.box_tag4) >= 3
                          ? 'green-color'
                          : v.data.box_tag4 === '부족' ||
                            Number(v.data.box_tag4) >= 1
                          ? 'yellow-color'
                          : v.data.box_tag4 === '없음' ||
                            v.data.box_tag4 === '0'
                          ? 'red-color'
                          : ''
                      }
                    >
                      <span>
                        {v.data && v.directInput ? v.data.box_tag4 : '-'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={
                        v.data.box_m === '충분' || Number(v.data.box_m) >= 3
                          ? 'green-color'
                          : v.data.box_m === '부족' || Number(v.data.box_m) >= 1
                          ? 'yellow-color'
                          : v.data.box_m === '없음' || v.data.box_m === '0'
                          ? 'red-color'
                          : ''
                      }
                    >
                      <span>
                        {v.data && v.directInput ? v.data.box_m : '-'}
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
                        {v.data && v.directInput ? v.data.opp_45 : '-'}
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
                        {v.data && v.directInput ? v.data.opp_12 : '-'}
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
                        {v.data && v.directInput ? v.data.opp_kyobo : '-'}
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
                        {v.data && v.directInput ? v.data.wrappingPaper : '-'}
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
                    onClick={e => {
                      deleteHandler(v._id, e);
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
        })}
    </>
  );
};

export default Dailydata;
