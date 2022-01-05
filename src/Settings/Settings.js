import React from "react";
import IconUnderConstruction from '../assets/images/underconstruction.svg';

export default class Settings extends React.Component {
    /* istanbul ignore next */
    render() {
        /* jshint ignore:start */
        return (
            <img className="img-fluid mx-auto d-block" src={IconUnderConstruction} alt="under_construction" />
        )
        /* jshint ignore:end */
    }
}