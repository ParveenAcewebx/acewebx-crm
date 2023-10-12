// import node module libraries
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

const AuthLayout = (props) => {
	return (
		<Container className="d-flex flex-column">
			{props.children}<ToastContainer/>
		</Container>
	);
};
export default AuthLayout;
