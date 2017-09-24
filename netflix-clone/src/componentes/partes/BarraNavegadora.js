import React, {Component} from "react";

export default class BarraNavegadora extends Component{

    render(){
        return(
            <section className="barra-navegadora">
                
                <div className="icono-principal">

                    <div className="icono contenedor-icono-menu" onClick={this.props.moverMenu}>
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </div>
                    
                    <div className="icono contenedor-titulo">
                        <h3>Netflix</h3>
                    </div>
                </div>

                <div className="icono-buscador">
                    <div className="icono contenedor-icono-1">
                        <input type="text"/>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </div>
                </div>

                <div className="icono-opciones">

                    <div className="icono contenedor-icono-2">
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                    </div>

                    <div className="icono contenedor-icono-3">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                    </div>
                </div>

            </section>
        )
    }
}