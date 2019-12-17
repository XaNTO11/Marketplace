import React, {Component} from 'react';
import {Link, Router} from "@reach/router";
import {connect} from "react-redux";

import Categories from "./Categories";
import Category from "./Category";
import Book from "./Book";
import Login from "./Login";
import Alert from "./Alert";
import UserHeader from "./UserHeader";

// import { login, logout, loadQuestions, postQuestion, postAnswer, voteAnswerUp, hideAlert } from './actions';
import {login, logout, loadCategories, postCategory, loadBook, hideAlert, postBook} from './actions';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertMsg: ""
        };
    }

    componentDidMount() {
        this.props.loadCategories();
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

                <UserHeader username={this.props.user.username} logout={_ => this.props.logout()}/>

                <section className="section">
                    <Alert msg={this.state.alertMsg}/>

                    <Router>
                        <Categories path="/"
                                    categories={this.props.categories}
                                   // onAskCategory={(description) => this.props.postCategory(description)}
                        />

                        <Category path="/category/:id"
                                  getCategory={(id) => this.props.categories.find(e => e._id === id)}
                            // handleVote={(id, aid) => this.props.voteAnswerUp(id, aid)}
                            // onPostAnswer={(id, text) => this.props.postAnswer(id, text)}
                        />

                        <Book path="/category/:id/books/:bid"
                              // getCategory={(id) => this.props.categories.find(e => e._id === id)}
                              // getBook={(id, bid) => this.props.loadBook(id, bid)}
                            // getBook={() => this.props.categories.find(e => e._id === id)}
                            //   getBook={(bid) => this.props.categories.filter(function(book){return book.books.find(e => e._id == bid)})}
                            //   getBook={(bid) => this.props.categories.forEach(e => console.log(e.books.find(c => c._id == bid)))}

                        //       getBook={(id, bid) => this.props.categories.forEach( e => {
                        //         if(e._id == id){
                        //             e.books.forEach(d => {
                        //                 if(d._id == bid){
                        //                    console.log(d, "test data")
                        //                    //  return "Hej";
                        //                 }
                        //             })
                        //         }
                        // })}
                        //     getBook={(id, bid) => this.props.categories}
                            getBook={(id, bid) => this.props.categories.find(e => e._id === id)?.books.find(x => x._id === bid)}
                        //     getBook={(id, bid) => console.log(bid)}
                        //     getBook={(id, bid) => this.props.categories}

                            // handleVote={(id, aid) => this.props.voteAnswerUp(id, aid)}
                            // onPostAnswer={(id, text) => this.props.postAnswer(id, text)}
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
                                <strong>QA Site</strong> by Kristian
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
    loadCategories: _ => dispatch(loadCategories()),
    // loadBook: (id, bid) => dispatch(loadBook(id, bid)),
    postCategory: description => dispatch(postCategory(description)),
    // postAnswer: (id, text) => dispatch(postAnswer(id, text)),
    login: (username, password) => dispatch(login(username, password)),
    logout: _ => dispatch(logout()),
    // voteAnswerUp: (questionId, answerId) => dispatch(voteAnswerUp(questionId, answerId)),
    hideAlert: _ => dispatch(hideAlert())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

