import React from "react";
import Healthstatus from "../Monitor/Healthstatus.js";

export default class Viewtable extends React.Component {
    /* istanbul ignore next */
    componentDidMount(){
        window.initTable('viewTable');
    }

    /* istanbul ignore next */
    componentDidUpdate(){
        //window.initTable('viewTable');
    }

    render(){
        /* jshint ignore:start */
        /* istanbul ignore next */
        return(/* istanbul ignore next */
          /*  <table id="viewTable" className="table">
                <thead>
                    <tr>
                        {this.props.tableData.thead.map((val, index) => {
                            return(<th key={'viewTableThead_'+index}>{ val.fieldName }</th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.tableData.tbody.map((tbodyVal, tbodyIndex) => {
                        return(
                            <tr key={'viewTableTbodyTr_'+tbodyIndex}>
                                {this.props.tableData.thead.map((val, tdIndex) => {
                                    return(
                                        <td key={'viewTableTbodyTd_'+tdIndex}>
                                            { tbodyVal[tdIndex].value } &nbsp;&nbsp;
                                            {
                                                tbodyVal[tdIndex].hiddenValue && tbodyVal[tdIndex].hiddenValue != '' && tbodyVal[tdIndex].hiddenState ?
                                                    <img onClick={this.props.showHideTableTdData.bind(this, tbodyIndex, tdIndex)} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" />:
                                                    null
                                            }
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>*/
        <table className="table ">
          <thead>
            <tr>
              {this.props.tableData.thead.map((val, index) => {
                return <th key={"viewTableThead_" + index}>{val.fieldName}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.tableData.tbody.map((tbodyVal, tbodyIndex) => {
              return (
                <React.Fragment key={"viewTableTbodyTr_" + tbodyIndex}>
                  <tr
                    data-toggle="collapse"
                    data-target={"#collapseme" + tbodyIndex}
                    role="row"
                    className="parent-row"
                  >
                    {this.props.tableData.thead.map((val, tdIndex) => {
                      return (
                        <td key={"viewTableTbodyTd_" + tdIndex}>
                          {}
                          {tbodyVal[tdIndex].value} &nbsp;&nbsp;
                          {tbodyVal[tdIndex].hiddenValue &&
                          tbodyVal[tdIndex].hiddenValue != "" &&
                          tbodyVal[tdIndex].hiddenState ? (
                            <img
                              onClick={this.props.showHideTableTdData.bind(
                                this,
                                tbodyIndex,
                                tdIndex
                              )}
                              className="icon-arrowmore"
                              alt="td-detail"
                              src="assets/static/images/icon_arrowmore.svg"
                            />
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                  <tr id={"collapseme" + tbodyIndex} className="collapse out">
                    <td colSpan="8">
                      <div>
                        <Healthstatus
                          userId={this.props.userId}
                          showGlobalMessage={this.props.showGlobalMessage.bind(
                            this
                          )}
                          hideGlobalMessage={this.props.hideGlobalMessage.bind(
                            this
                          )}
                          tableindx={tbodyIndex}
                          permissions={this.props.permissions}
                        />
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        )
        /* jshint ignore:end */
    }

}
