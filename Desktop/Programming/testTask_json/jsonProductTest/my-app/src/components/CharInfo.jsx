import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';



export default class CharInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,

        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

    }

    open() {
        this.setState({expanded: !this.state.expanded})
    }

    close() {
        this.setState({expanded: !this.state.expanded})
    }


    render() {
        let info = this.props.charInfo;


        // if (this.state.expanded) {
        //     return  <ReactBootstrap.Grid className="hidden-md">
        //                 <ReactBootstrap.Row className="show-grid">
        //                     <ReactBootstrap.Button onClick={this.open}>Show info</ReactBootstrap.Button>
        //                 </ReactBootstrap.Row>
        //             </ReactBootstrap.Grid>
        // }



        return(
                <ReactBootstrap.Grid >
                    <ReactBootstrap.Row className="info">
                            {/*<ReactBootstrap.Button  className='hidden-md'>Hide info</ReactBootstrap.Button>*/}
                            <ul className='text-primary' id='list' style={{wordWrap: 'break-word'}}>



                                <li className='{asian}'><span className="text-primary"><ReactBootstrap.Label bsStyle="info">Asin</ReactBootstrap.Label></span>: {info.asin}</li>



                                <li className='bsr_category'><ReactBootstrap.Label bsStyle="info">bsr_category</ReactBootstrap.Label> : {info.bsr_category}</li>
                                <li className='link'><ReactBootstrap.Label bsStyle="info">link</ReactBootstrap.Label>: <a
                                    href={info.link}>{info.link}</a></li>
                                <li className='name'><ReactBootstrap.Label bsStyle="info">name</ReactBootstrap.Label>: {info.name}</li>
                                <li className='price'><ReactBootstrap.Label bsStyle="info">price</ReactBootstrap.Label>: {info.price}</li>
                            </ul>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Grid>



        )
    }
}
