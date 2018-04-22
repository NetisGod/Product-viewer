import React, {Component} from 'react';
import List from '../components/List'
import axios from 'axios';
import SearchBar from './SearchBar'
import Pagination from './Pagination'


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
        this.handleClick = this.handleClick.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onPagination = this.onPagination.bind(this);

    }

    getGoods() {
        return axios.get("https://demo9002476.mockable.io")
            .then((response) => {
                this.setState({
                    goods: response.data.products,
                    filteredGoods: response.data.products,
                    categoryGoods: response.data.products
                })
            })
    }

    componentDidMount() {
        this.getGoods()
    }


    handleClick(event) {
        let target = event.target,
            filteredGoods = this.state.goods;


        (target.id === 'All_categories') ? filteredGoods : filteredGoods = filteredGoods.filter(item => {
            return item.bsr_category === target.id;
        });


        target.classList.add('active');

        if(this.state.category  !== target.id){
            document.getElementById(this.state.category).classList.remove('active');

        }

        this.setState({
            category: target.id,
            filteredGoods: filteredGoods,
            categoryGoods: filteredGoods
        });

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

        let categoriesArr = [];

        goods.map(item => {
            categoriesArr.push(item.bsr_category)
        });

        return (
            <ReactBootstrap.Jumbotron>

                <SearchBar onChangeSearch={this.onChangeSearch} goods={goods}/>

                <Pagination onPagination={this.onPagination} categoryGoods={categoryGoods}
                            goods={filteredGoods.length ? filteredGoods : goods} category={category}/>

                <div className="Categories" id='Categories' style={{paddingBottom: '40px'}}>

                    <ReactBootstrap.Grid>
                        <ReactBootstrap.Row>


                            <ReactBootstrap.Col sm={6} md={4} lg={3}>
                                <button type='button' className='btn btn-warning' onClick={this.handleClick}
                                        id={'All_categories'} style={{width: '180px'}}>All categories
                                </button>

                            </ReactBootstrap.Col>


                            {categoriesArr.filter((item, index, self) => {
                                return self.indexOf(item) === index
                            }).map(item =>


                                <ReactBootstrap.Col sm={6} md={4} lg={3} key={item}>
                                    <button
                                        type="button"
                                        style={{width: '180px'}}
                                        className="btn btn-primary btn-sm"
                                        onClick={this.handleClick}
                                        id={item}>
                                        {item}
                                    </button>
                                </ReactBootstrap.Col>
                            )}
                        </ReactBootstrap.Row>
                    </ReactBootstrap.Grid>

                </div>

                <List goods={filteredGoods}/>

            </ReactBootstrap.Jumbotron>
        );
    }
}