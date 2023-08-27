const express = require('express');

const app = express();
const PORT = process.env.PORT;

// Designate the static folder as serving static resources
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({extended: true}));

// const routes = require('./static/js/api/APIRoutes');
// app.use(routes);

const html_dir = __dirname + '/static/';
app.get('/', (req, res) => {
  res.sendFile(`${html_dir}index.html`);
})
app.get('/create', (req, res) => {
  res.sendFile(`${html_dir}create.html`);
})
app.get('/account', (req, res) => {
  res.sendFile(`${html_dir}account.html`);
})
app.get('/browse', (req, res) => {
  res.sendFile(`${html_dir}browse.html`);
})
app.post('/login', (req, res) => {
  if (req.body.userId == 'Admin' || req.body.userId == "admin") {
    res.sendFile(`${html_dir}admin.html`);
  } else {
    res.sendFile(`${html_dir}account.html`);
  }
})

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));