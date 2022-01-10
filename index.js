const express = require ('express');

var router = express.Router();
const path = require('path');
const {getUsers, register}=require('./dbService');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const Logged_in = (req,res,next)=>{
    const id = req.session.userName;
    if(!req.session.userId){
        res.redirect('/');
    }else{
            next();
        }
}

router.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/template/index.html');
  });

  
  
router.post('/registration',function(req,res){
    const korisnik={
        ime:req.body.username,
        sifra:req.body.password
	}
    register(korisnik);
    console.log(korisnik.ime + " added! :)");
    res.redirect('/room1');
});


router.post('/log_in',async function(req, res){
    const vrednosti={
        ime: req.body.username,
		sifra: req.body.password
    }
    const imme=vrednosti.ime;
    const korisnik = await getUsers(imme);
    if(vrednosti.ime == korisnik.username && vrednosti.password == korisnik.sifra){
        req.session.userId = korisnik.id;
        req.session.userName=korisnik.username;
		res.redirect('/room1');
        console.log(korisnik.username + " logged in! :)");
	}else{
        res.redirect('/log_in');
    }
});



router.get('/room1',Logged_in,function(req,res)
{
    res.sendFile(__dirname + '/template/room1.html');
});

module.exports = router;