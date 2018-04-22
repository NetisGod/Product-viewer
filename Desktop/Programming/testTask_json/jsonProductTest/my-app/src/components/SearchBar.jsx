import React, {Component} from 'react'
import * as ReactBootstrap from 'react-bootstrap';
import $ from 'jquery'


export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };


        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        this.setState({value: e.target.value});

        let searchedResult = this.searcher(e.target.value);
        this.props.onChangeSearch(searchedResult);
    }


    searcher(toLook) {

        let foundGoods = this.props.goods.filter(item => {

            if (item.name.toLowerCase().indexOf(toLook.toLowerCase()) !== -1) {
                return item;
            }
        });


        return foundGoods;
    }


    render() {


        return (

            <ReactBootstrap.FormGroup >

                <ReactBootstrap.FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Input product..."
                    onChange={this.handleChange}
                />

            </ReactBootstrap.FormGroup>

        )

    }

}