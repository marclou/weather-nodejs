const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
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


// geocode.geocodeAddress(argv.a || argv.address, (error, result) => {
// // 	if (error) {
// // 		console.log(error);
// // 	} else {
// // 		const currentAddress = result.address;
// // 		weather.getWeather(result.latitude, result.longitude, (error, result) => {
// // 			if (error) {
// // 				console.log(error);
// // 			} else {
// // 				console.log(`It is currently ${result.temperature}° at ${currentAddress}`);
// // 			}
// // 		});
// // 	}
// // });

geocode.geocodeAddressPromise(argv.a || argv.address)
	.then((res) => {
		const currentAddress = res.address;

		weather.getWeather(res.latitude, res.longitude, (error, result) => {
			if (error) {
				console.log(error);
			} else {
				console.log(`It is currently ${result.temperature}° at ${currentAddress}`);
			}
		});
	})
	.catch((errorMessage) => console.log(errorMessage));
