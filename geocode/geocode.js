const request = require('request');
const axios = require('axios');
const GOOGLE_MAPS_KEY = 'AIzaSyDtwq31X33G-bMpcmdzOp49GrNV195pvBM';

const geocodeAddress = (address, callback) => {
	const encodedAddress = encodeURIComponent(address);

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_KEY}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect with Google server');
		} else if (body.status === 'ZERO_RESULTS') {
			callback('Unable to find that adress');
		} else if (body.status === 'OK') {
			const {
				formatted_address,
				geometry
			} = body.results[0];
			const geocodedAddress = {
				address: formatted_address,
				latitude: geometry.location.lat,
                    longitude: geometry.location.lng
			};

			callback(undefined, geocodedAddress);
		}
	});
};

const geocodeAddressPromise = (address) => {
	return new Promise((resolve, reject) => {
		const encodedAddress = encodeURIComponent(address);

		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_KEY}`,
			json: true
		}, (error, response, body) => {
			if (error) {
				reject('Unable to connect to Google server');
			} else if (body.status === 'ZERO_RESULTS') {
				reject('Unable to find that address');
			} else if (body.status === 'OK') {
				const {
					formatted_address,
					geometry
				} = body.results[0];

				const geocodedAddress = {
					address: formatted_address,
					latitude: geometry.location.lat,
	                    longitude: geometry.location.lng
				};
				resolve(geocodedAddress);
			}
		});
	});
}

module.exports = {
	geocodeAddress: geocodeAddress,
	geocodeAddressPromise: geocodeAddressPromise
};
