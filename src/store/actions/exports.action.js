import { FETCHEXPORTS, ADDEXPORTS, DELEXPORTS } from "../actions/types.action";
import axios from "axios";
import { api } from "../../api";

export function fetchExports() {
    return async dispatch => {
        let data;
        await axios
            .get(`${api}/exports/`)
            .then(res => (data = res.data))
            .catch(err => console.log(err));
        let action = { type: FETCHEXPORTS, payload: data };
        dispatch(action);
    };
}

export function addExports(data) {
    return async dispatch => {
        await axios
            .post(`${api}/exports/add`, data)
            .catch(err => alert(err));
        let action = { type: ADDEXPORTS, payload: data };
        dispatch(action);
    };
}

export function delExports(id) {
    return async dispatch => {
        await axios
            .delete(`${api}/exports/delete/` + id)
            .catch(err => alert(err));
        let action = { type: DELEXPORTS, payload: id };
        dispatch(action);
    };
}
