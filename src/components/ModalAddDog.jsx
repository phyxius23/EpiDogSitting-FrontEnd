import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postDogAction } from "../redux/actions";
import { IoPaperPlaneSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const ModalAddDog = ({ show, handleCloseModal }) => {
	const dogowner = useSelector((state) => state.myProfile.user);
	const dispatch = useDispatch();

	const [dog, setDog] = useState({
		name: "",
		age: "",
		breed: "",
		weight: "",
		description: "",
	});

	const sendDog = (e) => {
		e.preventDefault();

		dispatch(postDogAction(dogowner.id, toast, dog));

		setDog({
			name: "",
			age: "",
			breed: "",
			weight: "",
			description: "",
		});
	};

	return (
		<Modal show={show} onHide={handleCloseModal}>
			<Modal.Header closeButton>
				<Modal.Title>
					<h3>Dettagli dell'animale domestico</h3>
				</Modal.Title>
			</Modal.Header>
			<Form className=" rounded form-register" onSubmit={sendDog}>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Nome</Form.Label>
						<Form.Control required type="text" className="" placeholder="Inserisci il nome" value={dog.name} onChange={(e) => setDog({ ...dog, name: e.target.value })} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Età</Form.Label>
						<Form.Control required type="text" className="input-login" placeholder="Inserisci l'età" value={dog.age} onChange={(e) => setDog({ ...dog, age: e.target.value })} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Razza</Form.Label>
						<Form.Control required type="text" className="" placeholder="Inserisci la razza" value={dog.breed} onChange={(e) => setDog({ ...dog, breed: e.target.value })} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Peso</Form.Label>
						<Form.Control required type="text" className="" placeholder="Inserisci il peso" value={dog.weight} onChange={(e) => setDog({ ...dog, weight: e.target.value })} />
					</Form.Group>
					{/* <Form.Group className="mb-3">
							<FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
								<Form.Control required as="textarea" placeholder="Inserisci una descrizione" value={dog.description} onChange={(e) => setDog({ ...dog, description: e.target.value })} />
							</FloatingLabel>
						</Form.Group> */}
					{/* <Form.Group className="mb-3">
							<Form.Label>Nome</Form.Label>
							<Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} multiple />
						</Form.Group> */}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModal}>
						Chiudi
					</Button>
					<Button type="submit" variant="primary" onClick={handleCloseModal}>
						<span>Invia</span>
						<IoPaperPlaneSharp />
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};
export default ModalAddDog;
