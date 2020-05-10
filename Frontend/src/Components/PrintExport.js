import React from "react";
import { Button } from "@material-ui/core/";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Transaction = (props) => (
  <TableRow>
    <TableCell>{props.personName}</TableCell>
    <TableCell>{props.row.ProductName}</TableCell>
    <TableCell>{props.Qty}</TableCell>
    <TableCell>{props.row.Rate}</TableCell>
    <TableCell>{props.row.Total}</TableCell>
  </TableRow>
);

const Transactions = (props) => {
  return props.data
    .map((currentinfo) => {
      console.log(currentinfo);
      const userName = props.mode
        ? currentinfo.Customer
        : currentinfo.Merchant;
      const userPno = props.mode
        ? currentinfo.Customer_Phone_No
        : currentinfo.Merchant_Phone_No;

      let Qty = "";

      if (currentinfo.mode === 1) Qty = `${currentinfo.Quantity} KG(s)`;
      else if (currentinfo.mode === 25)
        Qty = `${currentinfo.Quantity} (25KGs Bag)`;
      else if (currentinfo.mode === 30)
        Qty = `${currentinfo.Quantity} (30KGs Bag)`;
      else if (currentinfo.mode === 50)
        Qty = `${currentinfo.Quantity} (50KGs Bag)`;

      return (
        <Transaction
          key={currentinfo._id}
          row={currentinfo}
          personName={userName}
          personPno={userPno}
          Qty={Qty}
        />
      );
    });
};

export default function PrintExport(props) {
  const date = new Date();
  const dateinwords = date.toString().slice(0, 15);

  const { data, mode } = props.location.state;
  console.log(data,mode);

  function getTotal() {
    return data.reduce((total,item)=> total + item.Total,0)
  }

  return (
    <React.Fragment>
      <div
          style={{
            position: "relative",
            width: 600,
            textAlign: "center",
            margin: "auto",
            paddingTop: 60
          }}
        >
          <br />
          <br />
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>{dateinwords}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Line Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Transactions
                data={data}
                mode={mode}
              />
              <br />
              <TableRow>
                <TableCell colSpan="4">Subtotal :</TableCell>
                <TableCell>{getTotal()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <br />
          <br />
          <style>{`@media print {.no-print{display: none;}}`}</style>
          <div className="no-print">
            <Button
              color="primary"
              variant="contained"
              onClick={() => window.print()}
            >
              Print
            </Button>
            &emsp;
            <Button
              component={Link}
              to={"/search"}
              color="primary"
              variant="contained"
            >
              Back
            </Button>
          </div>
        </div>
    </React.Fragment>
  );
}
