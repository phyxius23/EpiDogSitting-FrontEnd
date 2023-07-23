import { Col, Row, Card } from "react-bootstrap";
import DogCard from "./DogCard";
import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";
import ModalAddDog from "./ModalAddDog";

const DogSection = ({ dogs }) => {
	const [show, setShow] = useState(false);
	const handleCloseModal = () => setShow(false);
	const handleShowModal = () => setShow(true);

	return (
		<Row className="justify-content-center mt-5 dog">
			<Col xs={12} lg={10}>
				<h4 className="font-weight-bold mb-4">I tuoi animali domestici:</h4>
				<Row xs={1} md={2} className="align-items-stretch g-4">
					{/* DOGS LIST */}
					{dogs.length > 0 && dogs.map((dog) => <DogCard key={dog.id} dog={dog} />)}

					{/* ADD DOG */}
					<Col>
						<Card className="lead shadow card-add">
							<div className="icon-wrapper p-5" onClick={handleShowModal}>
								<IoAddOutline />
								<p className="mb-0">Aggiungi un animale domestico</p>
							</div>
							<ModalAddDog show={show} handleCloseModal={handleCloseModal} />
						</Card>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};
export default DogSection;
