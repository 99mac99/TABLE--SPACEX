import styles from '../headers.module.css';
import { Button } from 'react-bootstrap';

function NameHeader({sort}) {
	return (
		<>
			<th>
				<div className={`${styles.headersBox}`}>
					<p className={`${styles.headers}`}>Nazwa</p>
					<Button
						onClick={() => sort('mission_name')}
						className={`${styles.button} bi bi-arrow-down-up btn-sm`}
					></Button>
				</div>
			</th>
		</>
	);
}

export default NameHeader;

