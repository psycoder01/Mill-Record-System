import React, { useState} from "react";
import {
  TextField,
  Button,
  CssBaseline,
  TableContainer,
  Typography,
  MenuItem,
  Select,
} from "@material-ui/core";
import SearchResults from "../Components/SearchResults";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { delImports } from "../store/actions/imports.action";
import { delExports } from "../store/actions/exports.action";

const Search = ({ importData, exportData ,deleteExports,deleteImports}) => {
  const [search, getSearch] = useState({
    Product: "",
    Username: "",
    date: "",
  });
  const [result, setResult] = useState([]);
  const [transactions, setTransactions] = useState(new Set());
  const [mode, setMode] = useState(1);

  function getData() {
    if (mode) return exportData;
    else return importData;
  }
  function onSearch() {
    if (search.date === "" && search.Username === "" && search.Product === "") {
      alert("All Data are displayed!");
      setResult(getData());
    } else {
      if (mode)
        setResult(
          getData().filter(
            (item) =>
              item.createdAt.slice(0, 10).includes(search.date) &&
              item.ProductName.toLowerCase().includes(
                search.Product.toLowerCase()
              ) &&
              item.Customer.toLowerCase().includes(
                search.Username.toLowerCase()
              )
          )
        );
      else
        setResult(
          getData().filter(
            (item) =>
              item.createdAt.slice(0, 10).includes(search.date) &&
              item.ProductName.toLowerCase().includes(
                search.Product.toLowerCase()
              ) &&
              item.Merchant.toLowerCase().includes(
                search.Username.toLowerCase()
              )
          )
        );
    }
  }

  function onPrint(selected) {
    setTransactions([...transactions,selected
    ]);
  }

  async function onDelete(id) {
    if (mode) {
      await deleteExports(id);
      setResult(result.filter(item => item._id !== id));
    } else {
      await deleteImports(id);
      setResult(result.filter(item =>item._id !== id));
    }
  }

  //handle change Functions
  function handleChangeProducts(e) {
    getSearch({ ...search, Product: e.target.value });
  }

  function handleChangeUsername(e) {
    getSearch({ ...search, Username: e.target.value });
  }
  function handleChangeMode(e) {
    setResult([]);
    setMode(e.target.value);
  }
  function onChangeDate(e) {
    getSearch({ ...search, date: e.target.value });
  }

  const header = mode ? "Exports" : "Imports";
  const label = mode ? "Customer Name" : "Merchant Name";
  
  return (
    <CssBaseline>
      <div style={Styles.inputfiled}>
        <TextField
          style={Styles.inputfileds}
          id="date"
          label="Date"
          type="date"
          format="yyyy-mm-dd"
          onChange={onChangeDate}
          defaultValue={search.date}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          style={Styles.inputfileds}
          label="Product Name"
          onChange={handleChangeProducts}
          variant="outlined"
          value={search.Product}
        />
        <TextField
          style={Styles.inputfileds}
          label={label}
          onChange={handleChangeUsername}
          variant="outlined"
          value={search.Username}
        />
        <Select
          value={mode}
          onChange={handleChangeMode}
          style={Styles.inputfileds}
        >
          <MenuItem value={1}>Exports</MenuItem>
          <MenuItem value={0}>Imports</MenuItem>
        </Select>

        <Button
          variant="contained"
          color="primary"
          onClick={onSearch}
          style={Styles.button}
        >
          <SearchIcon />
        </Button>
        <Button
          variant="contained"
          style={Styles.button2}
          color="secondary"
          component={Link}
          to={{
            pathname: "/printExport",
            state:{ data:transactions,mode:mode}
          }}
        >
          Print
        </Button>
      </div>

      <div style={Styles.table}>
        <Typography align="center" variant="h4">
          {header} Transactions
        </Typography>
        <TableContainer style={Styles.tables}>
          <SearchResults
            mode={mode}
            data={result}
            onDelete={onDelete}
            onPrint={onPrint}
          />
        </TableContainer>
      </div>
    </CssBaseline>
  );
};

const Styles = {
  inputfiled: {
    marginTop: "6%",
    marginLeft: "5%",
    marginBottom: "2%",
    display: "flex",
  },
  inputfileds: {
    marginTop: "3%",
    marginLeft: "3%",
    marginBottom: "2%",
  },
  button: {
    marginTop: "3%",
    marginLeft: "5%",
    height: 50,
  },
  button2: {
    marginTop: "3%",
    marginLeft: "2%",
    height: 50,
    width: 100,
  },
  tables: {
    height: "380px",
  },
  table: {
    marginLeft: "3%",
  },
};

const stateAsProps = (reducers) => {
  return {
    importData: reducers.importsReducer.imports.reverse(),
    exportData: reducers.exportsReducer.exports.reverse(),
  };
};
const actionAsProps = {
    deleteImports:delImports,
    deleteExports:delExports
};

export default connect(stateAsProps, actionAsProps)(Search);
