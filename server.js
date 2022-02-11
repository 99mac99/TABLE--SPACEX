// const express = require('express')
// const app = express()
// const PORT = (process.env.PORT || 3000)

// app.use(express.static('build'));
// app.listen(PORT, ( ()=> console.log(`Listening on port ~${PORT}`)))

const express = require('express');
// eslint-disable-next-line no-unused-vars
// const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) =>
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));