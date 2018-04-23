import React, {Component} from 'react'
import PropTypes from 'prop-types';
import * as ReactBootstrap from 'react-bootstrap';
import Pagination from "./Pagination";
import { Link } from 'react-router-dom'


export default class Categories extends Component{

    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(event) {
        let target = event.target,
            filteredGoods = this.props.goods;


        (target.id === 'All_categories') ? filteredGoods : filteredGoods = filteredGoods.filter(item => {
            return item.bsr_category === target.id;
        });


        target.classList.add('active');

        if(this.props.category  !== target.id){
            document.getElementById(this.props.category).classList.remove('active');

        }

        this.props.onChangeCategory(filteredGoods, target.id, filteredGoods);

    }

    render(){
        const {goods} = this.props;


        let categoriesArr = [];

        goods.map(item => {
            categoriesArr.push(item.bsr_category)
        });

        return(
            <div className="Categories" id='Categories' style={{paddingBottom: '40px'}}>

                <ReactBootstrap.Grid>
                    <ReactBootstrap.Row>

                        <Link to={`/categories/All_categories`}>
                            <ReactBootstrap.Col sm={6} md={4} lg={3}>
                                <button type='button' className='btn btn-warning' onClick={this.handleClick}
                                        id={'All_categories'} style={{width: '180px'}}>All categories
                                </button>

                            </ReactBootstrap.Col>
                        </Link>


                        {categoriesArr.filter((item, index, self) => {
                            return self.indexOf(item) === index
                        }).map(item =>


                            <Link to={`/categories/${item}`}>
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
                            </Link>
                        )}
                    </ReactBootstrap.Row>
                </ReactBootstrap.Grid>

            </div>
        );
    }
}

Pagination.propTypes = {
    onChangeCategory: PropTypes.func,
    category: PropTypes.string,
    goods: PropTypes.array
};