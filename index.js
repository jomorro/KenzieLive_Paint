const express = require("express")
const port = 3000
const app = express()

let updates = [];

app.use(express.static('public'))
app.use(express.json())

//Request handlers below
app.post('/updates', (req, res) => {
    if (req.body.clientupdates) {
        updates = updates.concat(req.body.clientupdates);
    }
    const updatesLength = updates.length;
    const updatesArray = updates.slice(req.body.lastUpdateIndex);
    res.json({updateIndex: updatesLength, updatesArray});
});

app.listen(port)