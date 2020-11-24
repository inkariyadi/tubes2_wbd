import React from 'react';
import {Route,Switch} from "react-router-dom";
import Login from './login'
import DataCoklatResep from './dataCoklatResep';
import DaftarHarga from './components/daftarHarga';
import BeliBahan from './components/beliBahan';

const MainRouter = () =>(
    <div>
        <switch>
            <Route exact path='/belibahan' component={BeliBahan}></Route>
            <Route exact path='/daftarharga' component={DaftarHarga}></Route>
            <Route exact path='/datacoklat' component={DataCoklatResep}></Route>
            <Route exact path='/' component={Login}></Route>
        </switch>
    </div>
)

export default MainRouter;