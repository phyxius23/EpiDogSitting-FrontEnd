import { Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyFooter = () => {
	return (
		<Row className="my-footer py-3">
			<Col xs={12}>
				<Nav defaultActiveKey="/home" as="ul" className="justify-content-center pb-3 mb-3">
					<Nav.Item as="li">
						<Link to={`/`} className={`nav-link`}>
							EpiDogSitting
						</Link>
					</Nav.Item>
				</Nav>
				<p className="text-center">&copy; 2023 EpiDogSitting, Inc.</p>
			</Col>
		</Row>
	);
};
export default MyFooter;
