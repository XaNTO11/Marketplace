// class QuestionDAL {
class MarketplaceDAL {

    constructor(mongoose) {
        this.mongoose = mongoose;
        const marketplaceSchema = new mongoose.Schema({
            description: String,
            books: [{
                title: String,
                author: String,
                cat: String,
                price: String,
                sellerName: String,
                sellerEmail: String,
                // votes: Number
            }]
        });
        this.marketplaceModel = mongoose.model('marketplace', marketplaceSchema);
    }

    // async getQuestions() {
    //     try {
    //         return await this.questionModel.find({});
    //     } catch (error) {
    //         console.error("getQuestion:", error.message);
    //         return {};
    //     }
    // }
    async getCats() {
        try {
            return await this.marketplaceModel.find({});
        } catch (error) {
            console.error("getCats:", error.message);
            return {};
        }
    }

    // async getQuestion(id) {
    //     try {
    //         return await this.questionModel.findById(id);
    //     } catch (error) {
    //         console.error("getQuestion:", error.message);
    //         return {};
    //     }
    // }
    async getCat(id) {
        try {
            return await this.marketplaceModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    // async createQuestion(newQuestion) {
    //     let question = new this.questionModel(newQuestion);
    //     return question.save();
    // }

    async createCat(newCat) {
        let cat = new this.marketplaceModel(newCat);
        console.log(newCat)
        return cat.save();
    }

    async removeCat(id){
        console.log(id)
        // let d = this.getCat(id)
        // console.log(d)
        return this.marketplaceModel.findOneAndDelete({_id: id});
        // cat.save();
    }
    //
    // async addAnswer(questionId, answer) {
    //     const question = await this.getQuestion(questionId);
    //     question.answers.push({text: answer, votes: 0});
    //     return question.save();
    // }

    async addBook(catId, book) {
        const cat = await this.getCat(catId);
        cat.books.push(book);
        return cat.save();

    }

    // async upvoteAnswer(questionId, answerId) {
    //     const question = await this.getQuestion(questionId);
    //     const answer = question.answers.id(answerId);
    //     answer.votes++;
    //     return question.save();
    // }

    async getBookById(catId, bookId) {
        try {
            const cat = await this.getCat(catId);
            const book = cat.books.id(bookId);
            // answer.votes++;
            return book;
        } catch (error) {
            console.error("getBookById:", error.message);
            return {};
        }

    }

    // async bootstrap(count = 10) {
    //     let l = (await this.getQuestions()).length;
    //     console.log("Category collection size:", l);
    //
    //     if (l === 0) {
    //         let promises = [];
    //
    //         for (let i = 0; i < count; i++) {
    //             let question = new this.questionModel({
    //                 text: 'How does this work?',
    //                 answers: [
    //                     {text: "No idea!", votes: -3},
    //                     {text: "Using async functions!", votes: 2},
    //                     {text: "It's all async but based on promises!", votes: 3},
    //                 ]
    //             });
    //             promises.push(question.save());
    //         }
    //
    //         return Promise.all(promises);
    //     }
    // }
    async bootstrap(count = 2) {
        let l = (await this.getCats()).length;
        console.log("Category collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let cat = new this.marketplaceModel({
                    description: 'Harry Potter',
                    books: [
                        {title: 'Harry potter and the chamber of secrets', author: 'J.K. Rowling', cat: 'Harry Potter', sellerName: "Brian", sellerEmail: "hej@hej.com"},
                        {title: 'Harry potter and the half blood prince', author: 'J.K. Rowling', cat: 'Harry Potter', sellerName: "Brian", sellerEmail: "hej@hej.com"},
                    ]
                });
                promises.push(cat.save());
            }

            return Promise.all(promises);
        }
    }
}

// module.exports = (mongoose) => new QuestionDAL(mongoose);
module.exports = (mongoose) => new MarketplaceDAL(mongoose);