import React, {Component} from 'react';
import {Link, Router} from "@reach/router";
import {connect} from "react-redux";
import AuthService from "./AuthService";
import Categories from "./Categories";
import AdminPage from "./AdminPage";
import Category from "./Category";
import Book from "./Book";
import Login from "./Login";
import Alert from "./Alert";
import UserHeader from "./UserHeader";
import PostBook from "./PostBook";
import {login, logout, loadCategories, postCategory, hideAlert, postBook, delCat, addUserCredentials} from './actions';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertMsg: "",
            loggedIn: false
        };
    }

    componentDidMount() {
        this.props.loadCategories();
        const API_URL = process.env.REACT_APP_API_URL;
        const auth = new AuthService(`${API_URL}/users/authenticate`);
        this.props.addUserCredentials(auth.getUsername(), auth.getAdmin());

        this.setState({
            loggedIn: auth.loggedIn()
        })
    }

    resetAlert() {
        this.setState({
            alertMsg: "",
            suppressInfo: true
        })
    }


    render() {
        let notification = <></>;
        if (this.props.notifications.active) {
            const notif = this.props.notifications;
            const level = notif.level === "error" ? "is-danger" : "is-warning";

            notification = <section className={`hero ${level} is-small`}>
                <div className="hero-body">
                    <div className="container">
                        <button onClick={() => this.props.hideAlert()} className="delete is-large is-pulled-right" />
                        <h1 className="title">
                            {notif.title}
                        </h1>
                        <h2 className="subtitle">
                            {notif.text}
                        </h2>
                    </div>
                </div>
            </section>
        }

        return (
            <>
                {notification}

                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <Link to="/"><h1 className="title is-2">Book categories</h1></Link>
                            <h2 className="subtitle">
                                Find your book here!
                            </h2>
                        </div>
                    </div>
                </section>

                <UserHeader username={this.props.user.username} admin={this.props.user.admin} logout={_ => this.props.logout()}/>

                <section className="section">
                    <Alert msg={this.state.alertMsg}/>

                    <Router>
                        <Categories path="/"
                                    categories={this.props.categories}
                                    username={this.props.user.username}
                                    loggedIn={this.state.loggedIn}
                        />

                        <AdminPage path="/admin"
                                   categories={this.props.categories}
                                   onDelCat={(id) => this.props.delCat(id)}
                                   onCreateCategory={(category) => this.props.postCategory(category)}
                                   admin={this.props.user.admin}
                        />

                        <Category path="/category/:id"
                                  getCategory={(id) => this.props.categories.find(e => e._id === id)}
                                  // getCategoryKK={(id) => this.props.loadCategoryByID(id)}

                        />

                        <Book path="/category/:id/books/:bid"
                            getBook={(id, bid) => this.props.categories.find(e => e._id === id)?.books.find(x => x._id === bid)}
                        />

                        <PostBook path="/category/CreateBook"
                                  onPostBook={(id, title, author, sellerName, sellerEmail) => this.props.postBook(id, title, author, sellerName, sellerEmail)}
                                  categories={this.props.categories}
                                  username={this.props.user.username}
                        />

                        <Login path="/login"
                            login={(username, password) => this.props.login(username, password)}
                            infoMsg={this.state.infoMsg}
                        />
                    </Router>

                </section>

                <footer className="footer">
                    <div className="container">
                        <div className="content has-text-centered">
                            <p>
                                <strong>Marketplace Site</strong> by Brian
                            </p>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories,
    user: state.user,
    notifications: state.notifications
});

const mapDispatchToProps = dispatch => ({
    // loadCategoryByID: id => dispatch(loadCategoryByID(id)),
    loadCategories: _ => dispatch(loadCategories()),
    postCategory: description => dispatch(postCategory(description)),
    delCat: (id) => dispatch(delCat(id)),
    postBook: (id, title, author, sellerName, sellerEmail) => dispatch(postBook(id, title, author, sellerName, sellerEmail)),
    login: (username, password, admin) => dispatch(login(username, password, admin)),
    logout: _ => dispatch(logout()),
    addUserCredentials: (username, admin) => dispatch(addUserCredentials(username, admin)),
    hideAlert: _ => dispatch(hideAlert())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

