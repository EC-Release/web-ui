import React from "react";

export default class Treelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: '',

    }
  }

  /* istanbul ignore next */
  componentDidMount() {
    let that = this;

    setTimeout(function () {
      //window.loadTree('treeList');
      if (that.props.treeValue.length > 0) {
        let topParentId = that.props.treeValue[0].id;
        let el = document.getElementById("parentTreeNodeAnchor" + topParentId);
        if (el !== null) {
          el.click();
        }
      }
    }, 2);
  }

  /* istanbul ignore next */
  componentDidUpdate() {
    //console.log(this.props.treeValue);
  }

  handleExpandCollaps (id) {
    let that = this;

    console.log(id);
    that.setState({ expanded: id })
    /*   setTimeout(()=> {
        
    }, 2000); */
    
  }

  

  /* istanbul ignore next */
  handleGenerateTreeList(items, key) {
    if (items.children) {
      /* jshint ignore:start */
      return (
        <li key={items.id}
          className={this.state.expanded === items.id ?  'collapsed': 'expanded' }>
          <a
            id={"parentTreeNodeAnchor" + items.id}
            onClick={this.props.changeTopology.bind(this, items)}
            title={items.title}
            data-toggle="collapse" aria-expanded="true"
            href={"#childTreeNodeAnchor" + items.id}
          >
            &nbsp;
            {items.value}
          </a>
          <ul id={"childTreeNodeAnchor" + items.id}>
            {items.children.map((item, key) => {
              return this.handleGenerateTreeList(item, key);
            })}
          </ul>
        </li>
      );
      /* jshint ignore:end */
    } else {
      /* jshint ignore:start */
      return (
        <li title={items.title} key={items.id}>
          {items.value}
        </li>
      );
      /* jshint ignore:end */
    }
  }

  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
        <ul id="treeList">
          {this.props.treeValue.length > 0 ? (
            this.props.treeValue.map((item, key) => {
              return this.handleGenerateTreeList(item, key);
            })
          ) : (
            <li>No record</li>
          )}
        </ul>
    );
    /* jshint ignore:end */
  }
}
