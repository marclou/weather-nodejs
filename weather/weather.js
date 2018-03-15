const request = require('request');
const WEATHER_API_KEY = '0b61280fd22197c5716ebc3e2bc7b8ce';

const getWeather = (lat, lng, callback) => {
     request({
          url: `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${lng}`,
          json: true
     }, (error, response, body) => {
          if (error) {
               callback(error);
          } else {
               const degreeTemp = Math.round((body.currently.temperature - 32)* 5 / 9);
               
               callback(undefined, {
                    temperature: degreeTemp
               });
          }
     });
};

module.exports = {
     getWeather: getWeather
};
