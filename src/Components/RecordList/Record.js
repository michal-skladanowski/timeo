import React from 'react';
import moment from 'moment';
import styles from './record.module.scss';
const Record = props => {
    
    return(
        <li className={styles.wrapper}>
            <div>{moment(props.createdAt).calendar()}</div>
            <div>{props.description}</div>
            <div>{moment.utc(props.time).format('HH:mm:ss')}</div>
            
        </li>
    )
}


 

export default Record;