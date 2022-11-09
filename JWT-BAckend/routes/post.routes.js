module.exports = app => {
    const posts = require("../controllers/post.controllers")

    var router = require("express").Router();

    router.post('/', posts.create);
    router.get('/', posts.findAll);
    router.put('/:id', posts.update);
    router.get('/:id', posts.findOne);
    router.delete('/', posts.deleteAll);
    router.delete('/:id', posts.deleteOne);

    
    app.use('/api/post', router)
}