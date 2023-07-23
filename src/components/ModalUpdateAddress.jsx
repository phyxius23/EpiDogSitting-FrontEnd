import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { putAddressAction } from "../redux/actions";
import { toast } from "react-toastify";

const ModalUpdateAddress = ({ show, handleCloseModal }) => {
	const dogowner = useSelector((state) => state.myProfile.user);
	const dogownerAddress = useSelector((state) => state.myProfile.user.address);
	const dispatch = useDispatch();

	const [address, setAddress] = useState({
		street: dogownerAddress.street,
		city: dogownerAddress.city,
		province: dogownerAddress.province,
		postalCode: dogownerAddress.postalCode,
	});

	const sendAddress = (e) => {
		e.preventDefault();

		if (!isValidCap(address.postalCode)) {
			return toast.warning("Inserisci un CAP valido");
		}

		handleCloseModal();

		dispatch(putAddressAction(dogowner.id, dogownerAddress.id, address, toast));
	};

	// validazione del CAP
	const isValidCap = (cap) => {
		const capRegex = /^$|^[0-9]{5}$/;
		return capRegex.test(cap);
	};

	return (
		<>
			{/* FORM UPDATE IMAGE */}
			<Modal show={show} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						<h3>Modifica l'indirizzo di {dogowner.name}</h3>
					</Modal.Title>
				</Modal.Header>
				<Form className="rounded form-register" onSubmit={sendAddress}>
					<Modal.Body>
						<Form.Group className="mb-3">
							<Form.Label>Via</Form.Label>
							<Form.Control type="text" placeholder="Inserisci la via" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} required />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Città</Form.Label>
							<Form.Control
								type="text"
								className="input-login"
								placeholder="Inserisci la città"
								value={address.city}
								onChange={(e) => setAddress({ ...address, city: e.target.value })}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Provincia</Form.Label>
							<Form.Control
								type="text"
								pattern="(^[A-Z]{2}$)"
								placeholder="Inserisci la provincia"
								value={address.province}
								onChange={(e) => setAddress({ ...address, province: e.target.value })}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>CAP</Form.Label>
							<Form.Control type="number" placeholder="Inserisci il CAP" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} required />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseModal}>
							Chiudi
						</Button>
						<Button type="submit" variant="warning" className="border-0">
							Salva indirizzo
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};
export default ModalUpdateAddress;
