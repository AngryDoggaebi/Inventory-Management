import React from 'react';
import DailyFixtureName from '../dailyfixturename';
import Dailydata from '../dailydata';
import dynamic from 'next/dynamic';
import Edit from './edit';
import axios from 'axios';
import { formattedToday } from '@/utill/formattedDate';
import PostTodayBtn from '@/components/PostTodayBtn';

const TimePickers = dynamic(() => import('../timePickers'), { ssr: false });

const index = ({ item, todayItem }) => {
  return (
    <main>
      <div className="daily_data_wrapper">
        <div className="daily-menu">
          <TimePickers />
          <PostTodayBtn todayItem={todayItem} />
        </div>
        <div className="daily-data">
          <DailyFixtureName />
          <Dailydata />
        </div>
      </div>
      <div className="daily_post_wrapper">
        <Edit item={item} />
      </div>
    </main>
  );
};

export default index;

export const getServerSideProps = async context => {
  const id = context.params.id;
  const res = await axios.get(
    `${process.env.SERVER_HOST}/api/dailyapi/edit?id=${id}`,
  );

  const res2 = await axios.get(
    `${process.env.SERVER_HOST}/api/dailyapi/specificDateChecker?date=${formattedToday}`,
  );

  return {
    props: {
      item: res.data,
      todayItem: res2.data,
    },
  };
};
