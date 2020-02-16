export function fetchProfileData(userId) {
	let userPromise = fetchTurtleDetails(userId);
	let postsPromise = fetchTurtleImage(userId);
	return {
		userId,
		user: wrapPromise(userPromise),
		posts: wrapPromise(postsPromise),
	};
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise) {
	let status = 'pending';
	let result;
	let suspender = promise.then(
		r => {
			status = 'success';
			result = r;
		},
		e => {
			status = 'error';
			result = e;
		}
	);
	return {
		read() {
			if (status === 'pending') {
				throw suspender;
			} else if (status === 'error') {
				throw result;
			} else if (status === 'success') {
				return result;
			}
		},
	};
}

export function fetchTurtleDetails(userId) {
	console.log('fetch user ' + userId + '...');
	return new Promise(resolve => {
		setTimeout(() => {
			console.log('fetched user ' + userId);
			switch (userId) {
				case 0:
					resolve({
						name: 'Michael Angelo',
						favouriteFood: 'Pizza',
					});
					break;
				case 1:
					resolve({
						name: 'Leonardo',
						favouriteFood: 'Pizza',
					});
					break;
				case 2:
					resolve({
						name: 'Raphael',
						favouriteFood: 'Pizza',
					});
					break;
				case 3:
					resolve({
						name: 'Donatello',
						favouriteFood: 'Pizza',
					});
					break;
				default:
					throw Error('Unknown user.');
			}
		}, 2000 * Math.random());
	});
}

export function fetchTurtleImage(userId) {
	console.log('fetch posts for ' + userId + '...');
	return new Promise(resolve => {
		setTimeout(() => {
			console.log('fetched posts for ' + userId);
			switch (userId) {
				case 0:
					resolve({
						id: 0,
						url:
							'https://www.netclipart.com/pp/m/354-3547699_michelangelo-leonardo-raphael-donatello-teenage-mutant-donatello-michelangelo.png',
					});
					break;
				case 1:
					resolve({
						id: 0,
						url:
							'https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:kids-assets:/nick/properties/teenage-mutant-ninja-turtles/characters/leonardo-character-web-desktop.png?height=0&width=480&matte=true&crop=false',
					});
					break;
				case 2:
					resolve({
						id: 0,
						url:
							'https://vignette.wikia.nocookie.net/tmnt2012series/images/6/63/Raph-rage.png/revision/latest/scale-to-width-down/340?cb=20170428232825',
					});
					break;
				case 3:
					resolve({
						id: 0,
						url: 'https://images-na.ssl-images-amazon.com/images/I/51CJ12C7MyL._AC_SX522_.jpg',
					});
					break;
				default:
					throw Error('Unknown user.');
			}
		}, 2000 * Math.random());
	});
}
