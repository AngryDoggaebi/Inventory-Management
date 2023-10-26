import Dailydata from './dailydata';
import Dailypost from './dailypost';
import dynamic from 'next/dynamic';
import DailyFixtureName from './dailyfixturename';
import Clock from '@/components/clock';

const TimePickers = dynamic(() => import('../../components/timePickers'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Clock />
      <div className="daily_data_wrapper">
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
