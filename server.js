const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/fact-idle'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/fact-idle/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);