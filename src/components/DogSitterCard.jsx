import { Badge, Card, Col, Image } from "react-bootstrap";
import imgUser from "../assets/images/imgUser.jpg";
import { useDispatch } from "react-redux";
import { selectDogSittersAction } from "../redux/actions";

const DogSitterCard = ({ dogSitter }) => {
	const dispatch = useDispatch();

	const viewDogsitter = () => {
		dispatch(selectDogSittersAction(dogSitter));
	};

	return (
		<Col>
			<Card className="border-0 shadow mt-3" style={{ cursor: "pointer" }} onClick={viewDogsitter}>
				<Card.Body className="d-flex p-2 p-md-3">
					<Image src={imgUser} className="shadow" fluid />
					<div className="ms-2 ms-sm-3">
						<Card.Text className="font-weight-bold mb-1">{dogSitter.name}</Card.Text>
						{dogSitter.address && (
							<Badge bg="warning" className="shadow">
								{dogSitter.address.city}, {dogSitter.address.postalCode}
							</Badge>
						)}
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
};
export default DogSitterCard;
