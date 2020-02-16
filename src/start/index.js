import React, { useState, useEffect } from 'react';
import { fetchTurtleDetails, fetchTurtleImage } from './fakeApi';

const App = () => {
	const [turtleId, setTurtleId] = useState(0);
	// 	const [resource, setResource] = useState(initialResource);
	return (
		<>
			<button
				onClick={() => {
					const nextId = getNextId(turtleId);
					setTurtleId(nextId);
				}}
			>
				Next Turtle
			</button>
			<hr />
			<TurtleProfile key={turtleId} id={turtleId} />
		</>
	);
};

const TurtleProfile = props => {
	const [turtleDetails, setTurtleDetails] = useState(null);

	useEffect(() => {
		const getTurtleDetails = async () => {
			const fetchedDetails = await fetchTurtleDetails(props.id);
			setTurtleDetails(fetchedDetails);
		};
		getTurtleDetails();
	}, [props.id]);

	if (!turtleDetails) {
		return <div>Loading Turtle...</div>;
	}

	return (
		<>
			<h3>Name: {turtleDetails.name}</h3>
			<h4>Favourite Food: {turtleDetails.favouriteFood}</h4>
			<hr />
			<TurtleMugshot key={props.id} id={props.id} />
		</>
	);
};

const TurtleMugshot = props => {
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		const getImageUrl = async () => {
			const image = await fetchTurtleImage(props.id);
			setImageUrl(image.url);
		};
		getImageUrl();
	}, [props.id]);

	if (!imageUrl) {
		return <div>Loading Turtle image...</div>;
	}

	return <img style={pictureStyles} src={imageUrl} alt="turtle pic" />;
};

const pictureStyles = {
	maxWidth: '40%',
	maxHeight: '40%',
};

function getNextId(id) {
	return id === 3 ? 0 : id + 1;
}

export default App;
