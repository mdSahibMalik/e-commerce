class CartItemsModel {
    constructor(userId, productId, quantity, id) {
        this.userId = userId,
            this.productId = productId,
            this.quantity = quantity;
        this._id = id
    }

    static addCartItems(userId, productId, quantity) {
        const cartItem = new CartItemsModel(userId, productId, quantity, cartItems.length + 1);
        cartItems.push(cartItem);
    }
   
    static get(userId) {
        const existData = cartItems.filter(i => i.userId == userId);
        return existData;
    }

    static deleteCartItems(userId, productId){
        const cartItemIndex = cartItems.findIndex(i => i.userId === userId && i.productId === productId);
        if(cartItemIndex === -1){
            return 'UnAuthorized product or not found';
        }else{
            cartItems.splice(cartItemIndex, 1);
            return 'Item removed successfully';
        }
    }


}

let cartItems = [
    { userId: 1, productId: 100, quantity:2, id:1},
    { userId: 2, productId: 101, quantity:3, id:2 },
    { userId: 1, productId: 102, quantity:4, id:3 }
];
module.exports = CartItemsModel;