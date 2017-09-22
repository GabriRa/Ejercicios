import React, {Component} from "react";

import SeleccionPeliculas from "./SeleccionPeliculas"

// const queryMasPopulares = "https://api.themoviedb.org/3/movie/popular?api_key=3ce6bb07b9fd7cffed8d0e33c58c1b24";
const queryMasVotadas = "https://api.themoviedb.org/3/discover/movie?api_key=3ce6bb07b9fd7cffed8d0e33c58c1b24&language=en-US&sort_by=vote_count.desc";
const queryMasRentable = "https://api.themoviedb.org/3/discover/movie?api_key=3ce6bb07b9fd7cffed8d0e33c58c1b24&language=en-US&sort_by=revenue.desc";
const queryBase = "http://localhost:4000/api?categoria1=";
// const queryMasPopulares = queryBase + "movie"

export default class Contenido extends Component{
    constructor(props){
        super(props);
        this.state = {
            masPopulares: [],
            cargandoMasPopulares : true,
            masVotadas: [],
            cargandoMasVotadas : true,
            masRentables: [],
            cargandoMasRentables : true,
        }
    }

    componentDidMount(){
        //Hacemos un fetch para recoger los datos necesarios
        fetch(queryBase + "movie&categoria2=popular")
            .then( response => response.json() ) //Lo pasamos a JSON
            .then( data => this.setState({ masPopulares : data, cargandoMasPopulares : false})) //Lo pasamos al state, y cambiamos el cargando
            .catch( err => { throw err }); //En caso de error, hacemos un throw
        fetch(queryMasVotadas)
            .then( response => response.json())
            .then( data => this.setState({ masVotadas : data, cargandoMasVotadas : false}))
            .catch( err => { throw err });
        fetch(queryMasRentable)
            .then( response => response.json())
            .then( data => this.setState({ masRentables : data, cargandoMasRentables : false}))
            .catch( err => { throw err });
    }

    render(){
        return(
            //Le pasamos dos props como clases, una para saber el padre y poder difrenciarlo, y otra para el efecto del menu lateral
            <section className={`contedor-contenido contenedor-contenido-${this.props.padre} ${this.props.efectoMenuLateral}`}>
                
                {/*A cada seccion le pasamos 4 propiedades. Dos para reconocerlas, y 2 para los datos*/}
                    {/*Titulo que tendra la seccion*/}
                    {/*Categoria que pertenece la seccio*/}
                    {/*Datos de la seccion */}
                    {/*Aviso de si esta cargando*/}
                <SeleccionPeliculas 
                            tituloSeleccion={"Mas Populares"}
                            categoriaSeleccion={"populares"}
                            datosSeleccion={this.state.masPopulares.results}
                            datosCargando={this.state.cargandoMasPopulares}/>

                <SeleccionPeliculas
                            tituloSeleccion={"Mas Votadas"} 
                            categoriaSeleccion={"votadas"}
                            datosSeleccion={this.state.masVotadas.results}
                            datosCargando={this.state.cargandoMasVotadas}/>

                <SeleccionPeliculas
                            tituloSeleccion={"Mas Rentables"} 
                            categoriaSeleccion={"rentables"}
                            datosSeleccion={this.state.masRentables.results}
                            datosCargando={this.state.cargandoMasRentables}/>
                        

            </section>
        )
    }
}