import React, {Component} from 'react';
import PostAnswer from "./PostAnswer";
import {Link} from "@reach/router";

export default class Book extends Component {


    render() {
        // const category = this.props.getCategory(this.props.id);
        let booksContent = <p>loading...</p>;
        const b = this.props.getBook(this.props.id, this.props.bid);

        // console.log(book, "test")
        // this.props.getBook(this.props.id, this.props.bid);
        //     console.log(this.props.getBook(this.props.id, this.props.bid), "Test book")
            //logic





        if (b) {
            booksContent = <Link className="list-item" to={"/category/" + b._id}>
                            <li key={b._id}>
                                <div key={b._id} className="columns">
                                    <div className="column">{b.title}</div>
                                    <div className="column">{b.author}</div>
                                    <div className="column">Seller: {b.sellerName}</div>
                                    <div className="column">{b.sellerEmail}</div>
                                </div>
                            </li>
                        </Link>
           ;
        }

        return (
            <>
                <div className="container">

                    <section className="section has-background-white-bis">
                        <ul>
                            {booksContent}
                        </ul>
                    </section>

                </div>
            </>
        )
    };
}