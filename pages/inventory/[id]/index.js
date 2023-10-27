import React from 'react';
import DailyFixtureName from '../dailyfixturename';
import Dailydata from '../dailydata';
import dynamic from 'next/dynamic';
import Edit from './edit';
import PostTodayBtn from '@/components/PostTodayBtn';

const TimePickers = dynamic(() => import('../../../components/timePickers'), {
  ssr: false,
});

const index = () => {
  return (
    <main>
      <div className="daily_data_wrapper">
        <div className="daily-menu">
          <TimePickers />
          <PostTodayBtn />
        </div>
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
