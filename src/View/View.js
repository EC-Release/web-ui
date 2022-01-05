import React from "react";
import $ from 'jquery';
import Technicalview from "./Technicalview.js";
import Businessview from "./Businessview.js";
import { event } from "jquery";

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mockTableData: [],
      topologyView: false, // false = Technical view, true = Business view
    };
  }

  /* istanbul ignore next */
  componentDidMount() {

    $.fn.extend({
      treed: function (o) {
        var openedClass = "fa-minus";
        var closedClass = "fa-plus";
  
        if (typeof o !== "undefined") {
          if (typeof o.openedClass !== "undefined") {
            openedClass = o.openedClass;
          }
          if (typeof o.closedClass !== "undefined") {
            closedClass = o.closedClass;
          }
        }
  
        //initialize each of the top levels
        var tree = $(this);
        tree.addClass("tree");
        tree
          .find("li")
          .has("ul")
          .each(function () {
            var branch = $(this); //li with children ul
            branch.prepend("<i class='fa " + closedClass + "'></i>");
            branch.addClass("branch");
            branch.on("click", function (e) {
              if (this === e.target) {
                var icon = $(this).children("i:first");
                icon.toggleClass(openedClass + " " + closedClass);
                $(this).children().children().toggle();
              }
            });
            branch.children().children().toggle();
          });
        //fire event from the dynamically added icon
        tree.find(".branch .indicator").each(function () {
          $(this).on("click", function () {
            $(this).closest("li").click();
          });
        });
        //fire event to open branch if the li contains an anchor instead of text
        tree.find(".branch>a").each(function () {
          $(this).on("click", function (e) {
            $(this).closest("li").click();
            e.preventDefault();
          });
        });
        //fire event to open branch if the li contains a button instead of text
        tree.find(".branch>button").each(function () {
          $(this).on("click", function (e) {
            $(this).closest("li").click();
            e.preventDefault();
          });
        });
      },
    });
  }

  /* istanbul ignore next */
  changeTopologyView() {
    this.setState({
      topologyView: event.target.checked,
    });
  }

  /* istanbul ignore next */
  servedTopologyView() {
    const currentTopologyView = this.state.topologyView;
    if (!currentTopologyView) {
      // Technical view
      return (
        <Technicalview
          authToken={this.props.authToken}
          baseUrl={this.props.baseUrl}
          userId={this.props.userId}
          showGlobalMessage={this.props.showGlobalMessage}
          hideGlobalMessage={this.props.hideGlobalMessage}
          permissions={this.props.permissions}
        />
      ); // jshint ignore:line
    } else {
      // Business view
      return (
        <Businessview
          authToken={this.props.authToken}
          baseUrl={this.props.baseUrl}
          userId={this.props.userId}
          showGlobalMessage={this.props.showGlobalMessage}
          hideGlobalMessage={this.props.hideGlobalMessage}
        />
      ); // jshint ignore:line
    }
  }

  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      <div className="centered-div View">
        <div className="centered-div-header">
          <div className="row view-header">
            <div className="col-sm-8">
              <h6 id="view-header-title">Topology view</h6>
            </div>
            <div className="col-sm-4">
              <div className="row">
                <div className="col-sm-5">
                  <h6>Technical view</h6>
                </div>
                <div className="col-sm-2">
                  <div className="custom-control custom-switch">
                    <input
                      checked={this.state.topologyView}
                      onChange={(event) => this.changeTopologyView(event)}
                      type="checkbox"
                      className="custom-control-input"
                      id="viewComponentChange"
                    />
                    <label
                      className="custom-control-label cursor-pointer"
                      htmlFor="viewComponentChange"
                    >
                      &nbsp;
                    </label>
                  </div>
                </div>
                <div className="col-sm-5">
                  <h6>Business view</h6>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="col-md-12">{this.servedTopologyView()}</div>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
}
