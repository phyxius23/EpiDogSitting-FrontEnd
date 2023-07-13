import { Col, Container, Row } from "react-bootstrap";
import DogSitterList from "./DogSitterList";
import DogSitterDetail from "./DogSitterDetail";
import { useDispatch } from "react-redux";
import { getSearchAction } from "../redux/actions";

import { useEffect } from "react";

const DogSitter = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSearchAction(""));
		// dispatch(getDogSittersAction()); //=> questa è la action che usavo precedentemente
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container>
			<Row className="my-5 justify-content-center">
				<Col xs={3}>
					<DogSitterList />
				</Col>
				<Col xs={7}>
					<DogSitterDetail />
				</Col>
				{/* <Col xs={3}>
					<MyProfile />
				</Col> */}
			</Row>
		</Container>
	);
};
export default DogSitter;
