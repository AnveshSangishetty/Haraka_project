const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path=require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

app.post('/receive-email', (req, res) => {
    const emailData = req.body;
    const fdata=JSON.stringify(emailData,null,5);
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;

    fs.writeFileSync(path.join(__dirname,`/emails/${timestamp}.json`),fdata)
    

    // Printing data to the console
    console.log('From:', emailData.from.text);
    console.log('To:', emailData.to.text);
    console.log('Subject:', emailData.subject);

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Node server listening on port: ${port}`);
});