const express = require('express'); // Import our Express dependency
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const app = express(); // Create a new server instance
const PORT = 3000; // Port number we want to use of this server

const html_path = __dirname + '/templates/'; // HTML files folder

app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(html_path + 'form.html');
    console.log("query", req.query);
    console.log("body", req.body);
  });


app.post('/send', function(req, res){
    console.log("query", req.query);
    console.log("body", req.body);

    if(req.body.sendfname.toLowerCase() == 'stuart' && req.body.sendlname.toLowerCase() == 'dent') {
        res.sendFile(html_path + 'error.html');
    } else if (req.body.sendfname.toLowerCase() == 'stu' && req.body.sendlname.toLowerCase() == 'dent') {
        res.sendFile(html_path + 'error.html');
    } else {
        res.sendFile(html_path + 'success.html');
    }
 });

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));