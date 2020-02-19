import React from "react";
import ReactDOM from "react-dom";

export default class Header extends React.Component {

    /* istanbul ignore next */
    constructor(props){
        super(props)
    }

    /* istanbul ignore next */
    render() {
        return (
            <header>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-lg-6 ge-logo">
                            <img src="assets/static/images/GE_logo.svg" />
                            <img src="assets/static/images/ec-icon.png" width="150" height="70" />
                        </div>
                        <div className="col-lg-6 header-profile">
                            <span>
                                <span className="name"> Hello Aarav!</span>
                            </span>
                            <span>
                                <img src="assets/static/images/user_icon.svg" height="30" />
                            </span>
                            <span className="vl"></span>
                            <span>
                                <img src="assets/static/images/notifications_icon.svg" />
                            </span>
                            <span>
                                <img src="assets/static/images/logout_icon.svg" />
                            </span>
                            <span>
                                <img className="cursor-pointer" alt="minimize-window" src="assets/static/images/minimize.svg" onClick={this.props.maxMinModal.bind(this)} />
                            </span>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}