import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"

import Principal from "./componentes/Principal"

export default class Routes extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Principal}/>
                    
                    {/*O redirigimos, o creamos un componente para not found*/}
                    <Redirect to="/"/>
                </Switch>
            </BrowserRouter>
        )
    }
}