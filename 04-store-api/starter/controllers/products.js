const Product = require('../models/product')


const getAllProductsStatic = async(req, res)=>{



    try{


        // const search = 'ai'

        // BELOW, WE SEARCH FOR A WHOLE ITEM IN THE DB BY THE NAME ADAMA 
        // const products = await Product.find({name:'adama'})

        //BELOW WE SEARCH FOR ANY ITEM THAT HAS AN 'a' IN ITS SPELLING
        // THIS IS THE SAME AS USING WHERE CLAUSE IN SQL OR LIKE
        // I MEANS CASE INSENSITIVE

        //FILTERING
        // const products = await Product.find({name:{$regex:search, $options:'i'}})
        //FILTERING

        //SORTING

        // data will be sorted from the last letter lik from Z to A and the price will be from smallest to largest
        // the negative sign means the reverse.

        // const products = await Product.find({}).sort('featured price')

        const products =  await Product.find({}).sort('company')



        //SORTING

 
        res.status(200).json({products})
    }

    catch(error){

        res.status(500).json({msg: 'A fatal error occured.'})


 }

}


const getAllProducts = async(req, res) =>{

    try{ 

        //putting the properties that you want to access in the query string
        const {featured, company, name} = req.query
        const queryobj ={}

        // sets a new property to your query object
        if(featured){
            queryobj.featured = featured === 'true' ? true : false
        }

        if(company){
            queryobj.company = company
        }

        if(name){
            queryobj.name = {$regex:name, $options:'i'}
        }

        console.log(queryobj) 

        const products = await Product.find(queryobj)
        // console.log(products)
        // console.log(req.query)
        res.status(200).json({products})

    }

    catch(error){

        res.status(500).json({msg: 'A fatal error occured.'})
    }







}

module.exports ={

    getAllProductsStatic,
    getAllProducts
}