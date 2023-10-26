import axios from 'axios';

export const deleteHandler = async id => {
  try {
    const res = await axios.delete('/api/dailyapi/daily', { data: { id: id } });

    return res;
  } catch (err) {
    alert(err);
  }
};
