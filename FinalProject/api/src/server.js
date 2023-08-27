const express = require('express');

const app = express();
const PORT = process.env.PORT;

const router = require('./api/APIRoutes');
app.use(router);

// app.use(express.json());

// app.get('/', (req,  res) => {
//   res.json({your_api: 'it works'});
// });

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));