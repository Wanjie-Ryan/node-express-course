const Product = require('../models/product')


const getAllProductsStatic = async(req, res)=>{

    try{

        const products = await Product.findOne({name:'accent chair'})


        res.status(200).json({products})
    }

    catch(error){

        res.status(500).json({msg: 'A fatal error occured.'})


 }

}


const getAllProducts = async(req, res) =>{

    try{ 

        const products = await Product.find(req.query)
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