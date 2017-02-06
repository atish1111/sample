const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express ();

app.use(bodyParser.urlencoded({extended: true}))


var db

MongoClient.connect('mongodb://atish:12345@ds139949.mlab.com:39949/atishdb', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {

    var cursor = db.collection('quotes').find().toArray(function (err, result) {
 	if (err) return console.log(err)
    // renders index.ejs
	app.set('view engine', 'ejs')
    res.render('index.ejs', {quotes: result})    })

})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('2')
    res.redirect('/')
  })
})

app.post('/delete', (req, res) => {
  db.collection('quotes').remove(req.body,true, (err, result) => {
    if (err) return console.log(err)

    console.log('1')
    res.redirect('/')
  })
})