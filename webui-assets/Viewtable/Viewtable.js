import React from "react";

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
            <table id="viewTable" className="table">
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
            </table>
        )
        /* jshint ignore:end */
    }

}