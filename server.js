'use strict'

const app = require('./index');
const configs = require('./src/config/main.config')
const PORT = configs.PORT || 3000;

// Listen to the port
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT} -- http://localhost:${PORT}`);
});