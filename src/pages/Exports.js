import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import ErrorSnackBar from "../Components/SnackBar";

// import Inputs from "./Inputs";
import Inputs from "../Components/Inputs";
import { connect } from "react-redux";
import { addExports } from "../store/actions/exports.action";
import { updateProduct } from "../store/actions/products.action";

const Imports = ({ products, addExports, updateProduct }) => {
    //states --------------------------------------//
    const [details, setDetails] = useState({
        productName: "",
        mode: "",
        rate: "",
        quantity: "",
        total: 0,
        userName: "",
        userPno: ""
    });
    const [currentObj, setCurrentObj] = useState([]);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");
    const [loading, setLoading] = useState(false);
    //handling Data events ------------------------------------------//
    function checkInputs() {
        if (
            !(
                details.productName &&
                details.quantity &&
                details.mode &&
                details.userName &&
                details.userPno
            )
        ) {
            setSnackOpen(true);
            setSnackMsg("Empyt Fields");
            return 1;
        }
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackOpen(false);
    };
    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (checkInputs()) {
            setLoading(false);
            return 0;
        }
        const newData = {
            ProductName: details.productName,
            Quantity: details.quantity,
            Rate: details.rate,
            mode: details.mode,
            Total: details.total,
            Customer: details.userName,
            Customer_Phone_No: details.userPno
        };

        addExports(newData)
            .then(() => {
                setSnackOpen(true);
                setSnackMsg("Product Added Successfully!");
                setLoading(false);
            })
            .catch(() => {
                setSnackOpen(true);
                setSnackMsg("Server Error!");
                setLoading(false);
            });
        let updateAvailable =
            Number(currentObj.Available) -
            Number(details.quantity) * Number(details.mode);

        const update = {
            ProductName: currentObj.ProductName,
            PricePerKg: currentObj.PricePerKg,
            PricePer25Bag: currentObj.PricePer25Bag,
            PricePer30Bag: currentObj.PricePer30Bag,
            PricePer50Bag: currentObj.PricePer50Bag,
            Available: updateAvailable
        };
        updateProduct(currentObj._id, update);
    }
    //handle Reset ------------------------------------------//
    function handleReset() {
        setDetails({
            productName: "",
            mode: "",
            rate: "",
            quantity: "",
            total: 0,
            userName: "",
            userPno: ""
        });
        setCurrentObj([]);
    }
    //handling user input events----------------------------------------//
    function handleProductChange(event) {
        let obj = products.find(
            query => query.ProductName === event.target.value
        );
        setDetails({ ...details, productName: event.target.value });
        setCurrentObj(obj);
    }
    function handleModeChange(event) {
        let rate = 0;
        if (event.target.value === "1") rate = currentObj.PricePerKg;
        else if (event.target.value === "25") rate = currentObj.PricePer25Bag;
        else if (event.target.value === "30") rate = currentObj.PricePer30Bag;
        else if (event.target.value === "50") rate = currentObj.PricePer50Bag;
        setDetails({ ...details, rate, mode: event.target.value });
    }
    function handleQChange(event) {
        let quantity = event.target.value;
        let total = details.rate * quantity;
        setDetails({ ...details, total, quantity });
    }
    const handleChange = input => event => {
        setDetails({ ...details, [input]: event.target.value });
    };
    return (
        <>
            <Paper
                style={{
                    padding: "1em 2em 2em 2em",
                    margin: "8em 2em 2em 2em"
                }}
                elevation={3}
            >
                <h1 align="center">Exports Page</h1>
                <Inputs
                    mode={1}
                    loading={loading}
                    setLoading={setLoading}
                    products={products}
                    details={details}
                    currentObj={currentObj}
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                    handleProductChange={handleProductChange}
                    handleModeChange={handleModeChange}
                    handleQChange={handleQChange}
                    handleChange={handleChange}
                />
            </Paper>
            <ErrorSnackBar
                open={snackOpen}
                handleClose={handleClose}
                messege={snackMsg}
            />
        </>
    );
};
const stateAsProps = reducers => {
    return {
        products: reducers.productsReducer.products,
        exports: reducers.exportsReducer.imports
    };
};
const actionAsProps = {
    addExports: addExports,
    updateProduct: updateProduct
};

export default connect(stateAsProps, actionAsProps)(Imports);
