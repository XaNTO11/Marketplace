import React, {Component} from 'react';
import { Link } from "@reach/router";

export default class Categories extends Component {

    render() {
        if (!this.props.categories) return <p>Loading...</p>;

        const addBook = () => {
            if (this.props.loggedIn) {
                return <Link to="/category/CreateBook" className="btnText">Add Book</Link>

            }
        };

        let trList = this.props.categories.map(elm =>
            <li key={elm._id}><Link className="list-item" to={"/category/" + elm._id}>{elm.description}</Link></li>
        );

        return (
            <div className="container">
                <h2 className="title is-4">Book categories</h2>
                <ul className="has-background-white-bis">
                    {trList}
                </ul>
                <div className="container">
                    {addBook()}
                </div>
            </div>
        )
    };
}