import React,{Component} from "react";

import Pelicula from "./Pelicula"
import SeleccionLoader from "./SeleccionLoader"

//Al reajustar la pantalla y a veces queda raro, cuando se esta al final de la seccion
//Habria que llamar a movimientoSeleccion cada vez que se re-ajusta o algo parecido


export default class SeleccionPeliculas extends Component{
    constructor(props){
        super(props);
        this.state = {
            pixelMovimiento : 0
        }
    }


    movimientoSeleccion(e){
        e.preventDefault();

        //Usamos una variable para guardar el estado
        let pixelMovimiento = this.state.pixelMovimiento;

        //Cogemos la seleccion de peliculas adecuada, que nos viene dada en el data-set (Objetivo)
        let seleccionObjetivo = document.querySelector(`.${e.target.dataset.infoSeleccion}`) 

        //Comprobamos hacia que sentido es el movimiento, y añadimos los pixeles necesarios
        if(e.target.dataset.movimiento === "derecha"){
            pixelMovimiento -= 400;
        } else {
            pixelMovimiento += 400;
        }

        //Si la cantidad de pixeles a mover + el ancho del padre es > el ancho del objtivo se activa
        //Es decir, previene que se siga sumando pixeles al movimiento si ya ha llegado al final
        if(pixelMovimiento - seleccionObjetivo.parentElement.clientWidth < -seleccionObjetivo.clientWidth) {
            //Si es verdad, hacemos que el movimiento sea igual al ancho del objetivo - el ancho del padre, el contenedor
            pixelMovimiento = -seleccionObjetivo.clientWidth + seleccionObjetivo.parentElement.clientWidth;
        } else if (pixelMovimiento > 0){ 
            //Lo mismo pero al reves, previene que el movimiento pase del inicio del objetivo
            pixelMovimiento = 0;
        }

        //Tras realizar las comprobaciones y la suma, volvemos asignar al state la variable usada
        //Y usamos su callback para estar seguros que ha terminado de asignarlo cuando lo pasamos al style
        this.setState({pixelMovimiento : pixelMovimiento}, () => {
                seleccionObjetivo.style.transform = `translate(${this.state.pixelMovimiento}px)` // Hacemos realidad el movimiento elegido
        })
    }

    efectoAparicion(e){
        if(!this.props.datosCargando){
            document.querySelector(`.seleccion-${this.props.categoriaSeleccion}`).classList.remove("efecto-aparicion");
        }
    }

    render(){
        //Efecto en caso de que este cagando, deberia crear un componente con react-content-loader
        if (this.props.datosCargando) {
            // return <SeleccionLoader/>
            return null;
        } 

        return(
            <div className={`contenedor-seleccion seleccion-${this.props.categoriaSeleccion} efecto-aparicion`} onLoad={ e => { this.efectoAparicion(e) }}>

                {/*Titulillo de la seleccion/categoria*/}
                <h3 className="titulo-seleccion" >{this.props.tituloSeleccion}</h3>

                {/*Boton movimento hacia la izquierda*/}
                <div className="estetico estetico-izquierda" 
                            data-info-seleccion={`peliculas-${this.props.categoriaSeleccion}`} 
                            data-movimiento={"izquierda"}
                            onClick={e => this.movimientoSeleccion(e)}>
                    <button className="boton-movimiento movimiento-izquierda"
                            data-info-seleccion={`peliculas-${this.props.categoriaSeleccion}`}></button>
                </div>
                {/*Boton movimento hacia la derecha*/}
                <div className="estetico estetico-derecha"  
                            data-info-seleccion={`peliculas-${this.props.categoriaSeleccion}`} 
                            data-movimiento={"derecha"}
                            onClick={e => this.movimientoSeleccion(e)}>
                    <button className="boton-movimiento movimiento-derecha" 
                            data-info-seleccion={`peliculas-${this.props.categoriaSeleccion}`}
                            data-movimiento={"derecha"}></button>
                </div>
                
                {/*Contenedor principal con todas las peliculas, */}
                <div className={`peliculas-seleccion peliculas-${this.props.categoriaSeleccion}`}>

                    {/*Devuelve una Pelicula por cada peli que haya*/}
                    {this.props.datosSeleccion.map( (pelicula, indice) => {
                        return <Pelicula peliculaInfo={pelicula} keyID={indice} controlModal={this.props.controlModal}/>
                    })}

                </div>
            </div>
        )
    }
}