import React, {Component} from "react";

export default class SeleccionLoader extends Component{
    render(){
        return(
            <div className="contenedor-loader">

                <div className="contenedor-peliculas-loader">
                    <div className="pelicula-loader"></div>
                    <div className="pelicula-loader"></div>
                    <div className="pelicula-loader"></div>
                    <div className="pelicula-loader"></div>
                    <div className="pelicula-loader"></div>
                    <div className="pelicula-loader"></div>
                </div>

            </div>
        )
    }
}
