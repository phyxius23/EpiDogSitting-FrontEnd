import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../redux/actions";
import { useState } from "react";

const MyNavbar = () => {
	const myProfile = useSelector((state) => state.myProfile);
	const dispatch = useDispatch();

	const logout = (e) => {
		dispatch(logoutAction());
		setExpanded(false);
	};

	const [expanded, setExpanded] = useState(false);

	return (
		<Row className="myNavbar shadow">
			<Col xs={12}>
				<Navbar expand="lg" className="bg-body-tertiary" expanded={expanded}>
					<Container>
						<Link to={`/`} className={`nav-link`} onClick={() => setExpanded(false)}>
							EpiDogSitting
						</Link>

						<Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="flex-grow-1 justify-content-end">
								{myProfile.user.name != null && (
									<Link to={`/cerca-dogsitters`} className={`nav-link me-auto`} onClick={() => setExpanded(false)}>
										Cerca un Sitter
									</Link>
								)}
								{/* <Link to={`/diventa-dog-sitter`} className={`nav-link`} onClick={() => setExpanded(false)}>
									Diventa un Sitter
								</Link> */}
								{!myProfile.user && (
									<Link to={`/crea-account-proprietario`} className={`nav-link`} onClick={() => setExpanded(false)}>
										Registrati
									</Link>
								)}
								{myProfile.user.name != null ? (
									<>
										<Link to={`/my-profile`} className={`nav-link`} onClick={() => setExpanded(false)}>
											Benvenut&#601;, {myProfile.user.name}
										</Link>
										<Link to={`/`} className={`nav-link`} onClick={logout}>
											Logout
										</Link>
									</>
								) : (
									<Link to={`/accedi`} className={`nav-link`} onClick={() => setExpanded(false)}>
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
