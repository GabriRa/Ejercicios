import React, {Component} from "react";

import BarraNavegadora from "./partes/BarraNavegadora";
import MenuLateral from "./partes/MenuLateral";
import ContenidoInfo from "./partes/ContenidoInfo";

const queryBase = "http://localhost:4000/pelicula/id/";

export default class PeliculasInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            infoPelicula : {},

        }
        this.moverMenu = this.moverMenu.bind(this);
    }

    // Cambia es estado de mostrarMenu
    moverMenu(){ 
         this.setState({
             mostrarMenu: !this.state.mostrarMenu
         })
    }


    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.peliculaID}?api_key=3ce6bb07b9fd7cffed8d0e33c58c1b24`)
            .then(response => response.json())
            .then(data => this.setState({
                infoPelicula : data
            }));
    }

    render(){
        console.log(this.props);
        return (
            <section className="pagina pagina-info">
                
                <BarraNavegadora moverMenu={this.moverMenu}/>

                <MenuLateral mostrarMenu={this.state.mostrarMenu}/>

                <ContenidoInfo peliculaInfo={this.state.infoPelicula} padre={"pelicula-info"} mostrarMenu={this.state.mostrarMenu}/>
                
            </section>
        )
    }
}