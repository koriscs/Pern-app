const pool = require('../../database');
const queries = require('../queries');

const getAllProducts = (req, res) =>{
    
    console.log(req.user.id);
    pool.query(queries.getAllProducts, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
 
}

const getProduct = (req, res) =>{
    const id = req.params.productId;
    pool.query(queries.getProduct, [id], (error, results) =>{
        if(error) throw error;
        if(!results.rows.length) {
            res.status(404).json({msg: "We cant find a product with this ID!"});
        } else {
            res.status(200).json(results.rows);
        }
    })
}

const addProduct = (req, res) =>{
    const {item_name, description, image_url, price} = req.body;
    if(!item_name || !description || isNaN(price) ) {
        return res.status(400).json({msg: "Pls give all informations correctly!"});
    }

    pool.query(queries.getProductByName, [item_name], (error, results) =>{
        if(error) throw error;
        if(results.rows.length) {
            res.status(409).json({msg:"An item alredy exist with this name! "});
        } else {
            pool.query(queries.addProduct, [item_name, description, image_url, price], (error, results) =>{
                if(error) throw error;
                res.status(200).json({msg: "Product sucessfully added!"});
                
            })
        }
    })

}

const updateProduct =(req, res) =>{
    const id = parseInt(req.params.productId);
    if(!req.user.is_admin && req.user.id !== id) {
        return res.status(401).json({msg: "You are not authorized to get this User's data!"});
    }
    const {item_name, description, image_url, price} = req.body;
    if(!item_name || !description || isNaN(price) ) {
        return res.status(400).json({msg: "Pls give all informations correctly!"});
    }
    pool.query(queries.getProduct, [id], (error, results) =>{
        if(error) throw error;
        if(!results.rows.length) {
            res.status(404).json({msg:"Couldn't find product with this id!"})
        } else {
            pool.query(queries.updateProduct, [id, item_name, description, image_url, price], (error, results) =>{
                if(error) throw error;
                res.status(200).json({msg: "Product sucesfully updated!"});
            })
        }
    })
  
}

const deleteProduct = (req, res) =>{
    const id = parseInt(req.params.productId);
    if(!req.user.is_admin ) {
        return res.status(401).json({msg: "You are not authorized to get this User's data!"});
    }
    pool.query(queries.getProduct, [id], (error, results) =>{
        if(error) throw error;
        if(!results.rows.length) {
            res.status(404).json({msg:"Couldn't find product with this id!"})
        } else {
            pool.query(queries.deleteProduct, [id], (error, results) =>{
                if(error) throw error;
                res.status(200).json({msg: "Product sucesfully deleted!"});
            })
        }
    })
}


module.exports = {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}