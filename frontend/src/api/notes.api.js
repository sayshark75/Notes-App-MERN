import axios from "axios";

const APIURL = process.env.APIKEY;

export const signUpUser = async (obj) => {
  try {
    const res = await axios.post(`${APIURL}/register`, obj);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const loginUser = async (obj) => {
  try {
    const res = await axios.post(`${APIURL}/login`, obj);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getData = async (token) => {
  try {
    const res = await axios.get(`${APIURL}/notes`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const postData = async (obj, token) => {
  try {
    const res = await axios.post(`${APIURL}/notes/`, obj, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const patchData = async (id, obj, token) => {
  try {
    const res = await axios.patch(`${APIURL}/notes/${id}`, obj, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const deleteData = async (id, token) => {
  try {
    const res = await axios.delete(`${APIURL}/notes/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
