import React from 'react';
import DailyFixtureName from '../dailyfixturename';
import Dailydata from '../dailydata';

import dynamic from 'next/dynamic';
import Edit from './edit';

const TimePickers = dynamic(() => import('../timePickers'), { ssr: false });

const index = () => {
  return (
    <main>
      <div className="daily_data_wrapper">
        <TimePickers />

        <div className="daily-data">
          <DailyFixtureName />
          <Dailydata />
        </div>
      </div>
      <div className="daily_post_wrapper">
        <Edit />
      </div>
    </main>
  );
};

export default index;
