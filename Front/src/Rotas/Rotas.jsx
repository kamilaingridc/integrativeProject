import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from '../Paginas/Login';
import { Sensor } from '../Paginas/Sensor';
import { Inicial } from '../Paginas/Inicial';
import { CadastrarSensor } from '../Paginas/CadastrarSensor';
import { Localizacao } from '../Paginas/Localizacao';
import { Registro } from '../Paginas/CadUser';
import { Delete } from '../Paginas/Delete'
import { Edit } from '../Paginas/Edit';

export function Rotas() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='inicial' element={<Inicial />}>
                <Route index element={<Localizacao />} />
                <Route path='lista_sensores' element={<Sensor />} />
                <Route path='edit/:id' element={<Edit />} />
                <Route path='delete/:id' element={<Delete />} />
                <Route path='cadsensor' element={<CadastrarSensor />} />
                <Route path='registro' element={<Registro />} />
            </Route>
        </Routes>
    );
}
