"use client";

import {
  SelectedDateAtom,
  formattedTodaySelector,
  formattedYesterdaySelector,
} from "@/recoil/date";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { getHandler } from "./api/get";
import { IsClickedAtom } from "@/recoil/daily";

/** todo
 * 수정기능 구현
 */

const Dailydata = () => {
  const [result, setResult] = useState();
  const selectedDate = useRecoilValue(SelectedDateAtom);
  const isClicked = useRecoilValue(IsClickedAtom);
  const formattedToday = useRecoilValue(formattedTodaySelector);
  const formattedYesterday = useRecoilValue(formattedYesterdaySelector);

  // 어제 데이터 찾아보고 post 안 했으면 자동으로 빈 데이터 전송(수정 용이, 코드의 단순화 위해)
  useEffect(() => {
    const emptyDataHandler = async () => {
      try {
        await axios.get(`/api/dailyapi/yesterdayDataChecker`, {
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
    getHandler(selectedDate, formattedToday).then((response) => {
      setResult(response.data);
    });
  }, [selectedDate, isClicked]);

  // delete 요청
  const deleteHandler = async (id, e) => {
    try {
      await axios
        .delete(`/api/dailyapi/daily`, { data: { id: id } })
        .then(() => {
          // 클릭한 버튼의 부모요소 삭제(안보이게)
          e.target.parentElement.style.display = "none";
        });
    } catch (err) {
      alert(err);
    }
  };

  // 수정 클릭시
  const editHandler = (id, e) => {};

  // fetch 요청
  const patchHandler = async (id, e) => {};

  return (
    <>
      {result &&
        result.map((v) => {
          const date = v.date.split("-");

          return (
            <div style={{ display: "flex", flexFlow: "column" }} key={v._id}>
              <table
                style={
                  v.directInput === false
                    ? { backgroundColor: "#d7d7d77d" }
                    : null
                }
              >
                <tbody
                  style={
                    v.date === selectedDate ? { border: "2px solid red" } : null
                  }
                >
                  <tr>
                    <td>{date[1] + "월" + " " + date[2] + "일"}</td>
                  </tr>
                  <tr>
                    <td>{v.data && v.data.aditor}</td>
                  </tr>
                  <tr>
                    <td>{v.data && v.data.saftybag_2}</td>
                  </tr>
                  <tr>
                    <td>{v.data && v.data.saftybag_3}</td>
                  </tr>
                  <tr>
                    <td>{v.data && v.data.saftybag_4}</td>
                  </tr>
                  <tr>
                    <td>{v.data && v.data.box_cardboard}</td>
                  </tr>
                  <tr>
                    <td>
                      <span>{v.data && v.data.box_tag4}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>{v.data && v.data.box_m}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>{v.data && v.data.opp_45}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>{v.data && v.data.opp_12}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>{v.data && v.data.opp_kyobo}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>{v.data && v.data.wrappingPaper}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* v가 데이터의 마지막 요소이면서 날짜가 현재 날짜인지 확인 (당일 데이터만 삭제 가능) */}
              {v === result[result.length - 1] &&
              result[result.length - 1].date === formattedToday ? (
                <button
                  onClick={(e) => {
                    deleteHandler(v._id, e);
                  }}
                >
                  삭제 🗑️
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    editHandler(v._id, e);
                  }}
                >
                  수정 ✏️
                </button>
              )}
            </div>
          );
        })}
    </>
  );
};

export default Dailydata;
