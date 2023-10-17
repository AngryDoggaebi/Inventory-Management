"use client";

import { SelectedDateAtom } from "@/recoil/date";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";

const Dailydata = () => {
  const [result, setResult] = useState();
  const selectedDate = useRecoilValue(SelectedDateAtom);

  useEffect(() => {
    const getHandler = async () => {
      try {
        await axios
          .get(`/api/dailyapi/daily`, {
            params: {
              selectedDate: selectedDate,
            },
          })
          .then((response) => {
            setResult(response.data);
          });
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    getHandler();
  }, [selectedDate]);

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

  return (
    <>
      {result &&
        result.map((v) => {
          const date = v.date.split("-");

          return (
            <div style={{ display: "flex", flexFlow: "column" }} key={v._id}>
              <table>
                <tbody>
                  <tr>
                    <td>{date[1] + "월" + " " + date[2] + "일"}</td>
                  </tr>
                  <tr>
                    <td>{v.aditor}</td>
                  </tr>
                  <tr>
                    <td>{v.saftybag_2}</td>
                  </tr>
                  <tr>
                    <td>{v.saftybag_3}</td>
                  </tr>
                  <tr>
                    <td>{v.saftybag_4}</td>
                  </tr>
                  <tr>
                    <td>{v.box_cardboard}</td>
                  </tr>
                  <tr>
                    <td>
                      <span>{v.box_tag4}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>{v.box_m}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>{v.opp_45}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>{v.opp_12}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>{v.opp_kyobo}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>{v.wrappingPaper}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={(e) => {
                  deleteHandler(v._id, e);
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
    </>
  );
};

export default Dailydata;
