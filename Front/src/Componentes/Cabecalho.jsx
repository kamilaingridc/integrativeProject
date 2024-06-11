import styles from './Cabecalho.module.css';
import { Link } from 'react-router-dom';
import Logout from '../assets/Logout.png';

export function Cabecalho() {
    return (
        <><header className={styles.container}>
            <div className={styles.tituloContainer}>
                <h1 className={styles.titulo}>Smart</h1>
                <h1 className={styles.tituloRed}>City</h1>
            </div>
            <div className={styles.linksz}>
                <Link className={styles.link} to='/inicial'>Home</Link>
                <Link className={styles.link} to='/inicial/lista_sensores'>Lista Sensores</Link>
                <Link className={styles.link} to='/inicial/cadsensor'>Cadastrar Sensores</Link>
                <Link className={styles.link} to='/inicial/registro'>Cadastrar Usuário</Link>
                <Link className={styles.link} to='/'><img src={Logout} alt="Log out button"/></Link>
            </div>
        </header><>
                <hr />
            </></>
    );
}
