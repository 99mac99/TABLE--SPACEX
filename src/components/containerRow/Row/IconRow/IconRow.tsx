import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './iconRow.module.css'

function IconRow() {
	return (

		<>
		<div className = {`${styles.icon}`}>
				<i className="bi bi-bookmark"></i>
		</div>
		</>
	);
}

export default IconRow;
