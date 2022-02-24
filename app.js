if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const { Console } = require('console')
const express = require('express')
const app     = express()
const fs      = require('fs') //Permet de lire les fichiers

app.set('view engine', 'ejs')
app.use(express.static('public')) //Indique l'emplacement des fichiers front-end


app.get('/store', function(req, res){
    fs.readFile('items.json', function(error, data){
        if(error){
            res.status(500).end()
        }else {
            res.render('store.ejs', {
                //Tableau JSON à envoyer au fichier sous le nom 'items'
                items: JSON.parse(data),
                stripePublicKey: stripePublicKey
            });
        }
    })
})


app.listen(3000)
