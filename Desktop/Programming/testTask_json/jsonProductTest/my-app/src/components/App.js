import React, {Component} from 'react';
import List from '../components/List'
import axios from 'axios';
import SearchBar from './SearchBar'
import Pagination from './Pagination'
import Categories from './Categories'

import * as ReactBootstrap from 'react-bootstrap';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goods: [],
            filteredGoods: [],
            category: 'All_categories',
            categoryGoods: []
        };


        this.getGoods = this.getGoods.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onPagination = this.onPagination.bind(this);

    }

    getGoods() {
        return axios.get("https://demo9002476.mockable.io")
            .then((response) => {
                this.setState({
                    goods: response.data.products,
                    categoryGoods: response.data.products,
                    filteredGoods: response.data.products
                })
            })
    }

    componentDidMount() {
        this.getGoods();

    }

    onChangeCategory(filteredGoods, category, categoryGoods) {
        this.setState({
            category: category,
            filteredGoods: filteredGoods,
            categoryGoods: categoryGoods
        })
    }

    onChangeSearch(searchedResult) {
        this.setState({
            filteredGoods: searchedResult,
            categoryGoods: searchedResult
        });
    }

    onPagination(filteredGoods) {
        this.setState({
            filteredGoods: filteredGoods
        });
    }

    render() {
        const {goods, filteredGoods, category, categoryGoods} = this.state;

        return (
            <ReactBootstrap.Jumbotron>

                <SearchBar onChangeSearch={this.onChangeSearch} goods={goods} category={category}/>

                <Pagination onPagination={this.onPagination} categoryGoods={categoryGoods}
                            category={category}/>

                <Categories onChangeCategory={this.onChangeCategory} goods={goods} category={category}/>

                <List goods={filteredGoods}/>

            </ReactBootstrap.Jumbotron>
        );
    }
}