import styles from '../headers.module.css';
import { Button } from 'react-bootstrap';

function DateHeader() {
	return (
		<>
			<div className={`${styles.headersBox}`}>
				<p className={`${styles.headers}`}>Data</p>
				<Button
					className={`${styles.button} bi bi-arrow-down-up btn-sm`}
				></Button>
			</div>
		</>
	);
}

export default DateHeader;
