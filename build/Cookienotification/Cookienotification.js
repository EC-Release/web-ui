import React from "react";
import $ from "jquery";

export default class Cookienotification extends React.Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);
    this.state = {
      cookieNotificationKey: "readCookieNotification",
    };
  }

  /* istanbul ignore next */
  componentDidMount() {
    let isReadCookieNotification = this.getCookie(
      this.state.cookieNotificationKey
    );
    if (isReadCookieNotification !== "Y") {
      this.showCookieInfo();
    }
  }

  showCookieInfo() {
    setTimeout(function () {
      $("cookieConsent").fadeIn(200);
    }, 4000);
  }

  hideCookieInfo() {
    $("#cookieConsent").fadeOut(200);
  }

  /* istanbul ignore next */
  readCookieNotification(e) {
    document.cookie = this.state.cookieNotificationKey + "=Y";
    this.hideCookieInfo();
  }

  /* istanbul ignore next */
  readCookieNotificationIgnore() {
    this.hideCookieInfo();
  }

  /* istanbul ignore next */
  getCookie(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return "N";
  }

  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      <div id="cookieConsent">
        <div
          id="closeCookieConsent"
          onClick={(event) => {
            this.readCookieNotificationIgnore(event);
          }}
        >
          x
        </div>
        <div className="row">
          <div className="col-sm-8">
            Enterpise Connect uses cookies to store information on your
            computer. Some are essential to make our site work; others help us
            improve the user experience. By using the site, you consent to the
            placement of these cookies.
          </div>
          <div className="col-sm-4">
            <a
              className="cookieConsentOK"
              onClick={(event) => {
                this.readCookieNotification(event);
              }}
            >
              That's Fine
            </a>
          </div>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
}
