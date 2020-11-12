const app = require('./index');
const PORT = process.env.PORT || 3000;

// Listen to the port
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT} -- http://localhost:${PORT}`);
});