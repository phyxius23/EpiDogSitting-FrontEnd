import { Card, Col, ListGroup } from "react-bootstrap";
import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";
import ModalAddImage from "./ModalAddImage";
import { useDispatch } from "react-redux";
import { removeDogAction, removeImageDogAction } from "../redux/actions";
import { toast } from "react-toastify";
import ModalUpdateDog from "./ModalUpdateDog";
import ModalUpdateImage from "./ModalUpdateImage";

const DogCard = ({ dog }) => {
	const dispatch = useDispatch();

	// add dog image
	const [showAddImage, setShowAddImage] = useState(false);
	const handleCloseModalAddImage = () => setShowAddImage(false);
	const handleShowModalAddImage = () => setShowAddImage(true);

	// update dog
	const [showUpdateDog, setShowUpdateDog] = useState(false);
	const handleCloseModalUpdateDog = () => setShowUpdateDog(false);
	const handleShowModalUpdateDog = () => setShowUpdateDog(true);

	// update dog image
	const [showUpdateImage, setShowUpdateImage] = useState(false);
	const handleCloseModalUpdateImage = () => setShowUpdateImage(false);
	const handleShowModalUpdateImage = () => setShowUpdateImage(true);

	const handleRemoveImageDog = () => {
		dispatch(removeImageDogAction(dog, toast));
	};

	const handleRemoveDog = () => {
		dispatch(removeDogAction(dog.id, toast));
	};

	return (
		<Col>
			<Card className="lead shadow card-add">
				{dog.image ? (
					<>
						<div>
							<div className="card__icon-remove">
								<div onClick={handleShowModalUpdateImage}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
										<title>Cambia l'mmagine</title>
										<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
										<path
											fill-rule="evenodd"
											d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
										/>
									</svg>
								</div>
								<div onClick={handleRemoveImageDog}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
										<title>Elimina l'mmagine</title>
										<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
										<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
									</svg>
								</div>
							</div>
							<Card.Img variant="top" src={dog.image.imageUrl} />
						</div>
						<ModalUpdateImage show={showUpdateImage} handleCloseModal={handleCloseModalUpdateImage} dog={dog} />
					</>
				) : (
					<>
						<div className="icon-wrapper p-5" onClick={handleShowModalAddImage}>
							<IoAddOutline />
							<p className="mb-0">Aggiungi una immagine</p>
						</div>
						<ModalAddImage show={showAddImage} handleCloseModal={handleCloseModalAddImage} dog={dog} />
					</>
				)}
				<Card.Body>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<Card.Title>{dog.name}</Card.Title>
						</ListGroup.Item>
						<ListGroup.Item>{dog.breed}</ListGroup.Item>
						<ListGroup.Item>
							{dog.age > 1 ? dog.age + " anni" : dog.age + " anno"}, {dog.weight} kg.
						</ListGroup.Item>
					</ListGroup>
				</Card.Body>
				<Card.Footer className="text-muted d-flex justify-content-end">
					<div className="d-flex align-items-center text-white" onClick={handleShowModalUpdateDog}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
							<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
							<path
								fill-rule="evenodd"
								d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
							/>
						</svg>
						<span>Modifica</span>
					</div>
					<div className="d-flex align-items-center text-white" onClick={handleRemoveDog}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
							<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
							<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
						</svg>
						<span>Elimina</span>
					</div>
				</Card.Footer>
				<ModalUpdateDog show={showUpdateDog} handleCloseModal={handleCloseModalUpdateDog} dogSelected={dog} />
			</Card>
		</Col>
	);
};
export default DogCard;
