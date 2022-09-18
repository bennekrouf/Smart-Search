import styles from '../app.module.css';
import logo from '../assets/logo.png';

const Search = () => {
    return (
        <div className={styles.header}>
            <div className={styles.nav}>
                <div className={styles.nav_logo}>
                <img
                    className={styles.nav_logo_icon}
                    src={logo}
                    width="45"
                    alt=" app Logo"
                />
                <span className={styles.nav_logo_text}>Smart search</span>
                </div>
            </div>
            <div className={styles.line}></div>
        </div>
    )
}

export default Search;