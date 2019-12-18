    import React, {Component} from 'react';
    import {Link} from "@reach/router";

export default class PostBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            catId: "",
            title: "",
            author: "",
            sellerName: "",
            sellerEmail: ""
        };

        // this.handleInput = this.handleInput.bind(this);
        // this.onChange = this.onChange.bind(this);
    }

    // handleButtonClick(event) {
    //     event.preventDefault();
    //     this.props.onPostAnswer(this.props.question._id, this.state.answer);
    //     this.setState({answer: ""})
    // }
    handleButtonClick(event) {
        event.preventDefault(); // Prevents the form button reloading the whole page. We don't do reloads in a SPA.
        this.props.onPostBook(this.state.catId, this.state.title, this.state.author, this.state.sellerName, this.state.sellerEmail); // Add the task to the state in App.js
        console.log(this.state.catId, ": data")
    }

    // handleChange(event) {
    //     this.setState({
    //         answer: event.target.value
    //     });
    // }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // render() {
    //     return (
    //         <form>
    //             <div className="field">
    //                 <label className="label" htmlFor="AnswerInput">Book title</label>
    //                 <div className="control">
    //                     <textarea className="textarea" onChange={this.onChange}
    //                            value={this.state.question}
    //                            placeholder="Answer"
    //                            id="AnswerInput"/>
    //                 </div>
    //             </div>
    //             <div className="field">
    //                 <button className="button is-primary" onClick={this.handleInput} type="submit"
    //                         id="AnswerButton">Give answer
    //                 </button>
    //             </div>
    //         </form>
    //     )
    // };


    render() {
        let dropdown = this.props.categories.map(elm =>
            <option value={elm._id}>{elm.description}</option>
        );

        return (
            <form>
                <div className="field">
                    <label className="label" htmlFor="submitItemBtn">Create Book</label>
                    <div className="control">
                        <label htmlFor="itemText">Categories <br/></label>
                        <select name="catId" onChange={event => this.handleChange(event)}>
                            <option disabled selected value> -- select an option -- </option>
                            {dropdown}
                        </select>
                        <br/>
                        <label htmlFor="itemText">Title <br/></label>
                        <input type="text" className="form-control" name="title"
                               placeholder="title of question"
                               onChange={event => this.handleChange(event)}
                        />
                        <br/>
                        <label htmlFor="itemText">Author<br/></label>
                        <input type="text" className="form-control" name="author"
                               placeholder="title of question"
                               onChange={event => this.handleChange(event)}
                        />
                        <br/>
                        <label htmlFor="itemText">Seller name<br/></label>
                        <input type="text" className="form-control" name="sellerName"
                               placeholder="title of question"
                               onChange={event => this.handleChange(event)}
                        />
                        <br/>
                        <label htmlFor="itemText">Seller email<br/></label>
                        <input type="text" className="form-control" name="sellerEmail"
                               placeholder="title of question"
                               onChange={event => this.handleChange(event)}
                        />
                    </div>
                </div>
                <div className="field">
                    <button onClick={(event) => this.handleButtonClick(event)}
                            type="submit" id="submitItemBtn" className="btn btn-primary">Post answer
                    </button>
                </div>
            </form>
        )
    };
}