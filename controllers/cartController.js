const db = require('../models')
const Cart = db.Cart
const CartItem = db.CartItem
const PAGE_LIMIT = 10;
const PAGE_OFFSET = 0;

let cartController = {
  getCart: (req, res) => {
    return Cart.findOne({include: 'items'}).then(cart => {
      let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.CartItem.quantity).reduce((a, b)=>a+b) : 0
      return res.render('cart', {
        cart,
        totalPrice
      })
    })
  },
}

module.exports = cartController