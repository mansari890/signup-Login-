const  router = require('express').Router();
const { ensureAuth } = require('../middleware/Auth.js');  


router.get('/', ensureAuth,(req, res) => {
    res.status((200).json([
        {
            name: "Product 1",
            price: 100,
            description: "This is product 1"
        },
        {
            name: "Product 2",
            price: 200,
            description: "This is product 2"
        },
        {
            name: "Product 3",
            price: 300,
            description: "This is product 3"    
        },

    ]))
});

module.exports = router;