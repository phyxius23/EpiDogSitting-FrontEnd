import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddressSection = () => {
	const dogowner = useSelector((state) => state.myProfile.user);

	return (
		<Row className="justify-content-center mt-5 address">
			<Col xs={12} lg={10}>
				<Card className="shadow">
					<Card.Body>
						<Card.Title>
							<h4 className="font-weight-bold">INDIRIZZO:</h4>
						</Card.Title>
						<ListGroup.Item>
							{dogowner.address.street}, {dogowner.address.city} - {dogowner.address.province}
						</ListGroup.Item>
						<ListGroup.Item>{dogowner.address.postalCode}</ListGroup.Item>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};
export default AddressSection;
