import React, {Component} from 'react';
import List from '../components/List'
import axios from 'axios';
import SearchBar from './SearchBar'


import * as ReactBootstrap from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goods: [],
            filteredGoods: [],
            category: 'All_categories',
            per_page: 5,
            pages: Number

        };


        this.getGoods = this.getGoods.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
    }

    getGoods() {
        return axios.get("https://demo9002476.mockable.io")
            .then((response) => {
                this.setState({
                    goods: response.data.products,
                    filteredGoods: response.data.products,
                    pages: Math.ceil(response.data.products.length / this.state.per_page)
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


        this.setState({
            category: target.id,
            filteredGoods: filteredGoods,
            pages: Math.ceil(filteredGoods.length / this.state.per_page)

        });

    }

    handlePaginationClick(event) {

        let current_page = event.target.id;
        let start_offset = current_page * this.state.per_page - this.state.per_page;
        let start_count = current_page * this.state.per_page - this.state.per_page;
        let filteredGoods = this.state.goods;


        (this.state.category === 'All_categories') ? filteredGoods : filteredGoods = filteredGoods.filter(item => {
            return item.bsr_category === this.state.category;
        });

        filteredGoods = filteredGoods.filter((item, index) => {

            if (index >= start_offset && start_count < current_page * this.state.per_page) {
                console.log(start_count++);
                console.log(item.bsr_category);


                return item;
            }
        });
        console.log('curr_page = ' + current_page + " start = " + start_offset + ' count = ' + start_count + ' category =' + this.state.category);
        console.log(filteredGoods);

        this.setState({
            filteredGoods: filteredGoods
        });


    }


    onChangeSearch(searchedResult) {
        this.setState({
            filteredGoods: searchedResult,
            pages: Math.ceil(searchedResult.length / this.state.per_page)
        });
    }



    render() {
        const {goods, filteredGoods} = this.state;

        let categoriesArr = [],
            pagesCount = [];

        goods.map(item => {
            categoriesArr.push(item.bsr_category)
        });

        //count pages
        for (let i = 1; i <= this.state.pages; i++) {
            pagesCount.push(i);
        }


        return (
            <ReactBootstrap.Jumbotron>

                <SearchBar onChangeSearch={this.onChangeSearch} goods={filteredGoods.length ? filteredGoods : goods}/>

                <ReactBootstrap.Pagination>
                    <ReactBootstrap.Pagination.Prev/>

                    {pagesCount.map(item =>
                        <ReactBootstrap.Pagination.Item onClick={this.handlePaginationClick}
                                                        id={item}>{item}</ReactBootstrap.Pagination.Item>
                    )
                    }

                    <ReactBootstrap.Pagination.Next/>
                </ReactBootstrap.Pagination>


                <div className="App" style={{paddingBottom: '40px'}}>


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


                <List goods={filteredGoods.length ? filteredGoods : goods}/>

            </ReactBootstrap.Jumbotron>
        );
    }
}

export default App;
