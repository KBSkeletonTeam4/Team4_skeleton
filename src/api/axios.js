import axios from 'axios';

const BASE = 'http://localhost:3000';

export const get = async (target, params) => {
  const { data } = await axios.get(BASE + target, { params });
  return data;
};

export const post = async (target, payload) => {
  const { data } = await axios.post(BASE + target, payload);
  return data;
};

export const put = async (target, payload) => {
  const { data } = await axios.put(BASE + target, payload);
  return data;
};

export const remove = async (target) => {
  const { data } = await axios.delete(BASE + target);
  return data;
};
