import axios from "axios";
import { ADDIMPORTS, FETCHIMPORTS, DELIMPORTS } from "./types.action";
import { api } from "../../api";

export function fetchImports() {
    return async dispatch => {
        let resp = await fetch(`${api}/imports/`);
        let data = await resp.json();
        let action = { type: FETCHIMPORTS, payload: data };
        dispatch(action);
    };
}

export function addImports(data) {
    return async dispatch => {
        await axios.post(`${api}/imports/add`, data);
        let action = { type: ADDIMPORTS, payload: data };
        dispatch(action);
    };
}

export function delImports(id) {
    return async dispatch => {
        await axios
            .delete(`${api}/imports/delete/` + id)
            .then(() => alert("Item Deleted"))
            .catch(err => alert(err));
        let action = { type: DELIMPORTS, payload: id };
        dispatch(action);
    };
}
