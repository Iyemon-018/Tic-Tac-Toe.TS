import * as React from "react";
import {createRoot} from 'react-dom/client';
import "./styles.css";

import * as App from "./App";

// ReactDOM.render は React 18 より非推奨となったため
// createRoot を使用する。
// https://ja.reactjs.org/docs/react-dom-client.html#createroot
const container = document.getElementById('root');
if (!container) throw new Error('Not found root elementl.');

const root = createRoot(container);
root.render(<App.default />);
