const express = require('express');
const app = express();
const parser = require('body-parser').urlencoded({ extended: false });
const jsonParser = require('body-parser').json();
const { getList, insertProduct } = require('./db');

app.listen(3000, () => console.log('Server started'));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => res.render('home'));
app.get('/api/product/all', (req, res) => {
        getList()
        .then(notes => res.send(notes))
        .catch(err => res.send(err));
});
app.post('/insert', jsonParser, (req, res) => {
        const { name } = req.body;
        insertProduct(name)
        .then(result => res.send(result))
        .catch(err => res.send(err));

});