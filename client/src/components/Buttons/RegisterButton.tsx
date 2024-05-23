import styles from "./RegisterButton.module.scss"

interface IRegisterButon {
  label: string;
  onClick: () => void;
}

function RegisterButton({ label, onClick }: IRegisterButon) {
	return <button className={styles.register__btn} onClick={onClick}>{label}</button>;
}

export default RegisterButton;
