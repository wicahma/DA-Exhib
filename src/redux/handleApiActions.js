import axios from "axios";

export const GET_DATA = "GET_DATA";
export const GET_DATA_SUCCES = "GET_DATA_SUCCES";
export const GET_DATA_FAIL = "GET_DATA_FAIL";

const rootPath = process.env.REACT_APP_API_POINT;

export const getData = () => ({
  type: GET_DATA,
  payload: null,
});

export const getDataSucceed = (data) => ({
  type: GET_DATA_SUCCES,
  payload: data,
});

export const getDataFail = (error) => ({
  type: GET_DATA_FAIL,
  payload: error,
});

export const handleDeleteLocalStorage = () => {
  return (dispatch) => {
    localStorage.removeItem("dataUser");
  };
};

export const fetchAPI = (dataPath) => {
  return (dispatch) => {
    dispatch(getData());
    axios
      .get(`${rootPath}/${dataPath}`)
      .then((res) => {
        // console.log(res);
        dispatch(getDataSucceed(res.data));
      })
      .catch((err) => {
        dispatch(getDataFail(err));
      });
  };
};
