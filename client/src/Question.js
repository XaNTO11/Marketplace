import React, {Component} from 'react';
import PostAnswer from "./PostAnswer";
import {Link} from "@reach/router";

export default class Question extends Component {

    render() {
        const category = this.props.getCategory(this.props.id);
        let booksContent = <p>loading...</p>;

        if (category) {
            booksContent = category.books ?
                category.books.map(
                    b =>
                        <Link className="list-item" to={"/category/" + b._id}>
                        <li key={b._id}>
                            <div key={b._id} className="columns">
                                <div className="column">{b.title}</div>
                                <div className="column">{b.author}</div>
                                <div className="column">Seller: {b.sellerName}</div>
                                <div className="column">{b.sellerEmail}</div>
                            </div>
                        </li>
                        </Link>
                ) : [];
        }

        return (
            <>
                <div className="container">
                <section className="section">
                    {category ? <h3>{category.description}</h3> : <p>"loading text..."</p>}
                </section>

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