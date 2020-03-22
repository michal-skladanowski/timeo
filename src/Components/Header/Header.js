import React from 'react';
import styles from './header.module.scss';

const Header = props => {
    return(
        <header className={styles.wrapper}>
            {props.children}
        </header>
    )
}

export default Header;