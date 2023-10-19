import { TodayAtom } from "@/recoil/date";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const Clock = () => {
  const [today, setToday] = useRecoilState(TodayAtom);

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      // 타임존 명시
      const todayInKorea = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(now);

      setToday(new Date(todayInKorea));
    }, 1000);
    return () => clearInterval(id);
  }, []);
};

export default Clock;
