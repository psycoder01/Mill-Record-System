import {
    FETCHPRODUCTS,
    UPDATEPRODUCT,
    DELPRODUCT,
    ADDPRODUCT
} from "./types.action";
import axios from "axios";
import { api } from "../../api";

export function fetchProducts() {
    return async dispatch => {
        let res = await fetch(`${api}/products`);
        let data = await res.json();
        let action = { type: FETCHPRODUCTS, payload: data };
        dispatch(action);
    };
}
export function updateProduct(id, update) {
    return async dispatch => {
        await axios.put(`${api}/products/update/` + id, update);
        let action = { type: UPDATEPRODUCT, payload: update };
        dispatch(action);
    };
}

export function addProduct(data) {
    return async dispatch => {
        await axios
            .post(`${api}/products/add`, data)
            .then(() => alert("added Product"))
            .catch(err => alert("Error::" + err));

        let action = { type: ADDPRODUCT, payload: data };
        dispatch(action);
    };
}

export function delProduct(id) {
    return async dispatch => {
        await axios
            .delete(`${api}/products/delete/` + id)
            .then(() => alert("Item Deleted"))
            .catch(err => alert(err));

        let action = { type: DELPRODUCT, payload: id };
        dispatch(action);
    };
}
