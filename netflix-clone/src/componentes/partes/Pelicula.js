import React, {Component} from "react";

//Al hacer click en ña tarjeta, se abre el modal, cambiar a un boton?

export default class Pelicula extends Component{
    render(){
        return(
            <div className="tarjeta-pelicula" key={this.props.keyID}>
                <a href={`http://filnfo.herokuapp.com/pelicula/${this.props.peliculaInfo.id}`}>
                    <div className="poster-pelicula">
                        <img src={`https://image.tmdb.org/t/p/w185/${this.props.peliculaInfo.poster_path}`} alt="" className="poster"/>
                    </div>
                    <div className="overlay-pelicula">
                        <span className="title">{this.props.peliculaInfo.title} </span>
                        <span className="vote">{this.props.peliculaInfo.vote_average}</span>
                    </div>
                </a>
            </div>
        )
    }
}