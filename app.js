const request = require('request');
const yargs = require('yargs');

const GOOGLE_MAPS_KEY = 'AIzaSyDtwq31X33G-bMpcmdzOp49GrNV195pvBM';
const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			description: 'Address to fetch the weather',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

const encodedAddress = encodeURIComponent(argv.a || argv.address);

request({
	url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_KEY}`,
	json: true
}, (error, response, body) => {
	if (error) {
		console.log('Unable to connect with Google server');
	} else if (body.status === 'ZERO_RESULTS') {
		consoel.log('Unable to find that adress');
	} else if (body.status === 'OK') {
		const {
			formatted_address,
			geometry
		} = body.results[0];

		console.log(`Address : ${formatted_address} \nLattitude : ${geometry.location.lat}, \nLongitude : ${geometry.location.lng}`);
	}
});
