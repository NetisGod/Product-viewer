import React, {Component} from 'react'
import PropTypes from 'prop-types';
import * as ReactBootstrap from 'react-bootstrap';


export default class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            per_page: 5
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }


    handlePaginationClick(event) {

        let current_page = event.target.id || 1;
        let start_offset = current_page * this.state.per_page - this.state.per_page;
        let start_count = current_page * this.state.per_page - this.state.per_page;
        let filteredGoods = this.props.categoryGoods;

        (this.props.category === 'All_categories') ? filteredGoods : filteredGoods = filteredGoods.filter(item => {
            return item.bsr_category === this.props.category;
        });



        filteredGoods = filteredGoods.filter((item, index) => {

            if (index >= start_offset && start_count < current_page * this.state.per_page) {
                start_count++;
                return item;
            }
        });


        this.props.onPagination(filteredGoods);
    }


    render() {

        const {per_page} = this.state;
        const {categoryGoods} = this.props;


        //count pages
        let pagesCount = [];

        for (let i = 1; i <= Math.ceil(categoryGoods.length / per_page); i++) {
            pagesCount.push(i);
        }



        return (
            <div className="Pagination">
                <ReactBootstrap.Pagination>
                    <ReactBootstrap.Pagination.Prev/>

                    {pagesCount.map(item =>
                        <ReactBootstrap.Pagination.Item onClick={this.handlePaginationClick}
                                                        id={item} key={item}>{item}</ReactBootstrap.Pagination.Item>
                    )
                    }

                    <ReactBootstrap.Pagination.Next/>
                </ReactBootstrap.Pagination>


            </div>
        );
    }
}

   Pagination.propTypes = {
       categoryGoods: PropTypes.array.isRequired,
       category: PropTypes.string
   };

