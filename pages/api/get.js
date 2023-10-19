import axios from "axios";

export const getHandler = async (selectedDate) => {
  try {
    const response = await axios.get(`/api/dailyapi/daily`, {
      params: {
        selectedDate: selectedDate,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
