const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
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


geocode.geocodeAddress(argv.a || argv.address, (error, result) => {
	if (error) {
		console.log(error);
	} else {
		console.log(result);
	}
});
