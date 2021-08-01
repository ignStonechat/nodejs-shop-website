const express = require('express');
const ejs = require('ejs');
const chalk = require('chalk');
const app = express();
const fs = require('fs');

app.use(express.static('public'));

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/item', (req, res) => {
    var itemName = req.query.name;
    let all_items = JSON.parse(fs.readFileSync('items.json'));

    var theItem = null;

    for (let i = 0; i < all_items.length; i++) {
        if (all_items[i].name === itemName) {
            theItem = all_items[i];
        }
    }

    res.render('itemPage.ejs', {itemName: theItem.name, itemDesc: theItem.description, itemPrice: theItem.price, itemImgFormat: theItem.img_format});

})

app.get('/cart', (req, res) => {
    res.render('cart.ejs');
})

app.get('/api/getAllItems', (req, res) => {
    let all_items = fs.readFileSync('items.json');
    res.send(JSON.parse(all_items));
})

app.get('/get', (req, res) => {
    let key = req.query.key.toLowerCase();
    let all_items = JSON.parse(fs.readFileSync('items.json'));
    
    let key_items = [];

    for (let i = 0; i < all_items.length; i++) {
        item = all_items[i];
        if (item.name.toLowerCase().includes(key)) {
            key_items.push(item);
            break;
        }
    }

    res.send(key_items)

})


app.get('/search', (req, res) => {
    res.render('search.ejs')
})


app.listen(PORT, (e) => {
    if (e) { throw e };
    console.log(`[${chalk.blueBright("STARTUP")}] Listening to port ${PORT}`);
})