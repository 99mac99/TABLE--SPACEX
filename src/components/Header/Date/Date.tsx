import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './Date.module.css';


function Date () {
    return(
        <div className = {`${styles.date}`}>
            <th> Data </th>
            <Button className={`${styles.button} bi bi-arrow-down-up btn-sm`}></Button>
        </div>

    )
}

export default Date;