import { Badge, Card, Image } from "react-bootstrap";
import imgUser from "../assets/images/imgUser.jpg";
import { useDispatch } from "react-redux";
import { selectDogSittersAction } from "../redux/actions";

const DogSitterCard = ({ dogSitter }) => {
	//const dogSitterSelected = useSelector((state) => state.dogSitterSelected.content);
	const dispatch = useDispatch();

	return (
		<Card
			className="border border-0 mt-3 dogsitter-card"
			style={{ cursor: "pointer" }}
			onClick={() => {
				dispatch(selectDogSittersAction(dogSitter));
				// console.log(dogSitter);
			}}>
			<Card.Body className="d-flex">
				<Image src={imgUser} fluid />
				<div className="px-3">
					<Card.Text className="font-weight-bold">{dogSitter.name}</Card.Text>
					{/* {console.log(dogSitter.address)} */}
					{dogSitter.address && (
						<Badge bg="primary">
							{dogSitter.address.city}, {dogSitter.address.postalCode}
						</Badge>
					)}
					{/* <Badge bg="primary">Città, CAP{dogSitter.address.city}</Badge> */}
				</div>
			</Card.Body>
		</Card>
	);
};
export default DogSitterCard;
