import Dailydata from './dailydata';
import Dailypost from './dailypost';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Clock from '../clock';
import DailyFixtureName from './dailyfixturename';

const TimePickers = dynamic(() => import('./timePickers'), { ssr: false });

export default function Home() {
  return (
    <main>
      <div className="daily_data_wrapper">
        <Clock />
        <Suspense fallback={<div>로딩 중. . .</div>}>
          <TimePickers />
        </Suspense>

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