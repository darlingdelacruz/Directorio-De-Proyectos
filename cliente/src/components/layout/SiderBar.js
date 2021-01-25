import React from 'react';
import ListadoProyectos from '../proyectos/ListadoProyectos';
import NuevosProyectos from '../proyectos/NuevosProyectos';

const SiderBar = () => {

    return (
        <aside>
            <h1>Directorio de <span>Proyectos</span></h1>
            <NuevosProyectos/>
            <div className ="proyectos">
                <h2>Tus Proyectos</h2>
                <ListadoProyectos/>
            </div>
        </aside>

    );
}

export default SiderBar;