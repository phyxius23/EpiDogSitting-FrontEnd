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

	useEffect(() => {
		// console.log("useEffect => dogsitter");
		dispatch(getSearchAction(""));
		dispatch(getFavoritesAction(dogowner.id));
	}, []);

	return (
		<Container className="dogsitters">
			<Row className="my-5 justify-content-center">
				<Col xs={12} md={4} lg={3} className="dogsitters-list order-2 order-md-1">
					<DogSitterList />
				</Col>

				<Col xs={12} md={8} lg={7} className="order-1 order-md-2">
					<DogSitterDetail />
				</Col>

				{/* <Col xs={2}>
					<MyProfile />
				</Col> */}
			</Row>
		</Container>
	);
};
export default DogSitter;
