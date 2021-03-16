const Products = require('../models/productModel');

// Filter, Sorting & Pagination
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    };

    // filtering
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query
        console.log({before: queryObj}); // before delete page
        // filtering by page, sort, limit
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete(queryObj[el]));

        console.log({after: queryObj}); // after delete page

        let queryStr = JSON.stringify(queryObj);
        // console.log({queryObj, queryStr}) //checking
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
        console.log({queryObj, queryStr})
        // gte = greater than or equal
        // lte = lesser than or equal
        // lt = lesser than
        // gt = greater than
        this.query.find(JSON.parse(queryStr));
        return this;

    };

    // sorting
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log(sortBy)
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    };

    // paginating
    paginating(){
        const page = this.queryString.page * 1 || 1
        // No. of data display 9 or show result
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        console.log(this)
        return this;
    }


}

const productCtrl = {

    // 1 api
    getProducts: async(req, res) => {
        try{
            // res.json('Test get pro');
            // const products = await Products.find()
            // APIfeatures are here
            console.log(req.query) // to check in params { query: 'title' }
            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating();

            const products = await features.query;

            // res.json(products)

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    // 2 api
    createProduct: async(req, res) => {
        try{
            const {product_id, title, price, description, content, images, category} = req.body;
            // image upload
            if(!images)  
            return res.status(400).json({msg: "No image uploaded!"});
            
            // product checking by id validation
            const product = await Products.findOne({product_id});
            if(product) return res.status(400).json({msg: "This product already exists!"});

            //  new product add
            const newProduct = new Products ({
                product_id, title: title.toLowerCase(), price, description,content, images, category
            });
            await newProduct.save();
            // res.json(newProduct); // data seen in postman
            res.json({msg: "New product created!"});

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

     // 2 api
     deleteProduct: async(req, res) => {
        try{
            await Products.findByIdAndDelete(req.params.id);
            res.json({msg: "Deleted a product!"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

     // 2 api
     updateProduct: async(req, res) => {
        try{
            const {title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload!"})

            await Products.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description, content, images, category
            })

            res.json({msg: "Updated a product!"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },


}

module.exports = productCtrl;