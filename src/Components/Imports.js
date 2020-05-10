import React, { useState} from "react";
import { CssBaseline } from "@material-ui/core";

// import Inputs from "./Inputs";
import Inputs from "./Inputs";
import { connect } from "react-redux";
import { addImports} from "../store/actions/imports.action";
import {updateProduct} from '../store/actions/products.action';

const classes = {
  root: {
    marginTop: 80,
    marginLeft: 60
  }
};

const Imports = ({ products, addImports,updateProduct }) => {

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
  //handling Data events ------------------------------------------//
  function handleSubmit(e) {
    e.preventDefault();
    const newData = {
      ProductName: details.productName,
      Quantity: details.quantity,
      Rate: details.rate,
      mode: details.mode,
      Total: details.total,
      Merchant: details.userName,
      Merchant_Phone_No: details.userPno
    };

    addImports(newData);
    let updateAvailable =
      Number(currentObj.Available) +
      Number(details.quantity) * Number(details.mode);

    const update = {
      ProductName: currentObj.ProductName,
      PricePerKg: currentObj.PricePerKg,
      PricePer25Bag: currentObj.PricePer25Bag,
      PricePer30Bag: currentObj.PricePer30Bag,
      PricePer50Bag: currentObj.PricePer50Bag,
      Available: updateAvailable
    };
    updateProduct(currentObj._id,update);
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
      (query) => query.ProductName === event.target.value
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
  const handleChange = (input) => (event) => {
    setDetails({ ...details, [input]: event.target.value });
  };
  return (
    <CssBaseline>
      <div style={classes.root}>
        <h1 align="center">Imports Page</h1>
        <Inputs
          mode={0}
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
      </div>
    </CssBaseline>
  );
};
const stateAsProps = (reducers) => {
  return {
    products: reducers.productsReducer.products,
    imports: reducers.importsReducer.imports
  };
};
const actionAsProps = {
  addImports: addImports,
  updateProduct:updateProduct
};

export default connect(stateAsProps, actionAsProps)(Imports);