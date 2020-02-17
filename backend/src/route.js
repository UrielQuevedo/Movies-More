const { Router } = require('express');
const router = Router();
const admin = require("firebase-admin");

const serviceAccount = require('../moviesandmore-df541-firebase-adminsdk-cokmn-1a1bd2499c.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://moviesandmore-df541.firebaseio.com"
});;

const db = admin.database();

router.get('/user/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    db.ref('users')
    res.status(200).json(album);
});

router.post('/newUser', (req, res) => {
    db.ref('users').push(req.body);
    res.status(200).json();
})

module.exports = router;