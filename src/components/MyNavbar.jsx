import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyNavbar = () => {
	const myProfile = useSelector((state) => state.myProfile);

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
							<Nav>
								<Link to={`/cerca-dogsitters`} className={`nav-link`}>
									Cerca un Sitter
								</Link>
								{/* <Link to={`/my-profile`} className={`nav-link`}>
									MyProfile
								</Link> */}
								{/* <Link to={`/diventa-dog-sitter`} className={`nav-link`}>
									Diventa un Sitter
								</Link> */}
								<Link to={`/crea-account-proprietario`} className={`nav-link`}>
									Registrati
								</Link>
								{myProfile.user.name != null ? (
									<Link to={`/my-profile`} className={`nav-link`}>
										Benvenut<span className="schwa">e</span>, {myProfile.user.name}
									</Link>
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
