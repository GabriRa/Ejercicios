import React, {Component} from "react";

import SeleccionPeliculas from "./SeleccionPeliculas";
import ModalPelicula from "./ModalPelicula";

const queryBase = "http://filnfo.herokuapp.com/api?categoria1=";
const masPopulares = "movie&categoria2=popular";
const masVotadas = "discover&categoria2=movie&opcion1=vote_count.desc";
const masRentable = "discover&categoria2=movie&opcion1=revenue.desc";
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

            enseñarModal: false,
            datosModal: {},

            infoEstrenos: [],
            cargandoEstrenos: true,
            contador: 0
            
        }
        this.controladorModal = this.controladorModal.bind(this);
        this.quitarModal = this.quitarModal.bind(this);
        this.cambiarPelicula = this.cambiarPelicula.bind(this);
    }

    //Una vez el componente ha sido rendrizado, recogemos datos
    componentDidMount(){
        //Hacemos un fetch para recoger los datos necesarios dentro de nuestra propia API
        fetch(queryBase + masPopulares)
            .then( response => response.json() ) //Lo pasamos a JSON
            .then( data => this.setState({ masPopulares : data, cargandoMasPopulares : false})) //Lo pasamos al state, y cambiamos el cargando
            .catch( err => { throw err }); //En caso de error, hacemos un throw
        fetch(queryBase + masVotadas)
            .then( response => response.json())
            .then( data => this.setState({ masVotadas : data, cargandoMasVotadas : false}))
            .catch( err => { throw err });
        fetch(queryBase + masRentable)
            .then( response => response.json())
            .then( data => this.setState({ masRentables : data, cargandoMasRentables : false}))
            .catch( err => { throw err });

        //Estrenos
        fetch("http://filnfo.herokuapp.com/api?estrenos=estrenos")
            .then( response => response.json())
            .then( data => {this.setState({ infoEstrenos: data.results, cargandoEstrenos: false})})
            .catch( err => {throw err })
        // Cambio de pelicula
        this.cambiarPelicula();
    }

    controladorModal(datos){
        this.setState({
            enseñarModal: true,
            datosModal : datos
        })
    }

    quitarModal(){
        this.setState({
            enseñarModal : false,
        })
    }

    cambiarPelicula(){
        let contadorViejo;
        setInterval( () => {
            contadorViejo = this.state.contador
            if(contadorViejo >= 5){
                contadorViejo = -1;
            }
            this.setState({ contador: contadorViejo + 1 })
        }, 7000)
    }


    render(){
        let aparecerMenu;
        if (this.props.mostrarMenu){
            aparecerMenu = "efecto-menu-lateral"
        } else {
            aparecerMenu = ""
        } 

        let verModal;
        if (this.state.enseñarModal) {
            verModal = <ModalPelicula infoPelicula={this.state.datosModal} quitarModal={this.quitarModal} efecto={aparecerMenu}/>
        } else {
            verModal = null;
        }


        let peliculasEstreno;
        if (this.state.infoEstrenos.length != 0){
            peliculasEstreno =
                <div className="intro-peliculas">
                    <div className="fondo-intro" style={{backgroundImage : `url("https://image.tmdb.org/t/p/w1280${this.state.infoEstrenos[this.state.contador].backdrop_path}")`}}>
                        <div className="contenido-intro">
                            
                            <div className="info-intro">

                                <div className="titulo-intro">
                                    <h1>
                                        {this.state.infoEstrenos[this.state.contador].title} <span>({this.state.infoEstrenos[this.state.contador].release_date.split("-")[0]})</span>
                                    </h1>

                                    <div className="puntuacion-intro">
                                        Puntuacion en estrellas
                                    </div>
                                </div>


                                <div className="button-intro">
                                    boton para ficha personal 
                                </div>

                                <div className="overview-intro">
                                    <h2>About</h2>
                                    {this.state.infoEstrenos[this.state.contador].overview}
                                </div>

                            </div>
                            
                            <div className="poster-intro">
                                <img src={`https://image.tmdb.org/t/p/w185/${this.state.infoEstrenos[this.state.contador].poster_path}`} alt=""/>
                            </div>

                        </div>

                    </div>
                </div>
        }

        return(
            //Le pasamos dos props como clases, una para saber el padre y poder difrenciarlo, y otra para el efecto del menu lateral
            <section className={`contenedor-principal contenedor-contenido-${this.props.padre} ${aparecerMenu}`}>

                {peliculasEstreno}

                <div className="contenedor-secciones">
                    {/*A cada seccion le pasamos 4 propiedades. Dos para reconocerlas, y 2 para los datos*/}
                        {/*Titulo que tendra la seccion*/}
                        {/*Categoria que pertenece la seccio*/}
                        {/*Datos de la seccion */}
                        {/*Aviso de si esta cargando*/}
                    <SeleccionPeliculas 
                                tituloSeleccion={"Populares"}
                                categoriaSeleccion={"populares"}
                                datosSeleccion={this.state.masPopulares.results}
                                datosCargando={this.state.cargandoMasPopulares}
                                controlModal={this.controladorModal}/>

                    <SeleccionPeliculas
                                tituloSeleccion={"Votadas"} 
                                categoriaSeleccion={"votadas"}
                                datosSeleccion={this.state.masVotadas.results}
                                datosCargando={this.state.cargandoMasVotadas}
                                controlModal={this.controladorModal}/>

                    <SeleccionPeliculas
                                tituloSeleccion={"Rentables"} 
                                categoriaSeleccion={"rentables"}
                                datosSeleccion={this.state.masRentables.results}
                                datosCargando={this.state.cargandoMasRentables}
                                controlModal={this.controladorModal}/>
                </div>

                {verModal}

            </section>
        )
    }
}