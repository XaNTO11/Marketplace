    import React, {Component} from 'react';
    import {navigate} from "@reach/router";

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
    }
    handleButtonClick(event) {
        event.preventDefault(); // Prevents the form button reloading the whole page. We don't do reloads in a SPA.
        if(this.state.cat == "" ||this.state.title == ""|| this.state.author == "" || this.state.sellerName == "" || this.state.sellerEmail == "" ){
            alert("Please fill out all the input fields")
        }
        else{
            this.props.onPostBook(this.state.catId, this.state.title, this.state.author, this.state.sellerName, this.state.sellerEmail); // Add the task to the state in App.js
            alert(`You just posted a book with the title: ${this.state.title}`)
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        let dropdown = this.props.categories.map(elm =>
            <option value={elm._id}>{elm.description}</option>
        );

      if(this.props.username){
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
                              type="submit" id="submitItemBtn" className="btn btn-primary">Post your book
                      </button>
                  </div>
              </form>
          )
      }
      else{
          navigate("/login", alert("You need to be a user to access this area"))
          return(
          <div>
              Navigating to login page
          </div>
          )
      }
    };
}