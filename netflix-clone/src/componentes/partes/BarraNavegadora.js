import React, {Component} from "react";

export default class BarraNavegadora extends Component{
    constructor(props){
        super(props);
        this.state = {
            busqueda : ""
        }
        this.actualizarBusqueda = this.actualizarBusqueda.bind(this);
    }
    

    //Actualizador de busquedas
    actualizarBusqueda(evento){   
        this.setState({
            busqueda : evento.target.value
        })
    }

    //buscador de peliculas
    buscadorPeliculas(e){
        e.preventDefault();
        console.log(this.state);

        //Redirigir a la pagina que muestre los resultados de la busqueda
        window.location.href= `http://filnfo.herokuapp.com/busqueda?${this.state.busqueda}`
    }


    render(){
        return(
            <section className="barra-navegadora">
                
                <div className="icono-principal seccion-icono">

                    <div className="icono contenedor-icono-menu" onClick={this.props.moverMenu}>
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </div>
                    
                    <div className="icono contenedor-titulo">
                        <h3>Filnfo</h3>
                    </div>
                </div>

                <div className="icono-buscador seccion-icono">
                    <div className="icono contenedor-icono-1">
                        <form action="/" onSubmit={ e => this.buscadorPeliculas(e)}>
                            <input type="text" value={this.state.busqueda} onChange={ this.actualizarBusqueda }/>
                        </form>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </div>
                </div>

                <div className="icono-opciones seccion-icono">

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