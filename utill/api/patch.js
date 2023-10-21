import axios from 'axios';

export const patchHandler = async (id, inputData) => {
  try {
    const res = await axios.patch(`/api/dailyapi/edit?id=${id}`, inputData);

    return res;
  } catch (error) {
    alert(error);
    throw error;
  }
};
