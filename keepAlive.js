const axios = require('axios');

const APP_URL = process.env.APP_URL || 'https://aj-g7x8.onrender.com'; // Use your app's production URL or localhost for development

const pingApp = () => {
  axios
    .get(APP_URL)
    .then((response) => {
      if (response.status === 200) {
        console.log('App is alive and responding!');
      }
    })
    .catch((error) => {
      console.error('Error pinging the app:', error);
    });
};

// Ping every 4 minutes (240000 milliseconds)
setInterval(pingApp, 240000);


module.exports = pingApp;
