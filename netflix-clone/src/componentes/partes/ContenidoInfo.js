import React, {Component} from "react";

export default class ContenidoInfo extends Component{

    // Hacer algo onload de imagenes y con los datos

    componentDidMount(){
        document.querySelector(".contenedor-imagen-fondo").style.backgroundImage = `url("https://image.tmdb.org/t/p/original${this.props.peliculaInfo.backdrop_path}")`;
    }

    render(){
        let aparecerMenu;
        if (this.props.mostrarMenu){
            aparecerMenu = "efecto-menu-lateral"
        } else {
            aparecerMenu = ""
        } 
        let date = ["YYYY", "MM", "DD"];
        let genero = "";
        if (this.props.peliculaInfo.id){
            date = this.props.peliculaInfo.release_date.split("-");
            genero = this.props.peliculaInfo.genres[0].name
        }

        return(
            <section className={`contenedor-principal contenedor-${this.props.padre} ${aparecerMenu}`}>

                <div className="contenedor-datos">

                    <div className="info-pelicula">
                        <div className="contenedor-info">

                            <div className="titulo-info">
                                <h1>
                                    {this.props.peliculaInfo.title} <span>({date[0]})</span>
                                </h1>
                                <div className="caracteristicas-pelicula">
                                    {this.props.peliculaInfo.runtime/60} || {genero} || {date.join("/")}
                                </div>
                            </div>

                            <p className="overview">
                                {this.props.peliculaInfo.overview}
                            </p>

                            <div className="links-pelicula">
                                <a href={`http://imdb.com/title/${this.props.peliculaInfo.imdb_id}/`}><p>Ver ficha en IMDB</p></a>
                                <a href={this.props.peliculaInfo.homepage}><p> Pagina oficial </p></a>
                            </div>
                        </div>
                    </div> {/*Fin informa cion de la pelicula*/}

                    <div className="cartel-pelicula">
                        <div className="imagen-cartel">
                            <img src={`https://image.tmdb.org/t/p/w500${this.props.peliculaInfo.poster_path}`} alt=""/>
                            <div className="puntuacion-pelicula">
                                <p>
                                    {this.props.peliculaInfo.vote_average} 
                                </p>
                            </div>
                        </div>
                    </div>{/*Fin cartel Pelicula*/}

                </div> {/*Fin contenedor datos*/}

                <div className="imagen-fondo">
                    <div className="overlay"></div>
                    <div className="contenedor-imagen-fondo"></div>
                    {/*<img src={`https://image.tmdb.org/t/p/w780${this.props.peliculaInfo.backdrop_path}`} alt=""/>*/}
                </div> {/*Fin Imagen de fondo*/}

            </section>
        )
    }
}