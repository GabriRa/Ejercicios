import React, {Component} from "react";

//Al hacer click en ña tarjeta, se abre el modal, cambiar a un boton?

export default class Pelicula extends Component{
    render(){
        return(
            <div className="tarjeta-pelicula" key={this.props.keyID} onClick={ e => { this.props.controlModal(this.props.peliculaInfo)}}>
                <div className="poster-pelicula">
                    <img src={`https://image.tmdb.org/t/p/w185/${this.props.peliculaInfo.poster_path}`} alt="" className="poster"/>
                </div>
                <div className="overlay-pelicula">
                    <h4>{this.props.peliculaInfo.title} <span>{this.props.peliculaInfo.vote_average}</span></h4>
                    {/*<p>{this.props.peliculaInfo.overview}</p>*/}
                </div>
            </div>
        )
    }
}