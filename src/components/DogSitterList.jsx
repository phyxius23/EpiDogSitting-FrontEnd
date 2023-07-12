import { Alert } from "react-bootstrap";
import DogSitterCard from "./DogSitterCard";
import { useSelector } from "react-redux";

const DogSitterList = () => {
	const dogSitters = useSelector((state) => state.dogSitters.content.content);
	const hasFetchError = useSelector((state) => state.dogSitters.hasError);
	const hasErrorMessage = useSelector((state) => state.dogSitters.errorMessage);

	return (
		<div className="mb-3">
			{/* <Card className="border border-2 mt-3 card-dogsitter" style={{ cursor: "pointer" }}>
				<Card.Body className="d-flex">
					<span className="card-dogsitter">
						<AiOutlineUser />
					</span>
					<Image src={imgUser} fluid />
					<div className="px-3">
						<Card.Text className="font-weight-bold">Nome DogSitter</Card.Text>
						<Badge bg="primary">Città, CAP</Badge>
					</div>
				</Card.Body>
			</Card> */}

			{hasFetchError ? (
				<Alert variant="danger">{hasErrorMessage ? hasErrorMessage : "Qualcosa è andato storto"}</Alert>
			) : (
				<>{dogSitters && dogSitters.map((dogSitter) => <DogSitterCard key={dogSitter.id} dogSitter={dogSitter} />)}</>
			)}

			{/* <DogSitterCard />
			<DogSitterCard />
			<DogSitterCard />
			<DogSitterCard /> */}
		</div>
	);
};
export default DogSitterList;
