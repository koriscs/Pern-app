const { Router } = require('express');
const productRouter = Router();
const controller = require('../controllers/productcontroller');

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
        res.status(401).json({msg: "You need to login!"})
    }
    
  }



productRouter.get('/', controller.getAllProducts ,(req, res) =>{});
productRouter.get('/:productId', controller.getProduct, (req, res) =>{});
productRouter.post('/', controller.addProduct, (req, res) =>{});
productRouter.put('/:productId', checkAuthenticated, controller.updateProduct, (req, res) =>{});
productRouter.delete('/:productId', checkAuthenticated,controller.deleteProduct, (req, res) =>{});

module.exports = productRouter;