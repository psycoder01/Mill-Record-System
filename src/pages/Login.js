import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  TextField,
  Paper,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
const styles = makeStyles({
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    margin: "0",
    padding: "0",
    backgroundColor: "#f7f7f7",
  },
  input: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginTop: "2rem",
  },
});

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const classes = styles();
  const [check, setCheck] = useState("");

  const handleChange = (event) => {
    setCheck(event.target.value);
  };
  const misMatch = () => {
    alert("Wrong Password!!");
    setCheck("");
  };
  const handleSubmit = (event) => {
    setLoading(true);
    axios
      .get("https://mgmtsys.herokuapp.com/login/")
      .then((res) => {
        if (check === res.data[0].password) {
          localStorage.setItem("token", "anyrandomstring");
          props.setLogin(true);
          setLoading(false);
        } else misMatch();
      })
      .catch((err) => alert(err));
  };
  if (props.isLogin) {
    return <Redirect to="/" />;
  }

  //Checking if the user is logged in or not
  props.setLogin(localStorage.getItem("token") ? true : false);

  return (
    <React.Fragment>
      <Paper style={{ height: "100vh" }}>
        <div className={classes.paper}>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Rice Mill System
          </Typography>
          <div className={classes.input}>
            <TextField
              type="password"
              name="password"
              label="Password"
              value={check}
              variant="filled"
              onChange={handleChange}
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              {loading ? <CircularProgress color="secondary" /> : "LOGIN"}
            </Button>
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};

export default Login;
