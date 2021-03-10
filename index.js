// require your server and launch it
const server = require('./api/server');

server.listen(4000, () => {
    console.log('Magic happening on Port:4000!');
});