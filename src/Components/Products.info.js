import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import Products from "../pages/Products";
import ProductTable from "./ProductTable";

import {
  fetchProducts,
  addProduct,
  updateProduct,
  delProduct,
} from "../store/actions/products.action";

const Products_info = ({
  fetchProducts,
  addProduct,
  updateProduct,
  delProduct,
  products,
}) => {
  const [data, setData] = useState({
    Product: "",
    PricePerKg: "",
    PricePer25Bag: "",
    PricePer30Bag: "",
    PricePer50Bag: "",
    Available: 0,
    Available25Bag: 0,
    Available30Bag: 0,
    Available50Bag: 0,
  });

  useEffect(
    () => {
      fetchProducts();
    },
    // eslint-disable-next-line
    []
  );

  function onDelete(id) {
    delProduct(id);
  }

  function onSubmit() {
    const newProduct = {
      ProductName: data.Product,
      PricePerKg: data.PricePerKg,
      PricePer25Bag: data.PricePer25Bag,
      PricePer30Bag: data.PricePer30Bag,
      PricePer50Bag: data.PricePer50Bag,
      Available: data.Available,
      Available25Bag: data.Available25Bag,
      Available30Bag: data.Available30Bag,
      Available50Bag: data.Available50Bag,
    };
    addProduct(newProduct);
    handleReset();
  }
  function handleReset() {
    setData({
      Product: "",
      PricePerKg: "",
      PricePer25Bag: "",
      PricePer30Bag: "",
      PricePer50Bag: "",
      Available: 0,
      Available25Bag: 0,
      Available30Bag: 0,
      Available50Bag: 0,
    });
  }
  const handleChange = (input) => (e) => {
    setData({ ...data, [input]: e.target.value });
  };

  return (
    <div>
      <Products values={data} handleChange={handleChange} onSubmit={onSubmit} />
      <Container style={Styles.table}>
        <ProductTable Tableinfo={products} onDelete={onDelete} />
      </Container>
    </div>
  );
};

const stateAsProps = (reducer) => {
  return {
    products: reducer.productsReducer.products,
  };
};

const actionAsProps = {
  addProduct: addProduct,
  fetchProducts: fetchProducts,
  delProduct: delProduct,
  updateProduct: updateProduct,
};

export default connect(stateAsProps, actionAsProps)(Products_info);

const Styles = {
  table: {
    marginLeft: "4%",
    marginTop: "4%",
  },
};
