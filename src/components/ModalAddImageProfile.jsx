import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postImageProfileAction } from "../redux/actions";
import { toast } from "react-toastify";

const ModalAddImageProfile = ({ show, handleCloseModal }) => {
	const dogowner = useSelector((state) => state.myProfile.user);
	const dispatch = useDispatch();
	const [image, setImage] = useState("");

	const sendImage = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("multipartFile", image);

		dispatch(postImageProfileAction(dogowner.id, formData, toast));
	};

	return (
		<>
			{/* FORM ADD IMAGE */}
			<Modal show={show} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						<h3>Aggiungi immagine profilo</h3>
					</Modal.Title>
				</Modal.Header>
				<Form className="rounded form-register" onSubmit={sendImage}>
					<Modal.Body>
						<Form.Group className="mb-3">
							<Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} multiple />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseModal}>
							Chiudi
						</Button>
						<Button type="submit" variant="warning" className="border-0">
							Salva immagine
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};
export default ModalAddImageProfile;
