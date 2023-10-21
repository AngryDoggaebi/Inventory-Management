import Dailydata from './dailydata';
import Dailypost from './dailypost';
import dynamic from 'next/dynamic';
import Clock from '../clock';
import DailyFixtureName from './dailyfixturename';

const TimePickers = dynamic(() => import('../../components/timePickers'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <div className="daily_data_wrapper">
        <Clock />
        <div className="daily-menu">
          <TimePickers />
        </div>

        <div className="daily-data">
          <DailyFixtureName />
          <Dailydata />
        </div>
      </div>
      <div className="daily_post_wrapper">
        <Dailypost />
      </div>
    </main>
  );
}
