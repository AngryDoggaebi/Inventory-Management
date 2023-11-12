import React from 'react';
import DailyFixtureName from '../../dailyfixturename';
import Dailydata from '../../dailydata';
import dynamic from 'next/dynamic';
import Edit from './edit';
import PostTodayBtn from '@/components/SSRPostTodayBtn';
import axios from 'axios';

const TimePickers = dynamic(
  () => import('../../../../components/timePickers'),
  {
    ssr: false,
  },
);

const index = ({ res, todayItem }) => {
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
        <Edit res={res} />
      </div>
    </main>
  );
};

export default index;

export const getStaticProps = async context => {
  const SERVER_HOST = process.env.SERVER_HOST;
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const id = context.params.id;

  let res = await axios.get(`${SERVER_HOST}/api/dailyapi/edit?id=${id}`);

  let res2 = await axios.get(
    `${SERVER_HOST}/api/dailyapi/specificDateChecker?date=${formattedToday}`,
  );

  return {
    props: {
      res: res.data,
      todayItem: res2.data,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: '654d941f36481bbdc52af4e0',
        },
      },
    ],
    fallback: true,
  };
};
