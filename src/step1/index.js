import React, { Suspense, useState } from 'react';
import { fetchProfileData } from './fakeApi';

const initialResource = fetchProfileData(0);

const App = () => {
	const [resource, setResource] = useState(initialResource);
	return (
		<>
			<button
				onClick={() => {
					setResource(fetchProfileData(getNextId(resource.turtleId)));
				}}
			>
				Next Turtle
			</button>
			<hr />
			<Suspense fallback={<h4>Loading turtle details...</h4>}>
				<TurtleProfile key={resource.id} resource={resource} />
				<Suspense fallback={<h4>Loading turtle image...</h4>}>
					<TurtleMugshot key={resource.id} resource={resource} />
				</Suspense>
			</Suspense>
		</>
	);
};

const TurtleProfile = props => {
	const turtleDetails = props.resource.turtleDetails.read();

	return (
		<>
			<h3>Name: {turtleDetails.name}</h3>
			<h4>Favourite Food: {turtleDetails.favouriteFood}</h4>
			<hr />
		</>
	);
};

const TurtleMugshot = props => {
	const turtleImage = props.resource.turtleImage.read();

	return <img style={pictureStyles} src={turtleImage.url} alt="turtle pic" />;
};

const pictureStyles = {
	maxWidth: '40%',
	maxHeight: '40%',
};

function getNextId(id) {
	return id === 3 ? 0 : id + 1;
}

export default App;
