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

const MyProfile = () => {
	const dogowner = useSelector((state) => state.myProfile.user);

	const [show, setShow] = useState(false);
	const handleCloseModal = () => setShow(false);
	const handleShowModal = () => setShow(true);

	return (
		<Container className="mt-3 mb-4 mb-lg-0 my-profile">
			{/* IMAGE, NOME, CITTÀ CAP */}
			{dogowner && (
				<>
					<Row className="justify-content-center align-items-center">
						{/* FORM ADD IMAGE */}
						<Col xs={4} className="d-flex justify-content-center">
							{/* RENDER DEL COMPONENTE AL COMPLETO REPERIMENTO DEI DATI */}
							{dogowner.image ? (
								<Image src={dogowner.image.imageUrl} className="my-profile__image shadow-lg" roundedCircle fluid />
							) : (
								<>
									<div className="my-profile__add-image shadow" onClick={handleShowModal}>
										<IoPersonAddOutline />
									</div>
									<ModalAddImageProfile show={show} handleCloseModal={handleCloseModal} />
								</>
							)}
						</Col>

						{/* NOME, CITTÀ CAP */}
						<Col xs={8} lg={7}>
							<h1 className="display-3">{dogowner.name}</h1>
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
