const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  try {
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

    //SORTING
    // const products =  await Product.find({}).sort('company')

    // SELECTING ONLY SPECIFIC PRODUCTS TO DISPLAY
    // const products = await Product.find({})
    // .sort('name')
    // .select("name price")
    // .limit(4)
    // .skip(2)



    //NUMERIC FILTERS

    const products = await Product.find({price:{$gt: 100}}).sort('price')

    res.status(200).json({ products ,pro:products.length});
  } catch (error) {
    res.status(500).json({ msg: "A fatal error occured." });
  }
};

const getAllProducts = async (req, res) => {
  try {
    //putting the properties that you want to access in the query string

    // first put sort into the query
    // query strings are designed by the programmer and are provided to the user through documentation to help them with their search.
    const { featured, company, name, sort, fields, numberFilter } = req.query;
    const queryobj = {};

    // sets a new property to your query object
    if (featured) {
      queryobj.featured = featured === "true" ? true : false;
    }

    if (company) {
      queryobj.company = company;
    }

    if (name) {
      queryobj.name = { $regex: name, $options: "i" };
    }

    if(numberFilter){

        // MAPS THE USER FRIENDLY OPERATORS TO THE ONES UNDERSTOOD BY MONGOOSE

        const operatorMap ={

            '>' :'$gt',
            '>=' :'$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'

        }

        // PASS IN THE VALUES SEPARATED BY VERTICAL BARS

        const regEX = /\b(<|>|>=|<=|=)\n/g;

        // CHANGES THE VALUES OF THE USER FIRENDLY ONES TO THOSE UNDERSTOOD BY MONGOOSE BY USE OF THE REGULAR EXPRESSIONS

        let filters = numberFilter.replace(regEX, (match)=> `-${operatorMap[match]}-`)

        const options =['price', 'rating']
        filters =filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryobj[field] ={[operator]: Number(value)}
            }

            
        });


        console.log(filters)
    }

    // console.log(queryobj)

    // you cannot chain the sort to the products, the user may not pass in the sort into the query and therefore we have to do it conditionally.

    let result = Product.find(queryobj);

    //in the case the user has passed in the sort key.
    // the value returned to the console in case the user has passed more than one value to the sort query will have a comma which is not allowed, we have to remove the comma and use the split and join function.

    if (sort) {
      // products = products.sort()

      // console.log(sort)

      const sortlist = sort.split(",").join("");
      result = result.sort(sortlist);
    }

    // if the user has not passed in the sort query then by default sort by the time the products were created.
    else {
      result = result.sort("createdAt");
    }

    if (fields) {
      const selectlist = fields.split(",").join(" ");
      result = result.select(selectlist);
    }


    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result;

    // console.log(products)
    // console.log(req.query)
    res.status(200).json({ products, pro:products.length });
  } catch (error) {
    res.status(500).json({ msg: "A fatal error occured." });
  }
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
 