import axios from 'axios';

const API_URL =
  'https://20j4xpf7sj.execute-api.ap-northeast-2.amazonaws.com/Prod';

const cache = {
  data: null,
};

const api = {
  getAllData: async () => {
    if (cache.data) {
      return cache.data;
    }

    try {
      const result = await axios.get(
        `${API_URL}/percentile/height-by-month/batch`
      );

      cache.data = result.data.Items;
      return cache.data;
    } catch (err) {
      return err.message;
    }
  },
};

export default api;
