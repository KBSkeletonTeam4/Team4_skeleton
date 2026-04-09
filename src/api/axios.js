import axios from "axios";
const BASE = "http://localhost:3000";

export const get = async (target, params) => {
  try {
    console.log("[GET]", BASE + target, params);
    const { data } = await axios.get(BASE + target, { params });
    return data;
  } catch (e) {
    console.log("[ERROR]", e);
  }
  return [];
};

export const post = async (target, payload) => {
  try {
    console.log("[PUT]", BASE + target, payload);
    const { data } = await axios.post(BASE + target, payload);
    return data;
  } catch (e) {
    console.error(e);
  }
  return {};
};

export const put = async (target, payload) => {
  try {
    console.log("[POST]", BASE + target, payload);
    const { data } = await axios.put(BASE + target, payload);
    return data;
  } catch (e) {
    console.error(e);
  }
  return {};
};

export const remove = async (target, params) => {
  try {
    console.log("[DELETE]", BASE + target, params);
    const { data } = await axios.delete(BASE + target, { params });
    return data;
  } catch (e) {
    console.error(e);
  }
  return {};
};

export default { get, post, put, remove };
