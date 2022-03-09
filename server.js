// const express = require('express')
// const app = express()
// const PORT = (process.env.PORT || 3000)

<<<<<<< HEAD
app.use(express.static('build'));
app.listen(PORT, ( ()=> console.log(`Listening on port ~${PORT}`)))
=======
// app.use(express.static('build'));
// app.listen(PORT, ( ()=> console.log(`Listening on port ~${PORT}`)))

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) =>
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
>>>>>>> f08f54b31ba34ffa5e861d5c20550537aea20588
