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
					<h4 className="font-weight-bold">I tuoi animali domestici:</h4>
					<Row className="align-items-stretch">
						{/* DOGS LIST */}
						{dogs.length > 0 && dogs.map((dog) => <DogCard key={dog.id} dog={dog} />)}

						{/* ADD DOG */}
						<Col xs={6} className="dog-card dog-card__add mb-4">
							<div className="dog-card__svg" onClick={handleShowModal}>
								<div>
									<IoAddOutline />
									<p>Aggiungi un animale domestico</p>
								</div>
							</div>
						</Col>
						<ModalAddDog show={show} handleCloseModal={handleCloseModal} />
					</Row>
				</div>
			</Col>
		</Row>
	);
};
export default DogSection;
