import axios from 'axios';

export const postHandler = async (formattedToday, inputData) => {
  const data = { date: formattedToday, directInput: true, data: inputData };
  try {
    return await axios.post('/api/dailyapi/daily', data);
  } catch (error) {
    alert(error.response && error.response.data);
    throw error;
  }
};
