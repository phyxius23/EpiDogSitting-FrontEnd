import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddressSection = () => {
	const dogowner = useSelector((state) => state.myProfile.user);

	return (
		<Row className="justify-content-center mt-5 address">
			<Col xs={12} lg={10}>
				<div className="mb-0">
					<h4 className="font-weight-bold">INDIRIZZO:</h4>
					<div className="d-flex justify-content-between">
						<p className="mb-0">
							{dogowner.address.street}, {dogowner.address.city} - {dogowner.address.province} - {dogowner.address.postalCode}
						</p>
					</div>
				</div>
			</Col>
		</Row>
	);
};
export default AddressSection;
