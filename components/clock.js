import { setToday, setYesterday } from '@/redux/date';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Clock = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(setToday());
      dispatch(setYesterday());
    }, 1000);
    return () => clearInterval(id);
  }, []);
};

export default Clock;
