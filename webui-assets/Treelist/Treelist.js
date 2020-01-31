import React from "react";
import ReactDOM from "react-dom";

export default class Treelist extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let that = this;
        setTimeout(function(){
            window.loadTree('treeList');
            if(that.props.treeValue.length > 0){
                let topParentId = that.props.treeValue[0].id;
                let el = document.getElementById('parentTreeNodeAnchor'+topParentId);
                if(el !== null){
                    el.click();
                }
            }
        }, 2);
    }

    componentDidUpdate(){
        //console.log(this.props.treeValue);
    }

    handleGenerateTreeList(items, key){
        if(items.children){
            return(
                <li key={'parentTreeNode'+items.id}>
                    <a href="#" id={'parentTreeNodeAnchor'+items.id} onClick={this.props.changeTopology.bind(this, items)}>
                        &nbsp;
                        { items.value }
                    </a>
                    <ul>
                        {items.children.map((item, key) =>{
                            return (this.handleGenerateTreeList(item, key));
                        })}
                    </ul>
                </li>
            )
        }
        else{
            return (
                <li key={'terminalTreeNode'+items.id}>{ items.value }</li>
            )
        }
    }

    render() {
        return (
            <ul id="treeList">
                {this.props.treeValue.length > 0 ?
                    this.props.treeValue.map((item, key) =>{
                        return (
                            this.handleGenerateTreeList(item, key)
                        );
                    }) :
                    <li>No record</li>
                }
            </ul>
        )
    }
}