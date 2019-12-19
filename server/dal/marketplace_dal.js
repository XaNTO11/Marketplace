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
            }]
        });
        this.marketplaceModel = mongoose.model('marketplace', marketplaceSchema);
    }

    async getCats() {
        try {
            return await this.marketplaceModel.find({});
        } catch (error) {
            console.error("getCats:", error.message);
            return {};
        }
    }

    async getCat(id) {
        try {
            return await this.marketplaceModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async createCat(newCat) {
        let cat = new this.marketplaceModel(newCat);
        console.log(newCat)
        return cat.save();
    }

    async removeCat(id){
        console.log(id, "dette er id")
        return this.marketplaceModel.findOneAndDelete({_id: id});
    }

    async addBook(catId, book) {
        const cat = await this.getCat(catId);
        cat.books.push(book);
        return cat.save();

    }

    async getBookById(catId, bookId) {
        try {
            const cat = await this.getCat(catId);
            const book = cat.books.id(bookId);
            return book;
        } catch (error) {
            console.error("getBookById:", error.message);
            return {};
        }

    }

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

module.exports = (mongoose) => new MarketplaceDAL(mongoose);