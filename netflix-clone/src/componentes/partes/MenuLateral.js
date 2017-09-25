import React, {Component} from "react";

export default class MenuLateral extends Component{
    render(){
        var aparecerMenu = {
            transform : "translateX(-200px)"
        }

        if (this.props.mostrarMenu){
            aparecerMenu = {
                transform: "translateX(0px)"
            }
        } else {
            aparecerMenu = {
                transform: "translateX(-200px)"
            }
        }

        return(
            <section className="menu-lateral" style={aparecerMenu}>

                <div className="seccion-ml seccion-ml-1">
                    <div className="btn-ml btn-ml-portada">
                        <a className="lnk-ml lnk-ml-portada" href="/">
                            Portada
                        </a>
                    </div>

                    <div className="btn-ml btn-ml-estrenos">
                        <a className="lnk-ml lnk-ml-estrenos" href="/estrenos">
                            Estrenos
                        </a>
                    </div> 
                </div>

                <div className="seccion-ml seccion-ml-2">

                    <div className="btn-ml btn-ml-listas">
                        <a className="lnk-ml lnk-ml-listas" href="">
                            Listas <span className="icono-efecto-listas icono-efecto"></span>
                        </a>
                    </div>
                    <div className="btn-ml btn-ml-portada">
                        <a className="lnk-ml lnk-ml-portada" href="/portada">
                            Recomendaciones
                        </a>
                    </div>

                </div>

                <div className="seccion-ml seccion-ml-3">
                    
                    <div className="btn-ml btn-ml-portada">
                        <a className="lnk-ml lnk-ml-portada" href="/portada">
                            Capitulos por ver aqui
                        </a>
                    </div>
                </div>

            </section>
        )
    }
}