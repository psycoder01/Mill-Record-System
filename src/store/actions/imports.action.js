import axios from "axios";
import { ADDIMPORTS, FETCHIMPORTS, DELIMPORTS } from "./types.action";

const url = "https://mgmtsys.herokuapp.com/imports";

export function fetchImports() {
  return async (dispatch) => {
    let resp = await fetch(url);
    let data = await resp.json();
    let action = { type: FETCHIMPORTS, payload: data };
    dispatch(action);
  };
}

export function addImports(data) {
  return async (dispatch) => {
    await axios
      .post(`${url}/add`, data)
      .then(() => alert("Data is added!"))
      .catch((err) => alert(err));
    let action = { type: ADDIMPORTS, payload: data };
    dispatch(action);
  };
}

export function delImports(id) {
  return async (dispatch) => {
    await axios
      .delete(`${url}/delete/` + id)
      .then(() => alert("Item Deleted"))
      .catch((err) => alert(err));
    let action = { type: DELIMPORTS, payload: id };
    dispatch(action);
  };
}
