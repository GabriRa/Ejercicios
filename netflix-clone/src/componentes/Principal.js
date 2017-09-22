import React, {Component} from "react";

import BarraNavegadora from "./partes/BarraNavegadora";
import MenuLateral from "./partes/MenuLateral";
import Contenidos from "./partes/Contenidos";


export default class Principal extends Component{
    constructor(props){
        super(props);
        this.state = {
            mostrarMenu : true,
        }
        this.moverMenu = this.moverMenu.bind(this);
    }

    //Cambia es estado de mostrarMenu
    moverMenu(){ 
         this.setState({
             mostrarMenu: !this.state.mostrarMenu
         })
    }

    render(){
        //Dependiendo de mostrarMenu, se añade o no una clase a Contenidos
        let efectoMenu;
        if (!this.state.mostrarMenu){
            efectoMenu = "efecto-menu-lateral";
        } else {
            efectoMenu = "";
        }

        return(
            <section className="pagina pagina-principal">

                <BarraNavegadora moverMenu={this.moverMenu}/>

                <MenuLateral mostrarMenu={this.state.mostrarMenu}/>

                <Contenidos efectoMenuLateral={efectoMenu} padre={"Principal"}/>

            </section >
        )
    }
}