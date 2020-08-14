import React from "react";
import {
    Select,
    InputLabel,
    Button,
    FormControl,
    TextField,
    MenuItem,
    CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    position: {
        marginLeft: theme.spacing(8)
    },
    buttons: {
        marginTop: theme.spacing(5)
    }
}));

const Inputs = props => {
    const classes = useStyles();
    const user = props.mode === 0 ? "Merchant" : "Customer";
    return (
        <React.Fragment>
            <h4>Product Details</h4>
            <div className={classes.root}>
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Select
                        value={props.details.productName}
                        onChange={props.handleProductChange}
                        style={{ width: 130 }}
                    >
                        {props.products.map(current => {
                            return (
                                <MenuItem
                                    key={current._id}
                                    value={current.ProductName}
                                >
                                    {current.ProductName}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl
                    component="fieldset"
                    className={classes.position}
                    style={{ width: 150 }}
                >
                    <InputLabel>Options</InputLabel>
                    <Select
                        value={props.details.mode}
                        onChange={props.handleModeChange}
                    >
                        <MenuItem value="1">Per KG</MenuItem>
                        <MenuItem value="25">25 KG Bag</MenuItem>
                        <MenuItem value="30">30 KG Bag</MenuItem>
                        <MenuItem value="50">50 KG Bag</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Rate"
                    disabled
                    variant="outlined"
                    value={props.details.rate}
                    style={{ width: 80 }}
                    className={classes.position}
                />
                <TextField
                    variant="outlined"
                    label="Quantity"
                    value={props.details.quantity}
                    onChange={props.handleQChange}
                    style={{ width: 100 }}
                    className={classes.position}
                />
                <TextField
                    variant="outlined"
                    label="Total"
                    disabled
                    value={props.details.total}
                    className={classes.position}
                />
            </div>
            <br />
            <br />
            <h4>{user} Details</h4>
            <div className={classes.root}>
                <TextField
                    variant="outlined"
                    label="Name"
                    type="text"
                    value={props.details.userName}
                    onChange={props.handleChange("userName")}
                />
                <TextField
                    variant="outlined"
                    className={classes.position}
                    label="Phone No"
                    type="text"
                    value={props.details.userPno}
                    onChange={props.handleChange("userPno")}
                />
            </div>
            <div className={clsx(classes.buttons, classes.root)}>
                <Button
                    variant="contained"
                    style={{ width: "200px" }}
                    color="primary"
                    onClick={props.handleSubmit}
                >
                    {props.loading ? (
                        <CircularProgress color="secondary" />
                    ) : (
                        "Add"
                    )}
                </Button>
                <Button
                    variant="contained"
                    style={{ width: "200px" }}
                    color="secondary"
                    className={classes.position}
                    onClick={props.handleReset}
                >
                    Reset
                </Button>
            </div>
        </React.Fragment>
    );
};

export default Inputs;
