import { Col, Container, Image, Row } from "react-bootstrap";
import AddAddressForm from "./AddAddressForm";
import AddDogForm from "./AddDogForm";
import { useSelector } from "react-redux";
import { useState } from "react";

import { IoPersonAddOutline } from "react-icons/io5";
import ModalAddImageProfile from "./ModalAddImageProfile";
import SectionAddress from "./AddressSection";
import DogSection from "./DogSection";
import AddressSection from "./AddressSection";

import { ToastContainer } from "react-toastify";

const MyProfile = () => {
	const dogowner = useSelector((state) => state.myProfile.user);

	// const isLoading = useSelector((state) => state.myProfile.isLoading);
	// const hasError = useSelector((state) => state.myProfile.hasError);
	// const errorMessage = useSelector((state) => state.myProfile.errorMessage);

	const [show, setShow] = useState(false);
	const handleCloseModal = () => setShow(false);
	const handleShowModal = () => setShow(true);

	return (
		<Container className="mt-3 mb-4 mb-lg-0 my-profile">
			{/* IMAGE, NOME, CITTÀ CAP */}
			{/* {isLoading && !hasError && (
				<div className="isLoading">
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
					<span className="d-block">Loading...</span>
				</div>
			)} */}

			{/* ALERT IN CASO DI MANCATO REPERIMENTO DEI DATI */}
			{/* {hasError && !isLoading && <Alert variant="danger">{errorMessage ? errorMessage : "Errore nel reperire i dati"}</Alert>} */}

			{dogowner && (
				<>
					<ToastContainer />
					<Row className="justify-content-center align-items-center intro">
						{/* FORM ADD IMAGE */}

						{/* SPINNER IN ATTESA DEL REPERIMENTO DEI DATI */}
						<Col sm={3} className="d-flex justify-content-center">
							{/* RENDER DEL COMPONENTE AL COMPLETO REPERIMENTO DEI DATI */}
							{dogowner.image ? (
								<Image src={dogowner.image.imageUrl} className="imgProfile" roundedCircle fluid />
							) : (
								<>
									<div className="iconAddImgProfile" onClick={handleShowModal}>
										<IoPersonAddOutline />
									</div>
									<ModalAddImageProfile show={show} handleCloseModal={handleCloseModal} />
								</>
							)}
						</Col>

						{/* NOME, CITTÀ CAP */}
						<Col sm={7}>
							<h1 className="display-3" style={{ lineHeight: 1, marginTop: "-6px" }}>
								{dogowner.name}
							</h1>
							{dogowner.address && (
								<p>
									{dogowner.address.city}, {dogowner.address.postalCode}
								</p>
							)}
						</Col>
					</Row>

					{/* FORM ADDRESS */}
					{!dogowner.address && <AddAddressForm />}

					{/* FORM DOG */}
					{dogowner.address && dogowner.dogs.length === 0 && (
						<>
							<SectionAddress />
							<AddDogForm />
						</>
					)}

					{/* ADDRESS + DOG */}
					{dogowner.address && dogowner.dogs.length > 0 && (
						<>
							<AddressSection />
							<DogSection dogs={dogowner.dogs} />
						</>
					)}
				</>
			)}
		</Container>
	);
};
export default MyProfile;
