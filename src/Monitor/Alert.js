import React from "react";

import IconUnderConstruction from '../assets/images/underconstruction.svg';

export default class Alert extends React.Component {

    /* istanbul ignore next */
    /* constructor(props){
        super(props);
    } */

    /* istanbul ignore next */
    render() {
        /* jshint ignore:start */
        return (
            <div className="Alert">
                <img className="img-fluid mx-auto d-block" src={IconUnderConstruction} alt="under_construction" />
            </div>
        )
        /* jshint ignore:end */
    }
}