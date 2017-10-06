import React, {Component} from "react";

const queryBase = "http://filnfo.herokuapp.com/pelicula/id/";


export default class ContenidoInfo extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            infoPelicula : {
                tmbdAPI : {},
                imdbAPI : {}
            },
            acabado: false,
        }
    }


    componentDidMount(){
        fetch(queryBase + this.props.match.params.peliculaID)
            .then(response => response.json())
            .then(data => this.setState({ infoPelicula : data , acabado : true}))
    }

    // Hacer algo onload de imagenes y con los datos

    render(){

        let date = ["YYYY", "MM", "DD"];
        let genero = "";
        if (this.state.infoPelicula.tmbdAPI.id){
            date = this.state.infoPelicula.tmbdAPI.release_date.split("-");
            genero = this.state.infoPelicula.tmbdAPI.genres[0].name
        }

        if(!this.state.infoPelicula.tmbdAPI.id){
            return (
                <section className={`contenedor-principal contenedor-`}>
                    Estoy Cagando 
                </section>
            )
        }

        return(
            <section className={`contenedor-principal contenedor-`}>
                <div className="pelicula-fondo-presentacion" style={{backgroundImage : `url("https://image.tmdb.org/t/p/original${this.state.infoPelicula.tmbdAPI.backdrop_path}")`}} >
                    <div className="pelicula-presentacion">


                        <div className="presentacion-informacion">

                            <div className="presentacion-titulo">
                                {this.state.infoPelicula.tmbdAPI.title} <span>({this.state.infoPelicula.tmbdAPI.release_date.split("-")[0]})</span>
                            </div>

                            <div className="presentacion-caracteristicas">

                                <div className="caracteristicas-puntuacion">
                                    <div className="circulo-caracteristicas">
                                        {this.state.infoPelicula.tmbdAPI.vote_average * 10}%
                                    </div>
                                </div>
                                <div className="caracteristicas-imdb">
                                    <div className="circulo-caracteristicas">
                                        <a href={this.state.infoPelicula.imdbAPI.url.url}>
                                            IMDB
                                        </a>
                                    </div>
                                </div>
                                <div className="caracteristicas-trailer">
                                    <div className="circulo-caracteristicas">
                                        <a href={this.state.infoPelicula.imdbAPI.trailer.length != 0 ? this.state.infoPelicula.imdbAPI.trailer[0].videoUrl : null}>
                                            <i className="fa fa-play" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>

                            </div>

                            <div className="presentacion-overview">
                                <h2>Overview</h2>
                                <p>
                                    {this.state.infoPelicula.tmbdAPI.overview.split(" ").slice(0, 70).join(" ") + "..."}
                                </p>
                            </div>

                            <div className="presentacion-equipo">

                                <h2>Equipo Técnico</h2>

                                <div className="equipo-tecnico">
                                    <div className="equipo equipo-director">
                                        <span className="equipo-categoria">Director</span>
                                        <p>{this.state.infoPelicula.imdbAPI.director}</p>
                                    </div>
                                    <div className="equipo equipo-actores">
                                        <span className="equipo-categoria">Actores</span>
                                        {this.state.infoPelicula.imdbAPI.stars.map( actor => {
                                            return <p>{actor}</p>
                                        })}
                                    </div>
                                    <div className="equipo equipo-escritor">
                                        <span className="equipo-categoria">Escritores</span>
                                        {this.state.infoPelicula.imdbAPI.writers.map( escritor => {
                                            return <p>{escritor}</p>
                                        })}
                                    </div>
                                </div>

                            </div>

                        </div>
                        
                        <div className="presentacion-poster">
                            <img src={`https://image.tmdb.org/t/p/w500${this.state.infoPelicula.tmbdAPI.poster_path}`} alt=""/>
                        </div>

                    </div>
                </div>
            </section>
        )
    }
}