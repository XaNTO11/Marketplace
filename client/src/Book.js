import React, {Component} from 'react';
import PostBook from "./PostBook";
import {Link} from "@reach/router";

export default class Book extends Component {


    render() {
        let booksContent = <p>loading...</p>;
        const b = this.props.getBook(this.props.id, this.props.bid);
        if (b) {
            booksContent =
                            <li key={b._id}>
                                <div key={b._id} className="columns">
                                    <div className="column">{b.title}</div>
                                    <div className="column">{b.author}</div>
                                    <div className="column">Seller: {b.sellerName}</div>
                                    <div className="column">{b.sellerEmail}</div>
                                </div>
                            </li>;
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