import React from "react";

export default class FloaterHelp extends React.Component {
  /* jshint ignore:start */
  render() {
    return (
      <div className="helpGuide">
        <a class="float" id="menu-share">
          <i class="fa fa-share my-float"></i>
        </a>
        <ul>
          <li>
            <a
              href="mailto:dt.dive@ge.com?Subject=Regarding-%20Transaction%20Replay%20Framework"
              target="_top"
              title="Write to us?"
            >
              <i class="fa fa-newspaper-o my-float"> </i>
            </a>
          </li>
          <li>
            <a href="#/help-guide" target="_blank" title="Need help?">
              <i class="fa fa-exclamation-circle my-float"></i>
            </a>
          </li>
          <li>
            <a href="#/bug-page" target="_blank" title="Report a bug?">
              <i class="fa fa-bug my-float"> </i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
