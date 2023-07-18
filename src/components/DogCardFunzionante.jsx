import { Col, Image } from "react-bootstrap";
import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";
import ModalAddImage from "./ModalAddImage";

const DogCardFunzionante = ({ dog }) => {
	const [show, setShow] = useState(false);
	const handleCloseModal = () => setShow(false);
	const handleShowModal = () => setShow(true);
	// const handleCloseModalDelayed = () => {
	// 	setTimeout(() => {
	// 		setShow(false);
	// 	}, 2000);
	// };

	return (
		<Col xs={6} className="dog-card mb-4">
			<div className="d-flex h-100">
				<Col xs={6} className="dog-card__img">
					{dog.image ? (
						<Image src={dog.image.imageUrl} fluid />
					) : (
						<>
							<div className="cursor-pointer p-5" onClick={handleShowModal}>
								<IoAddOutline />
								<p>Aggiungi una immagine</p>
							</div>
							<ModalAddImage show={show} handleCloseModal={handleCloseModal} dog={dog} />
						</>
					)}
				</Col>

				<Col xs={6} className="dog-card__txt p-3">
					<p className="mb-0">{dog.name}</p>
					<p className="mb-0">{dog.breed}</p>
					<p className="mb-0">{dog.age} Anni</p>
					<p className="mb-0">{dog.weight} kg.</p>
				</Col>
			</div>
		</Col>
	);
};
export default DogCardFunzionante;
