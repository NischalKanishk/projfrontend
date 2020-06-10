const express = require('express')
const app = express()
const mongoose = require('mongoose')
const configDB = require('./config/database')
const User = require('./models/user')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))

mongoose
    .connect(configDB.url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB CONNECTED");
    })

app.get('/', (req, res) => {
        res.render('index.ejs');
    })
app.post('/', (req, res) => {
    const user = new User(req.body);
  user.save()
    .then(item => {
      res.redirect("/")
    })
    .catch(err => {
      console.log(err.messsage)
    });
});

app.listen(3000, () => {
    console.log('Hosted at 3000')
})