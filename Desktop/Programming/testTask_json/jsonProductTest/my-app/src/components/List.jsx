import React, {Component} from 'react';
import CharInfo from '../components/CharInfo';

import {Panel, Image, Grid, Row, Col} from 'react-bootstrap';


class List extends Component {


    render() {
        const goods = this.props.goods;
        let filtered = this.props.filtered;

        if(this.props.goods.length === 0) return <div></div>;



        return (
            <div>

                {

                    goods.map((g) => {
                        return (
                            <Panel key={g.asin} bsStyle='primary'>
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3" className='primary'>{g.name}</Panel.Title>
                                </Panel.Heading>
                                <Grid>
                                    <Row>

                                        <Col md={6}>


                                            <h1 className="char-name"><Image src={g.img} circle width='300px'
                                                                             heigth='300px'/></h1>

                                        </Col>

                                        <Col md={6}>
                                            <Panel.Body>
                                                <CharInfo charInfo={g} filtered={filtered}/>
                                            </Panel.Body>

                                        </Col>

                                    </Row>

                                </Grid>
                            </Panel>
                        )
                    })
                }
            </div>
        );
    }
}

export default List;
