import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../redux/actions";

const MyNavbar = () => {
	const myProfile = useSelector((state) => state.myProfile);
	const dispatch = useDispatch();

	const logout = (e) => {
		dispatch(logoutAction());
	};

	return (
		<Row className="myNavbar">
			<Col xs={12}>
				<Navbar expand="lg" className="bg-body-tertiary">
					<Container>
						<Link to={`/`} className={`nav-link`}>
							EpiDogSitting
						</Link>

						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="flex-grow-1 justify-content-end">
								<Link to={`/cerca-dogsitters`} className={`nav-link me-auto`}>
									Cerca un Sitter
								</Link>
								{/* <Link to={`/diventa-dog-sitter`} className={`nav-link`}>
									Diventa un Sitter
								</Link> */}
								{!myProfile.user && (
									<Link to={`/crea-account-proprietario`} className={`nav-link`}>
										Registrati
									</Link>
								)}
								{myProfile.user.name != null ? (
									<>
										<Link to={`/my-profile`} className={`nav-link`}>
											Benvenut&#601;, {myProfile.user.name}
										</Link>
										<Link to={`/`} className={`nav-link`} onClick={logout}>
											Logout
										</Link>
									</>
								) : (
									<Link to={`/accedi`} className={`nav-link`}>
										Accedi
									</Link>
								)}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</Col>
		</Row>
	);
};
export default MyNavbar;
