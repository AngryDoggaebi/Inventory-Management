import styles from "./dailypost.module.css";
import { formattedDate } from "../utill/currentdate";

const Dailypost = () => {
  return (
    <>
      <form
        action="/api/dailyapi/daily"
        method="POST"
        className={styles.postdata}
      >
        <div>{formattedDate}</div>
        <div>
          <input
            name="date"
            value={formattedDate}
            style={{ display: "none" }}
            readOnly
          />
        </div>

        <input placeholder="작성자" name="aditor" />

        <input placeholder="안전봉투 2호" name="saftybag_2" />

        <input placeholder="안전봉투 3호" name="saftybag_3" />

        <input placeholder="안전봉투 4호" name="saftybag_4" />

        <input placeholder="박스 골판지" name="box_cardboard" />

        <input placeholder="박스 택4" name="box_tag4" />

        <input placeholder="박스 중" name="box_m" />

        <input placeholder="OPP테이프 4.5cm" name="opp_45" />

        <input placeholder="OPP테이프 1.2cm" name="opp_12" />

        <input placeholder="OPP테이프 교보" name="opp_kyobo" />

        <input placeholder="포장지" name="wrappingPaper" />

        <button type="submit">입력하기</button>
      </form>
    </>
  );
};

export default Dailypost;
