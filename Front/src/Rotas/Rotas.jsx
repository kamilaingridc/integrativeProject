import React from 'react';
import {Routes, Route} from 'react-router-dom'
import { Login } from '../Paginas/Login';
import { Sensor } from '../Paginas/Sensor';
import { Inicial } from '../Paginas/Inicial';
import { CadastrarSensor } from '../Paginas/CadastrarSensor';
import { Localizacao } from '../Paginas/Localizacao';
import { Registro } from '../Paginas/CadUser';
import { Filtro } from '../Paginas/Filtro'; 

 export function Rotas() {
    return (
        <Routes>

        <Route path='/' element={ <Login /> } />

        <Route path='inicial' element={ <Inicial /> } >
            <Route index element={ <Localizacao /> } />
            <Route path='lista_sensores' element= { <Sensor />} />
            <Route path='cadsensor' element={ <CadastrarSensor /> } />
            <Route path='registro' element={ <Registro /> } />
            <Route path='filtro' element={<Filtro />} />
        </Route>

    </Routes>
)
}


