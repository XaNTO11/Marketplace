import React, { Component } from 'react';
import { Link, navigate } from "@reach/router";
import CreateCategory from "./CreateCategory";

export default class AdminPage extends Component {

    render() {

        if (!this.props.categories) return <p>Loading...</p>;
        
        const categories = this.props.categories;

        let categorieContent = <p>loading...</p>;
        if (categories) {
            categorieContent = categories ?
                categories.map(
                    cats =>
                        <li key={cats._id}>
                            <div key={cats._id} className="columns">
                                <div className="column">
                                    <Link className="list-item" to={"/category/" + cats._id}>{cats.description}</Link>
                                </div>
                                <div className="column is-one-fifth">
                                    <button className="button is-small" onClick={
                                        () => this.props.onDelCat(cats._id)} >remove
                                        </button>
                                </div>
                            </div>
                        </li>
                ) : [];
        }

        return (
            <div className="container">
                <h2 className="title is-4">Book categories</h2>

                <ul className="has-background-white-bis">
                    {categorieContent}
                </ul>
                <div className="container">
                <div className="container"><CreateCategory onCreateCategory={this.props.onCreateCategory} /></div>
                </div>
            </div>
        )
    };
}