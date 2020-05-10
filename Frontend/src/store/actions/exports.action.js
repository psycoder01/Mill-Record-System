import { FETCHEXPORTS, ADDEXPORTS,DELEXPORTS } from "../actions/types.action";
import axios from 'axios';

const url = "https://mgmtsys.herokuapp.com/exports";

export function fetchExports() {
  return async (dispatch) => {
    let resp = await fetch(`${url}`);
    let data = await resp.json();
    let action = { type: FETCHEXPORTS, payload:data };
    dispatch(action);
  };
}

export function addExports(data) {
  return async (dispatch) => {
    await axios
      .post(`${url}/add`, data)
      .then(() => alert("Data is added!"))
      .catch((err) => alert(err));
    let action = { type: ADDEXPORTS, payload: data };
    dispatch(action);
  };
}

export function delExports(id) {
  return async (dispatch) => {
    await axios
      .delete(`${url}/delete/` + id)
      .then(() => alert("Item Deleted"))
      .catch((err) => alert(err));
    let action ={type:DELEXPORTS,payload:id};
    dispatch(action);
  };
}
