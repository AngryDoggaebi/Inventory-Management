import axios from 'axios';

export const getHandler = async (selectedDate, formattedToday) => {
  try {
    const response = await axios.get('/api/dailyapi/daily', {
      params: {
        selectedDate: selectedDate,
        formattedToday: formattedToday,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSpecificDateDataHandler = async (date, setItem) => {
  await axios
    .get(`/api/dailyapi/specificDateChecker?date=${date}`)
    .then(data => {
      setItem(data.data);
    });
};
