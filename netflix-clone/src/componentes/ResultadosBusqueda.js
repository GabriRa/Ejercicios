import React, {Component} from "react";

import BarraNavegadora from "./partes/BarraNavegadora";
import MenuLateral from "./partes/MenuLateral";

const queryBase = "http://filnfo.herokuapp.com/buscar/";

class PeliculaResultado extends Component{
    render(){
        console.log(this.props.infoPelicula)
        return (
            <div className={`contenedor-pelicula-resultado contenedor-resultado-${this.props.keyID}`} key={this.props.keyID}>
                <div className="resultado-poster">
                    <img src={`https://image.tmdb.org/t/p/w185/${this.props.infoPelicula.poster_path}`} alt=""/>
                </div>
                <div className="resultado-informacion">
                    
                    <div className="resultado-titulo">
                       <div className="titulo">
                            {this.props.infoPelicula.title} <span>{this.props.infoPelicula.vote_average}</span>
                       </div>
                       <div className="caracteristicas">
                            Caracteristicas de la pelicula
                       </div>
                    </div>

                    <div className="resultado-overview">
                        {/*acortar si es mayor que  cierto limite de caracteres*/}
                        {this.props.infoPelicula.overview.split(" ").slice(0, 30).join(" ") + "..."}
                    </div>

                    <div className="resultado-button">
                        <a href={`http://filnfo.herokuapp.com/pelicula/${this.props.infoPelicula.id}`}>
                            Ver ficha pelicula
                        </a>
                    </div>

                </div>
            </div>
        )
    }
}

export default class PeliculasInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            resultadoBusqueda : [],
            numeroResultados : 0,
            mostrarMenu : false
        }
        this.moverMenu = this.moverMenu.bind(this);
    }

    // Cambia es estado de mostrarMenu
    moverMenu(){ 
         this.setState({
             mostrarMenu: !this.state.mostrarMenu
         })
    }


    // 
    componentDidMount(){
        let query = this.props.location.search;
        query = query.slice(1);

        // fetch(queryBase + query)
        fetch("https://api.themoviedb.org/3/search/movie?api_key=3ce6bb07b9fd7cffed8d0e33c58c1b24&language=en-US&query=hol&page=1&include_adult=false")
            .then(response => response.json())
            .then(data => this.setState({
                resultadoBusqueda : data.results,
                numeroResultados : data.total_results,
            }));
    }

    render(){
        //Variables para informacion una vez ha llegado
        let resultados;
        let imagenFondo;
        //Comprobamos que ha terminado el fetch
        if(this.state.resultadoBusqueda.length !== 0){

            //Comprobamos si el primer resultado tiene un fondo, en caso de que no, le asignamos uno predeterminado. 
            imagenFondo = this.state.resultadoBusqueda[0].backdrop_path != null ? `https://image.tmdb.org/t/p/w1280${this.state.resultadoBusqueda[0].backdrop_path}` : "https://image.tmdb.org/t/p/w1280/87hTDiay2N2qWyX4Ds7ybXi9h8I.jpg"; 

            //Asignamos a resultados la lista de peliculas asegurandonos que le llega la informacion
            resultados = this.state.resultadoBusqueda.map( (resultado, indice)=> {
                return(
                    <PeliculaResultado infoPelicula={resultado} keyID={indice}/>
                )
            });
        }

        let aparecerMenu;
        if (this.state.mostrarMenu){
            aparecerMenu = "efecto-menu-lateral"
        } else {
            aparecerMenu = ""
        } 

        return (
            <section className="pagina pagina-resultdo">
                
                <BarraNavegadora moverMenu={this.moverMenu}/>

                <MenuLateral mostrarMenu={this.state.mostrarMenu}/>

                <div className={`contenedor-resultados contenedor-principal ${aparecerMenu}`}>

                    <div className="contenedor-busqueda">

                        <div className="entrada-busqueda">
                            <h1> Search every movie, searching for <span>{this.props.location.search !== "" ? this.props.location.search.slice(1) : "nothing right now!"}</span></h1>

                            <h3>Hay un total de <span>{this.state.numeroResultados}</span> resultados</h3>
                        </div>

                        <div className="fondo-busqueda" style={{backgroundImage: `url("${imagenFondo}")`}}>
                        </div>

                    </div>

                    {resultados}                
                </div>
                
            </section>
        )
    }
}