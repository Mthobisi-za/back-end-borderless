const express = require('express');
var bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const app = express();
var cors = require('cors')
const port = process.env.PORT || 5000;
// firebase
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { addDoc, collection, getFirestore, getDocs } = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyAAmXX9Z2gRT3pDF5LpV-mDNlOQLeUuGKA",
    authDomain: "grey-1a5e6.firebaseapp.com",
    projectId: "grey-1a5e6",
    storageBucket: "grey-1a5e6.appspot.com",
    messagingSenderId: "913849587315",
    appId: "1:913849587315:web:e51d80891a6ae79878bc06",
    measurementId: "G-5ZY8SB37L3"
};
// Initialize Firebase
const appdb = initializeApp(firebaseConfig);
const db = getFirestore(appdb);
// firebase
app.use(cors({ origin: "*" }));
// app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('login')
});

app.post('/login', (req, res) => {
    var data = req.body.pin;
    //{"talent":[{"company_name":"Mthobisi Ngubane","surname":"BARNWELL","email":"mthobisimtho333@gmail.com","occupation":"CHIEF CREATIVE OFFICER","client_name":"Mthobisi Ngubane","date_booked":"2023/02/06-2023/02/21","name":"MIKE"}]}
    async function getData() {
        const querySnapshot = await getDocs(collection(db, "talent"));
        var arg = [];
        var argTeam = [];
        querySnapshot.forEach((doc) => {
            if (doc.data().talent.length > 1) {
                var obj = {
                    team_name: doc.data().talent[0].name + ' ' + doc.data().talent[0].surname + ' and ' + doc.data().talent[1].name + ' ' + doc.data().talent[1].surname,
                    company_name: doc.data().talent[0].company_name,
                    email: doc.data().talent[1].email,
                    date_booked: doc.data().talent[0].date_booked,
                    client_name: doc.data().talent[0].client_name,
                    doc_id: doc.id
                };
                console.log(obj);
                argTeam.push(obj);
            } else {
                var obj = doc.data().talent[0];
                var docid = { doc_id: doc.id };
                arg.push({...obj, ...docid });
            }
        });
        return { arg, argTeam };
    }



    if (data == "Borderless2023") {
        (async() => {;
            res.render('index', { data: (await getData()).arg, team: (await getData()).argTeam });
        })();
    } else {
        res.redirect('/');
    }
})



app.get('/approve/:name/:surname/:client_name/:type', () => {

});

app.listen(port, () => {
    console.log('server started on>>> ' + port);
})