const app = require('./app.js');
const { PORT = 3001 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
