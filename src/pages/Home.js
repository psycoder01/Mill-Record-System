import React, { useEffect, useState } from "react";
import { CssBaseline, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

import { StatusListSkeleton, RateListSkeleton } from "../Components/Skeleton";
import { connect } from "react-redux";
import { fetchProducts } from "../store/actions/products.action";
import { fetchImports } from "../store/actions/imports.action";
import { fetchExports } from "../store/actions/exports.action";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(4),
  },
  statusBar: {
    width: "55%",
  },
  ratesBar: {
    width: "45%",
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
}));

const StatusList = (props) => {
  return props.loading ? (
    <StatusListSkeleton />
  ) : (
    props.data.map((rate) => (
      <TableRow key={rate._id}>
        <TableCell>{rate.ProductName}</TableCell>
        <TableCell>{rate.Available}</TableCell>
      </TableRow>
    ))
  );
};

const RateList = (props) => {
  return props.loading ? (
    <RateListSkeleton />
  ) : (
    props.data.map((rate) => (
      <TableRow key={rate._id}>
        <TableCell>{rate.ProductName}</TableCell>
        <TableCell>{rate.PricePerKg}</TableCell>
        <TableCell>{rate.PricePer25Bag}</TableCell>
        <TableCell>{rate.PricePer30Bag}</TableCell>
        <TableCell>{rate.PricePer50Bag}</TableCell>
      </TableRow>
    ))
  );
};
const handleSubmit = (e) => {
  localStorage.removeItem("token");
  window.location.assign("/");
};
const Page = (props) => {
  const classes = useStyles();
  return (
    <CssBaseline>
      <div className={classes.root}>
        <Card className={classes.statusBar}>
          <h1 align="center">Status</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell>Available KG</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StatusList data={props.data} loading={props.loading} />
            </TableBody>
          </Table>
        </Card>
        <Card className={classes.ratesBar}>
          <h1 align="center">Rates</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell>Per KG</TableCell>
                <TableCell>25KG Bag</TableCell>
                <TableCell>30KG Bag</TableCell>
                <TableCell>50KG Bag</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <RateList data={props.data} loading={props.loading} />
            </TableBody>
          </Table>
        </Card>
      </div>
      <div
        style={{
          position: "relative",
          textAlign: "center",
          paddingTop: 60,
        }}
      >
        <Button
          variant="contained"
          style={{ width: "200px" }}
          color="primary"
          onClick={handleSubmit}
        >
          Log Out
        </Button>
      </div>
    </CssBaseline>
  );
};

const Home = ({ getProducts, products, fetchImports, fetchExports }) => {
  //Componet Did mount ------------------------//
  useEffect(
    () => {
      getProducts()
        .then(() => setLoading(false))
        .catch((err) => alert("Cannot Connect to Server"));
    }, // eslint-disable-next-line
    []
  );
  useEffect(
    () => {
      fetchImports();
    }, // eslint-disable-next-line
    []
  );
  useEffect(
    () => {
      fetchExports();
    }, // eslint-disable-next-line
    []
  );

  const [loading, setLoading] = useState(true);

  return <Page data={products} loading={loading} />;
};

const stateAsProps = (reducers) => {
  return {
    products: reducers.productsReducer.products,
  };
};
const actionAsProps = {
  getProducts: fetchProducts,
  fetchImports: fetchImports,
  fetchExports: fetchExports,
};
export default connect(stateAsProps, actionAsProps)(Home);
