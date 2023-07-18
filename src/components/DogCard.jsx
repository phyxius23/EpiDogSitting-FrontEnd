import { Card, Col, ListGroup } from "react-bootstrap";
import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";
import ModalAddImage from "./ModalAddImage";

const DogCard = ({ dog }) => {
	const [show, setShow] = useState(false);
	const handleCloseModal = () => setShow(false);
	const handleShowModal = () => setShow(true);

	return (
		<Col>
			<Card className="lead shadow card-add">
				{dog.image ? (
					<Card.Img variant="top" src={dog.image.imageUrl} fluid />
				) : (
					<>
						<div className="icon-wrapper p-5" onClick={handleShowModal}>
							<IoAddOutline />
							<p className="mb-0">Aggiungi una immagine</p>
						</div>
						<ModalAddImage show={show} handleCloseModal={handleCloseModal} dog={dog} />
					</>
				)}
				<Card.Body>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<Card.Title>{dog.name}</Card.Title>
						</ListGroup.Item>
						<ListGroup.Item>{dog.breed}</ListGroup.Item>
						<ListGroup.Item>
							{!dog.age ? dog.age + " anno" : dog.age + " anni"}, {dog.weight} kg.
						</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Card>
		</Col>
	);
};
export default DogCard;
