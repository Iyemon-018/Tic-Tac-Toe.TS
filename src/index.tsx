import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles.css";

import * as App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <App.Board />
    </React.StrictMode>,
    document.getElementById("root")
)