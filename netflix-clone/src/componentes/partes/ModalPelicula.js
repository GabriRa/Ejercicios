import React, {Component} from "react";

export default class ModalPelicula extends Component{
    render(){
        return(
            <div className={`contenedor-modal ${this.props.efecto}`}>
                <div className="modal-boton quitar-modal" onClick={this.props.quitarModal}></div>
                <div className="modal-principal">
                    <p>
                        Holas
                        Titulo:{this.props.infoPelicula.tittle}
                        Numero Votos: {this.props.infoPelicula.vote_count}
                        Descripcion: {this.props.infoPelicula.overview}
                    </p>
                    <a href={`/pelicula/${this.props.infoPelicula.id}`}></a>
                </div>
            </div>
        )
    }
}