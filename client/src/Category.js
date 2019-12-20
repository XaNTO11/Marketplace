import React, {Component} from 'react';
import {Link, navigate} from "@reach/router";

export default class Category extends Component {

    render() {
        const category = this.props.getCategory(this.props.id);
        console.log(category)
        let booksContent = "";
        let cats = ""
        if (category) {
            booksContent = category.books ?
                category.books.map(
                    b =>
                        <Link className="list-item" to={`/category/${this.props.id}/books/${b._id}`}>
                        <li key={b._id}>
                            <div key={b._id} className="columns">
                                <div className="column">{b.title}</div>
                            </div>
                        </li>
                        </Link>
                ) : [];
        }

        return (
            <>
                <div className="container">
                <section className="section">
                    {category ? <h3>{category.description}</h3> : ""}
                    {cats}
                </section>

                <section className="section has-background-white-bis">
                    <ul>
                        {booksContent}
                    </ul>
                </section>
                    <section className="section has-background-white-bis">
                    </section>
                </div>
            </>
        )
    };
}