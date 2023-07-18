import { Col, Row } from "react-bootstrap";
import DogCard from "./DogCard";
import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";
import ModalAddDog from "./ModalAddDog";

const DogSection = ({ dogs }) => {
	const [show, setShow] = useState(false);
	const handleCloseModal = () => setShow(false);
	const handleShowModal = () => setShow(true);

	return (
		<Row className="justify-content-center mt-3 dog">
			<Col sm={10}>
				<div className="lead mb-0">
					<h4 className="font-weight-bold mb-3">I tuoi animali domestici:</h4>
					<Row xs={1} md={2} className="align-items-stretch g-4">
						{/* DOGS LIST */}
						{dogs.length > 0 && dogs.map((dog) => <DogCard key={dog.id} dog={dog} />)}

						{/* ADD DOG */}
						<Col xs={6} className="dog-card dog-card__add mb-4">
							{" "}
							sostituita dalla riga sotto
							{/* <Col xs={6} className="mb-4"> */}
							<div className="dog-card__svg" onClick={handleShowModal}>
								<div>
									<IoAddOutline />
									<p>Aggiungi un animale domestico</p>
								</div>
								<ModalAddDog show={show} handleCloseModal={handleCloseModal} />
							</div>
						</Col>
					</Row>
				</div>
			</Col>
		</Row>
	);
};
export default DogSection;