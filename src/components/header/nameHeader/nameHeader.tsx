import styles from '../headers.module.css';
import { Button } from 'react-bootstrap';

function NameHeader() {
	return (
		<>
			<div className={`${styles.headersBox}`}>
				<p className={`${styles.headers}`}>Nazwa</p>
				<Button
					className={`${styles.button} bi bi-arrow-down-up btn-sm`}
				></Button>
				<p></p>
			</div>
		</>
	);
}

export default NameHeader;
