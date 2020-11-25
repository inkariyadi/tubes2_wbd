import React from 'react';
import {Route,Switch} from "react-router-dom";
import Login from './login'
import DataCoklatResep from './dataCoklatResep';
import DaftarHarga from './components/daftarHarga';
import BeliBahan2 from './components/beliBahan2';
import Home from './components/home';
import Router2 from "./router2";
const MainRouter = () =>(
    <div>
        <switch>
            {/* <Route exact path='/belibahan' component={BeliBahan2}></Route>
            <Route exact path='/daftarharga' component={DaftarHarga2}></Route>
            <Route exact path='/datacoklat' component={DataCoklatResep}></Route> */}
            <Route exact path='/' component={Login}></Route>
            
            <Route exact path='/home' component={Router2}></Route>

            
            
        </switch>
    </div>
)

export default MainRouter;