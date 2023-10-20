import axios from 'axios';

export const postHandler = async (
  formattedToday,
  inputData,
  setIsClicked,
  isClicked,
) => {
  const data = { date: formattedToday, directInput: true, data: inputData };
  try {
    await axios.post('/api/dailyapi/daily', data).then(() => {
      setIsClicked(isClicked + 1);
    });
  } catch (error) {
    alert(error.response.data);
    throw error;
  }
};
