import React, {Component} from 'react';
import PostBook from "./PostBook";
import {Link} from "@reach/router";

export default class Category extends Component {

    render() {
        const category = this.props.getCategory(this.props.id);
        let booksContent = <p>loading...</p>;
        console.log(category, "testMinBamse Cat")
        // const addBook = () => {
        //     if (this.props.username) {
        //        return <PostBook cat={category} onPostBook={this.props.onPostBook}/>
        //     }
        // };

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
                    {category ? <h3>{category.description}</h3> : <p>"loading text..."</p>}
                </section>

                <section className="section has-background-white-bis">
                    <ul>
                        {booksContent}
                    </ul>
                </section>
                    <section className="section has-background-white-bis">
                        {/*{addBook()}*/}
                    </section>

                </div>
            </>
        )
    };
}