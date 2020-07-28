import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Components Import
import Products_info from "./Components/Products.info";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Exports from "./pages/Exports";
import Appbar from "./Components/Appbar";
import Imports from "./pages/Imports";
import PrintExport from "./Components/PrintExport";
import Login from "./pages/Login";

function App() {
    const token = localStorage.getItem("token");
    const [isLogin, setLogin] = useState(token ? true : false);

    return isLogin ? (
        <Router>
            <div className="App">
                <Appbar />
                <Route path="/" exact component={Home} />
                <Route path="/exports" component={Exports} />
                <Route path="/imports" component={Imports} />
                <Route path="/search" component={Search} />
                <Route path="/products" component={Products_info} />
                <Route path="/printExport" component={PrintExport} />
            </div>
        </Router>
    ) : (
        <Login isLogin={isLogin} setLogin={setLogin} />
    );
}

export default App;
