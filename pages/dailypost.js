import styles from "./dailypost.module.css";
import { formattedToday } from "../utill/formattedDate";
import { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { IsClickedAtom } from "@/recoil/daily";

/** todo
 * post 빈 값, 자바스크립트 코드 등 에러핸들링
 * 입력 옆에 보통 부족 충분 선택하게 해서 컬러링
 */
const Dailypost = () => {
  const [isClicked, setIsClicked] = useRecoilState(IsClickedAtom);
  const [inputData, setInputData] = useState({
    aditor: "",
    saftybag_2: "",
    saftybag_3: "",
    saftybag_4: "",
    box_cardboard: "",
    box_tag4: "",
    box_m: "",
    opp_45: "",
    opp_12: "",
    opp_kyobo: "",
    wrappingPaper: "",
  });
  const {
    aditor,
    saftybag_2,
    saftybag_3,
    saftybag_4,
    box_cardboard,
    box_tag4,
    box_m,
    opp_45,
    opp_12,
    opp_kyobo,
    wrappingPaper,
  } = inputData;

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const postHandler = async () => {
    const data = { date: formattedToday, directInput: true, data: inputData };
    try {
      await axios.post(`/api/dailyapi/daily`, data).then((res) => {
        setIsClicked(isClicked + 1);
      });
    } catch (error) {
      alert(error.response.data);
      throw error;
    }
  };

  return (
    <>
      <form className={styles.postdata}>
        <div>{formattedToday}</div>
        <div>
          <input
            name="date"
            value={formattedToday}
            style={{ display: "none" }}
            readOnly
          />
        </div>
        <input
          placeholder="작성자"
          name="aditor"
          value={aditor}
          onChange={(e) => inputHandler(e)}
        />
        <input
          placeholder="안전봉투 2호"
          name="saftybag_2"
          value={saftybag_2}
          onChange={(e) => inputHandler(e)}
        />
        <input
          placeholder="안전봉투 3호"
          name="saftybag_3"
          value={saftybag_3}
          onChange={(e) => inputHandler(e)}
        />
        <input
          placeholder="안전봉투 4호"
          name="saftybag_4"
          value={saftybag_4}
          onChange={(e) => inputHandler(e)}
        />
        <input
          placeholder="박스 골판지"
          name="box_cardboard"
          value={box_cardboard}
          onChange={(e) => inputHandler(e)}
        />
        <input
          placeholder="박스 택4"
          name="box_tag4"
          value={box_tag4}
          onChange={(e) => inputHandler(e)}
        />
        <input
          placeholder="박스 중"
          name="box_m"
          value={box_m}
          onChange={(e) => inputHandler(e)}
        />
        <input
          placeholder="OPP테이프 4.5cm"
          name="opp_45"
          value={opp_45}
          onChange={(e) => inputHandler(e)}
        />
        <input
          placeholder="OPP테이프 1.2cm"
          name="opp_12"
          value={opp_12}
          onChange={(e) => inputHandler(e)}
        />
        <input
          placeholder="OPP테이프 교보"
          name="opp_kyobo"
          value={opp_kyobo}
          onChange={(e) => inputHandler(e)}
        />
        <input
          placeholder="포장지"
          name="wrappingPaper"
          value={wrappingPaper}
          onChange={(e) => inputHandler(e)}
        />
        <button type="button" onClick={postHandler}>
          입력하기
        </button>
      </form>
    </>
  );
};

export default Dailypost;
