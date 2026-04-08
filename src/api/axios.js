import axios from 'axios';

const BASE = 'http://localhost:3000';

export const get = async (target, params) => {
  try {
    const { data } = await axios.get(BASE + target, { params });
    return data;
  } catch (e) {
    console.error('[GET ERROR]', e);
    throw e;
  }
};

export const post = async (target, payload) => {
  try {
    const { data } = await axios.post(BASE + target, payload);
    return data;
  } catch (e) {
    console.error('[POST ERROR]', e);
    throw e;
  }
};
