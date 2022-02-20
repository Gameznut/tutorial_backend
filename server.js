const express = require('express');
const request = require('request-promise');

const app = express()
const PORT =  process.env.PORT || 5000

function generateApikey(apikey){
    const baseUrl = `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`
    return baseUrl
}


app.use(express.json())
// app.use(request())

app.get('/', (req, res) => {
    res.send('Welcome to my amazon scapper Api from pablo')
})

app.get('/products/:productId', async(req, res)=> {
    const {productId} = req.params
    const {apikey} = req.query
    
     try {
         const response = await request(`${generateApikey(apikey)}&url=https://www.amazon.com/dp/${productId}`)
         res.json(JSON.parse(response))
     } catch (error) {
         console.log(error);
     }
})
app.get('/products/:productId/reviews', async(req, res)=> {
    const {productId} = req.params
    const {apikey} = req.query

     try {
         const response = await request(`${generateApikey(apikey)}&url=https://www.amazon.com/product-review/${productId}`)
         res.json(JSON.parse(response))
     } catch (error) {
         console.log(error);
     }
})

app.get('/products/:productId/offers', async(req, res)=> {
    const {productId} = req.params
    const {apikey} = req.query
     try {
         const response = await request(`${generateApikey(apikey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
         res.json(JSON.parse(response))
     } catch (error) {
         console.log(error);
     }
})

app.get('/search/:searchQuery', async(req, res)=> {
    const {searchQuery} = req.params
    const {apikey} = req.query

    console.log(searchQuery);
     try {
         const response = await request(`${generateApikey(apikey)}&url=https://www.amazon.com/s?k=/${searchQuery}`)
         res.json(JSON.parse(response))
     } catch (error) {
         console.log(error);
     }
})

app.listen(PORT, () => {
    console.log(`'Connected to the server ${PORT}'`);
})