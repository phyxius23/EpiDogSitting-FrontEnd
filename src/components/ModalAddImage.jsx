import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postImageDogAction } from "../redux/actions";
import { ToastContainer, toast } from "react-toastify";

const ModalAddImage = ({ show, handleCloseModal, dog }) => {
	const dispatch = useDispatch();
	const [image, setImage] = useState("");

	const sendImage = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("multipartFile", image);

		dispatch(postImageDogAction(dog.id, toast, formData));
	};

	return (
		<>
			{/* FORM ADD IMAGE */}
			<Modal show={show} onHide={handleCloseModal}>
				<ToastContainer />
				<Modal.Header closeButton>
					<Modal.Title>
						<h3>Aggiungi una foto di {dog.name}</h3>
					</Modal.Title>
				</Modal.Header>
				<Form className="rounded form-register" onSubmit={sendImage}>
					<Modal.Body>
						<Form.Group className="my-3">
							<Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} multiple />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseModal}>
							Chiudi
						</Button>
						<Button
							className="border-0"
							style={{
								backgroundColor: "#452103",
							}}
							type="submit">
							Salva immagine
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};
export default ModalAddImage;
