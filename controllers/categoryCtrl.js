const Category = require('../models/categoryModel');
const Products = require('../models/productModel');

const categoryCtrl = {

    // 1
    getCategories: async(req, res) => {
        // res.json('Category test ctrl')
        try{
            const categories = await Category.find()
            res.json(categories)

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    // 2
    createCategory: async(req, res) => {
        try{

            // if user have role =1 --> admin
            // only admin can create, delete, update category
            const {name} = req.body;
            const category = await Category.findOne({name});
            if(category) return res.status(400).json({msg: "This category already exists!"}) 

            // category created by name
            const newCategory = new Category({name});
            await newCategory.save() // save to db
            res.json({msg: "A category created!"})

            res.json('Category create admin accessed by user role=== 1')
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    // 3
    deleteCategory: async(req, res) =>{
        try {
            const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({
                msg: "Please delete all products with a relationship."
            })

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // 4
    updateCategory: async(req, res)=> {
        try{
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})
            res.json({msg: "Update a category!"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

};

module.exports = categoryCtrl;