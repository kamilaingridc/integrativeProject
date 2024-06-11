import styles from './Inicial.module.css'
import {Cabecalho} from '../Componentes/Cabecalho'
import { Outlet } from 'react-router-dom'

export function Inicial() {
  return (
    <div className={styles.gridContainer}>
      <Cabecalho />
      <Outlet/>
    </div>
  );
}
