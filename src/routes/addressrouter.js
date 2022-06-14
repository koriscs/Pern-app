const { Router } = require('express');
const addressRouter = Router();
const controller = require('../controllers/addresscontroller');

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
        res.status(401).json({msg: "You need to login!"})
    }
    
  }

addressRouter.get('/', checkAuthenticated, controller.getAllAddress, (req, res) =>{});
addressRouter.get('/:customer_id',checkAuthenticated, controller.getAddress, (req, res) =>{});
addressRouter.put('/:customer_id',checkAuthenticated, controller.updateAddress, (req, res) =>{});
addressRouter.post('/:customer_id', checkAuthenticated, controller.addAddress, (req, res) =>{});

module.exports = addressRouter;