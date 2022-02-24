if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const { Console } = require('console')
const express = require('express')
const app     = express()
const fs      = require('fs') //Able to read files

app.set('view engine', 'ejs')
app.use(express.static('public')) //Tell location of folders


app.get('/store', function(req, res){
    fs.readFile('items.json', function(error, data){
        if(error){
            res.status(500).end()
        }else {
            res.render('store.ejs', {
                //Sending JSON array with the name of 'items'
                items: JSON.parse(data),
                stripePublicKey: stripePublicKey
            });
        }
    })
})


app.listen(3000)
