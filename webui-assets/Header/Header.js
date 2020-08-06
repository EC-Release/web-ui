import React from "react";

export default class Header extends React.Component {

    /* istanbul ignore next */
    constructor(props){
        super(props);
    }

    /* istanbul ignore next */ 
    logout(e){
        let cnf = confirm('Are you sure you want to logout?');
        if(cnf){
            localStorage.clear();
            let logOut = window.location.origin+window.location.pathname.replace('/ec','')+'/logout';
            console.log(logOut);
            window.location.href = logOut;
        }
    }

    /* istanbul ignore next */
    render() {
        /* jshint ignore:start */
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
                                <span className="name"> Hello {this.props.profileData.name.split(" ")[1]}!</span>
                            </span>
                            <span>
                                <img src="assets/static/images/user_icon.svg" height="30" />
                            </span>
                            <span className="vl"></span>
                            <span>
                                <img src="assets/static/images/notifications_icon.svg" />
                            </span>
                            <span>
                                <img src="assets/static/images/logout_icon.svg" alt="logout" title="Logout" className="cursor-pointer" onClick={(event)=>{this.logout(event)}} />
                            </span>
                            {this.props.isFullScreenModal ?
                                <span>
                                    <img className="cursor-pointer" alt="minimize-window" src="assets/static/images/minimize.svg" onClick={this.props.medModal.bind(this)} />
                                </span> :
                                <span>
                                    <img className="cursor-pointer" alt="minimize-window" src="assets/static/images/minimize.svg" onClick={this.props.maxMinModal.bind(this)} />
                                </span>
                            }
                            {this.props.isFullScreenModal ?
                                null :
                                <span>
                                    <img className="cursor-pointer" alt="maximize-window" onClick={this.props.fullScreenModal.bind(this)} alt="maximize-window" src="assets/static/images/maximize.svg" />
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </header>
        )
        /* jshint ignore:end */
    }
}