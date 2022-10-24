const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const nocache = require('nocache');


const app=express();
// listen for request
app.listen(7000);
app.use(express.static("views"))
app.use(sessions({
    secret: "acbdYE",
    saveUninitialized:true,
    resave: false
}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}))

const user={
    username:'nihal',
    password:'123456',
}
let flag=0;




app.use((req, res, next) => {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0",
    );
    next()
})

app.get('/',(req,res) => {
    var session=req.session;
    if (session.userid) {
        session.count += 1;
        res.render('homepage',{visited:session.count})
    } else{
        res.render('login',{flag})
        flag=0
    }
})


app.post('/login',(req,res) =>{
    let usrname=req.body.username;
    let password=req.body.password;

    if (usrname==user.username && password==user.password) {
        var session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.redirect('/')
    } else {
        flag=1;
        res.redirect('/') 
    }
})


app.get('/logout',(req,res) => {
    req.session.destroy();
    console.log('logout')
    res.redirect('/');
});

app.use((req,res) =>{
    res.status(404).render('404')
})







