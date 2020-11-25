import react,{Component} from "react";
import {BrowserRouter} from "react-router-dom";
import MainRouter from "./mainRouter";
import Router2 from "./router2";

const App = () => (
    <BrowserRouter>
        <MainRouter/>
        {/* <Router2/> */}
    </BrowserRouter>
);

export default App;
