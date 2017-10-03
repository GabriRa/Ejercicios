import React, {Component} from "react";

export default class MenuLateral extends Component{
    // constructor(props){
    //     super(props)
    //     this.seccionMenuLateral = this.seccionMenuLateral.bind(this);
    // }


    /*// Toma una array dentro de otra array. Por cada subarray, crea una seccion
    seccionMenuLateral(){
        this.props.listaSecciones.map( (array, indice) => {
            return(
                <div className={`seccion-ml seccion-ml-${indice}`}>
                    {array.map( boton => {
                        return(
                            <div className={`btn-ml btn-ml-${boton.clase}`}>
                                <a className={`lnk-ml lnk-ml-${boton.clase}`} href={`/${boton.link}`}>
                                    {boton.nombre}
                                </a>
                            </div>
                        )
                    })}
                </div>
            )
        })
    }*/

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
                <hr/>

                <div className="seccion-ml seccion-ml-1">
                    <div className="btn-ml btn-ml-portada">
                        <a className="lnk-ml lnk-ml-portada" href="/principal">
                            Principal
                        </a>
                    </div>

                    <div className="btn-ml btn-ml-estrenos">
                        <a className="lnk-ml lnk-ml-estrenos" href="/busqueda">
                            Buscador
                        </a>
                    </div> 

                </div>

                <hr/>

                <div className="seccion-ml seccion-ml-2">

                    <div className="btn-ml btn-ml-listas">
                        <a className="lnk-ml lnk-ml-listas" href="">
                            Listas <span className="icono-efecto-listas icono-efecto"></span>
                        </a>
                    </div>

                    <div className="btn-ml btn-ml-portada">
                        <a className="lnk-ml lnk-ml-portada" href="/principal">
                            Recomendaciones
                        </a>
                    </div>

                </div>

                <hr/>

                <div className="seccion-ml seccion-ml-3">
                    
                    <div className="btn-ml btn-ml-portada">
                        <a className="lnk-ml lnk-ml-portada" href="/principal">
                            Capitulos por ver
                        </a>
                    </div>
                    
                </div>

                <hr/>


            </section>
        )
    }
}