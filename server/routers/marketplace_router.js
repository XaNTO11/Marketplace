module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();

    // router.get('/', (req, res) => {
    //     dal.getQuestions().then(questions => res.json(questions));
    // });

    router.get('/', (req, res) => {
        dal.getCats().then(cats => res.json(cats));
    });

    // router.get('/:id', (req, res) => {
    //     let id = req.params.id;
    //     dal.getQuestion(id).then(question => res.json(question));
    // });

    router.get('/:id', (req, res) => {
        let id = req.params.id;
        dal.getCat(id).then(cat => res.json(cat));
    });

    // router.post('/', (req, res) => {
    //     let newQuestion = {
    //         text : req.body.text,
    //         answers : []
    //     };
    //     dal.createQuestion(newQuestion).then(newQuestion => res.json(newQuestion));
    // });

    router.post('/', (req, res) => {
        let newCat = {
            description : req.body.text,
            books : []
        };
        dal.createCat(newCat).then(newCat => res.json(newCat));
    });

    // router.post('/:id/answers', (req, res) => {
    //     dal.addAnswer(req.params.id, req.body.text).then(updatedQuestion => res.json(updatedQuestion));
    // });

    router.post('/:id/books', (req, res) => {
        dal.addBook(req.params.id, req.body).then(updatedCat => res.json(updatedCat));
    });

    // router.put('/:id/answers/:aid/vote', (req, res) => {
    //     let id = req.params.id;
    //     let aid = req.params.aid;
    //     dal.upvoteAnswer(id, aid).then(updatedQuestion => res.json(updatedQuestion));
    // });

    router.get('/:id/books/:bid', (req, res) => {
        let id = req.params.id;
        let bid = req.params.bid;
        dal.getBookById(id, bid).then(book => res.json(book));
    });

    return router;
};