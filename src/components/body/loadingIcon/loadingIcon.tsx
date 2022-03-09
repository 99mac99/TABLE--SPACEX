import styles from './loadingIcon.module.css';

function LoadingIcon() {
	return (
		<>
            <p className={`${styles.loading}`}>Ładowanie...</p>
		</>
	);
}

export default LoadingIcon;
