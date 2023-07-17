/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Container, Row } from "react-bootstrap";
import DogSitterList from "./DogSitterList";
import DogSitterDetail from "./DogSitterDetail";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritesAction, getSearchAction } from "../redux/actions";

import { useEffect } from "react";

const DogSitter = () => {
	const dispatch = useDispatch();
	const dogowner = useSelector((state) => state.myProfile.user);

	const dogsitter = useSelector((state) => state.dogSitterSelected.content);
	// const hasFetchError = useSelector((state) => state.dogSitters.hasError);

	useEffect(() => {
		dispatch(getSearchAction(""));
		dispatch(getFavoritesAction(dogowner.id));
	}, []);

	return (
		<Container>
			<Row className="my-5 justify-content-center">
				<Col xs={3}>
					<DogSitterList />
				</Col>
				<Col xs={7}>
					{dogsitter ? (
						<DogSitterDetail />
					) : (
						<Row>
							<Col sm={12}>
								<h3 className="display-6">Seleziona un DogSitter!</h3>
							</Col>
						</Row>
					)}
				</Col>
				{/* <Col xs={2}>
					<MyProfile />
				</Col> */}
			</Row>
		</Container>
	);
};
export default DogSitter;
