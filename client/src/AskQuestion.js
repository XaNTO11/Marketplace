import React, {Component} from 'react';

export default class AskQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: ""
        };
        this.handleInput = this.handleInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.props.onAskCategory(this.state.category);
        this.setState({category: ""})
    }

    onChange(event) {
        this.setState({
            category: event.target.value
        });
    }

    render() {
        return (
            <form>

                <div className="field">
                    <label className="label" htmlFor="QuestionInput">Your question</label>
                    <textarea className="textarea" onChange={this.onChange} name="category"
                           value={this.state.category}
                           placeholder="Category"
                           id="CategoryInput"/>
                </div>
                <div className="field">
                    <button className="button is-primary" onClick={this.handleInput} type="submit"
                            id="categoryButton">Create category
                    </button>
                </div>
            </form>
        )
    };
}