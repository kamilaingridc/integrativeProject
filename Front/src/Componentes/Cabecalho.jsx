import styles from './Cabecalho.module.css'
import { Link } from 'react-router-dom';


export function Cabecalho(){
    return(
        <header className={styles.container}>            
            <h1 className={styles.titulo}>SmartCity</h1>            
    
            <Link 
                className={styles.link}
                to='/inicial'>
                Lista Sensores
            </Link>

            <Link 

                className={styles.link}
                to='/inicial/cadsensor'
            >Cadastrar Sensor
            </Link>

            <Link 
                className={styles.link}
                to='/inicial/localizacao'
            >Mapa
            </Link>

            <Link 
            className={styles.link}
            to='/'
            >Log Out</Link>
        </header>
    );
}
