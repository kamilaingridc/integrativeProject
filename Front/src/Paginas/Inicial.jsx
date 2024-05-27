import estilos from './Inicial.module.css'
import {Cabecalho} from '../Componentes/Cabecalho'
import {Lateral} from '../Componentes/Lateral'
import { Outlet } from 'react-router-dom'



export function Inicial() {
  return (
    <div className={estilos.gridConteiner}>
      <Cabecalho />
      <Lateral />

      <Outlet/>

    </div>
  )
}
