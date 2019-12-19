module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();

    router.get('/', (req, res) => {
        dal.getCats().then(cats => res.json(cats));

    });

    router.get('/:id', (req, res) => {
        let id = req.params.id;
        dal.getCat(id).then(cat => res.json(cat));
    });

    router.post('/', (req, res) => {
        if(!req.user.admin){
            return res.sendStatus(401);
        }
        let newCat = {
            description : req.body.description,
            books : []
        };
        dal.createCat(newCat).then(newCat => res.json(newCat));
    });

    router.post('/:id/books', (req, res) => {
        console.log(req.body)
        dal.addBook(req.params.id, req.body).then(updatedCat => res.json(updatedCat));
    });

    router.put('/:id', (req, res) => {
        if(!req.user.admin){
            return res.sendStatus(401);
        }
        let id = req.params.id;
        dal.removeCat(id).then(cats => res.json(cats));
    })

    router.get('/:id/books/:bid', (req, res) => {
        let id = req.params.id;
        let bid = req.params.bid;
        dal.getBookById(id, bid).then(book => res.json(book));
    });

    return router;
};