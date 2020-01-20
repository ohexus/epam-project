const express = require('express');
const app = express();

app.use(express.static('dist'));



module.exports = {
    "server": {
        "baseDir": "dist",
        "routes": {
            "/node_modules": "node_modules"
        },
        middleware: {
            1: app,
        },
    },
    "files": ["./**/*.{html,htm,css,js}"],
    "port": 8099
};

app.listen(module.exports.port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`Server started ${ module.exports.port }!`);
});