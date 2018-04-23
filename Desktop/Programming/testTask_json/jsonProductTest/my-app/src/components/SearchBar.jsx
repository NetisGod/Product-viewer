import React, {Component} from 'react'
import PropTypes from 'prop-types';
import * as ReactBootstrap from 'react-bootstrap';


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

        if(this.state.value.length !== 0) {
            document.getElementById(this.props.category).classList.remove('active');
        }

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

    SearchBar.propTypes = {
        onChangeSearch: PropTypes.func,
        goods: PropTypes.array.isRequired,
        category: PropTypes.string.isRequired
    };