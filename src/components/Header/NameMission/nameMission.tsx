import React from 'react';
import { Button } from 'react-bootstrap';
import styles from'./NameMission.module.css'

function NameMission () {


    const search = () => {
		console.log('filtrowanie')
		// props.onSearch(term);
	};


    return (
        <div className = {`${styles.nameMission}`}>
            <th>Nazwa misji</th>
            <Button className={`${styles.button} bi bi-arrow-down-up btn-sm`} onClick={search}></Button>
        </div>

    )
}


export default NameMission;