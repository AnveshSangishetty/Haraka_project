const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

app.post('/receive-email', (req, res) => {
    const emailData = req.body;
    const fname='email.json'; // file name
    const fdata=JSON.stringify(emailData,null,5);
    
    // Checking if file already exists
    if(fs.existsSync(fname)){
        fs.appendFileSync(fname,`${fdata}\n`)
    }
    else{
        fs.writeFileSync(fname,`${fdata}\n`);
    }

    // Printing data to the console
    console.log('From:', emailData.from);
    console.log('To:', emailData.to);
    console.log('Subject:', emailData.subject);

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Node server listening on port: ${port}`);
});