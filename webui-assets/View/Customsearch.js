import React from "react";

export default class Customsearch extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            allStateFields: [],
            availableFields: [],
            filteredAvailableFields: [],
            selectedFields: [],
            filteredSelectedFields: [],
            clickedFilteredAvailableFieldIndex: '',
            clickedFilteredSelectedFieldIndex: '',
            whereCondition: [],
            whereOperator: [],
            formDatas: [],
            finalFormDatas: [],
            isFormValid: true,
            isDisableCreateViewButton: false
        };
    }

    /* istanbul ignore next */
    componentDidMount(){
        
        let allStateFields = [...this.props.allFields];
        let selectedFields = [...this.props.selectedFields];

        let whereCondition = [
            {condition: 'AND', label: 'AND'},
            {condition: 'OR', label: 'OR'}
        ];
        let whereOperator = [
            {operator: '=', label: '='},
            {operator: '>', label: '>'},
            {operator: '<', label: '<'},
            {operator: '!=', label: '!='},
        ];
        let formDatas = [
            {
                whereCondition: whereCondition[0].condition,
                whereField: allStateFields[0].fieldId,
                whereOperator: whereOperator[0].operator,
                whereValue: '',
                whereValueError: ''
            }
        ];

        let slicedAvailableFields = allStateFields;
        for(let selectedField of selectedFields){
            slicedAvailableFields = slicedAvailableFields.filter(function( obj ) { // jshint ignore:line
                return obj.fieldId !== selectedField.fieldId;
            });
        }

        this.setState({
            allStateFields: allStateFields,
            availableFields: slicedAvailableFields,
            filteredAvailableFields: slicedAvailableFields,
            selectedFields: selectedFields,
            filteredSelectedFields: selectedFields,
            whereCondition: whereCondition,
            whereOperator: whereOperator,
            formDatas: formDatas
        });
    }

    /* istanbul ignore next */
    handleAvailableFieldSelect(index){
        this.setState({
            clickedFilteredAvailableFieldIndex: index,
            clickedFilteredSelectedFieldIndex: ''
        });
    }

    /* istanbul ignore next */
    handleSelectedFieldSelect(index){
        this.setState({
            clickedFilteredSelectedFieldIndex: index,
            clickedFilteredAvailableFieldIndex: ''
        });
    }

    /* istanbul ignore next */
    filterBy(propName, term){
        const termLowerCase = term.toLowerCase();
        return (singleObj) =>
            Object.keys(singleObj)
                .some(propName => singleObj[propName].toLowerCase().indexOf(termLowerCase) !== -1);
    }

    /* istanbul ignore next */
    removeObject(myArray, key, value){
        for(var i=0 ; i<myArray.length; i++){
            if(myArray[i][key] == value)
                myArray.splice(i, 1);
        }
        return myArray;
    }

    /* istanbul ignore next */
    availableFieldsSerach(e){
        let searchStr = e.target.value.trim();
        let filteredCurrentAvailableFields = [];
        if(searchStr !== ''){
            let currentAvailableFields = [...this.state.availableFields];
            filteredCurrentAvailableFields = currentAvailableFields.filter(this.filterBy('fieldName', searchStr));
        }
        else{
            filteredCurrentAvailableFields =  [...this.state.availableFields];
        }
        this.setState({
            filteredAvailableFields: filteredCurrentAvailableFields,
            clickedFilteredAvailableFieldIndex: ''
        });
    }

    /* istanbul ignore next */
    handleMoveInSelected(){
        let clickedFilteredAvailableFieldIndex = this.state.clickedFilteredAvailableFieldIndex;
        if(clickedFilteredAvailableFieldIndex !== ''){
            let currentAvailableFields = [...this.state.availableFields];
            let filteredAvailableFields = [...this.state.filteredAvailableFields];
            let selectedFields = [...this.state.selectedFields];
            let filteredSelectedFields = [...this.state.filteredSelectedFields];
            let objToMove = filteredAvailableFields[clickedFilteredAvailableFieldIndex];
            let isDisableCreateViewButton = false;
            filteredAvailableFields.splice(clickedFilteredAvailableFieldIndex, 1);
            currentAvailableFields = this.removeObject(currentAvailableFields, 'fieldId', objToMove.fieldId);
            selectedFields.push(objToMove);
            filteredSelectedFields.push(objToMove);
            if(selectedFields.length === 0){
                isDisableCreateViewButton = true;
            }
            this.setState({
                availableFields: currentAvailableFields,
                filteredAvailableFields: filteredAvailableFields,
                selectedFields: selectedFields,
                filteredSelectedFields: filteredSelectedFields,
                clickedFilteredAvailableFieldIndex: '',
                isDisableCreateViewButton: isDisableCreateViewButton
            });
        }
    }

    /* istanbul ignore next */
    selectedFieldsSerach(e){
        let searchStr = e.target.value.trim();
        let filteredCurrentSelectedFields = [];
        if(searchStr !== ''){
            let currentselectedFields = [...this.state.selectedFields];
            filteredCurrentSelectedFields = currentselectedFields.filter(this.filterBy('fieldName', searchStr));
        }
        else{
            filteredCurrentSelectedFields =  [...this.state.selectedFields];
        }
        this.setState({
            filteredSelectedFields: filteredCurrentSelectedFields,
            clickedFilteredSelectedFieldIndex: ''
        });
    }

    /* istanbul ignore next */
    handleMoveInAvailable(){
        let clickedFilteredSelectedFieldIndex = this.state.clickedFilteredSelectedFieldIndex;
        if(clickedFilteredSelectedFieldIndex !== ''){
            let currentSelectedFields = [...this.state.selectedFields];
            let filteredSelectedFields = [...this.state.filteredSelectedFields];
            let availableFields = [...this.state.availableFields];
            let filteredAvailableFields = [...this.state.filteredAvailableFields];
            let objToMove = filteredSelectedFields[clickedFilteredSelectedFieldIndex];
            let isDisableCreateViewButton = false;
            filteredSelectedFields.splice(clickedFilteredSelectedFieldIndex, 1);
            currentSelectedFields = this.removeObject(currentSelectedFields, 'fieldId', objToMove.fieldId);
            availableFields.push(objToMove);
            filteredAvailableFields.push(objToMove);
            if(currentSelectedFields.length === 0){
                isDisableCreateViewButton = true;
            }
            this.setState({
                selectedFields: currentSelectedFields,
                filteredSelectedFields: filteredSelectedFields,
                availableFields: availableFields,
                filteredAvailableFields: filteredAvailableFields,
                clickedFilteredSelectedFieldIndex: '',
                isDisableCreateViewButton: isDisableCreateViewButton
            });
        }
    }

    /* istanbul ignore next */
    addNewFilter(){
        let currentFormRows = [...this.state.formDatas];
        let formNewObject = {
            whereCondition: this.state.whereCondition[0].condition,
            whereField: this.state.allStateFields[0].fieldId,
            whereOperator: this.state.whereOperator[0].operator,
            whereValue: '',
            whereValueError: ''
        };
        currentFormRows.push(formNewObject);

        this.setState({
            formDatas: currentFormRows
        });
        setTimeout(()=>{this.formValidation('inline');}, 500);
    }

    /* istanbul ignore next */
    removeFormRow(formRowIndex){
        let currentFormRows = [...this.state.formDatas];
        currentFormRows.splice(formRowIndex, 1);

        this.setState({
            formDatas: currentFormRows
        });
        setTimeout(()=>{this.formValidation('inline');}, 500);
    }

    /* istanbul ignore next */
    formValidation(type){
        let isFormValid = true;
        let currentFormRows = [...this.state.formDatas];
        
        for(let currentFormRowIndex in currentFormRows){
            let whereValue = currentFormRows[currentFormRowIndex].whereValue.trim();
            if(whereValue === ''){
                if(type !== 'inline')
                    currentFormRows[currentFormRowIndex].whereValueError = 'Please enter value';
                isFormValid = false;
            }
        }

        if(currentFormRows.length === 0){
            isFormValid = false;
        }

        this.setState({
            formDatas: currentFormRows,
            isFormValid: isFormValid
        });
    }

    /* istanbul ignore next */
    changeFormValue(e, formRowIndex){
        let fieldName = e.target.name;
        let updatedFieldValue = e.target.value;
        let currentFormRows = [...this.state.formDatas];
        if(fieldName === 'whereValue'){
            currentFormRows[formRowIndex].whereValue = updatedFieldValue;
            updatedFieldValue = updatedFieldValue.trim();
            if(updatedFieldValue === ''){
                currentFormRows[formRowIndex].whereValueError = 'Please enter value';
            }
            else{
                currentFormRows[formRowIndex].whereValueError = '';
            }
        }
        else if(fieldName === 'whereCondition'){
            currentFormRows[formRowIndex].whereCondition = updatedFieldValue;
        }
        else if(fieldName === 'whereField'){
            currentFormRows[formRowIndex].whereField = updatedFieldValue;
        }
        else if(fieldName === 'whereOperator'){
            currentFormRows[formRowIndex].whereOperator = updatedFieldValue;
        }

        this.setState({
            formDatas: currentFormRows
        });
        this.formValidation('inline');
    }

    /* istanbul ignore next */
    applyFilter(){
        this.setState({
            finalFormDatas: [...this.state.formDatas]
        });
        this.props.showGlobalMessage(false, true, 'Filter applied successfully', 'custom-success');
        let that = this;
        setTimeout(function(){
            that.props.hideGlobalMessage();
            that.props.createView(that.state.selectedFields, that.state.finalFormDatas);
        }, 2000);
    }

    /* istanbul ignore next */
    resetFilter(){
        let formDatas = [
            {
                whereCondition: this.state.whereCondition[0].condition,
                whereField: this.state.allStateFields[0].fieldId,
                whereOperator: this.state.whereOperator[0].operator,
                whereValue: '',
                whereValueError: ''
            }
        ];

        this.setState({
            formDatas: formDatas,
            finalFormDatas: [],
            isFormValid: true
        });
    }

    render(){
        /* jshint ignore:start */
        /* istanbul ignore next */
        return(
            <div className="Customsearch">
                <div className="row">
                    <div className="col-sm-6 vdivide">
                        <div className="centered-div-header">
                            <div className="row view-header">
                                <div className="col-sm-8">
                                    <h6>Search Criteria <small>Search parameters</small></h6>
                                </div>
                                <div className="col-sm-4">
                                    &nbsp;
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="search-form">
                            {this.state.formDatas.map((formData, formRowIndex) => {
                            return(
                            <div key={'form-row'+formRowIndex}>
                                {formRowIndex !== 0 ?
                                    <div className="row mb-2">
                                        <div className="col-sm-3">
                                            <select onChange={(event)=> {this.changeFormValue(event, formRowIndex)}} className="form-control" id={"whereCondition"+formRowIndex} name="whereCondition" value={formData.whereCondition}>
                                                {this.state.whereCondition.map((whereConditionObjet, index) => {
                                                    return (<option key={'whereConditionOption'+formRowIndex+index} value={whereConditionObjet.condition}>{whereConditionObjet.label}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                : null}
                                
                                <div className="row mb-2">
                                    <div className="col-sm-4">
                                        <select onChange={(event)=> {this.changeFormValue(event, formRowIndex)}} value={formData.whereField} className="form-control" id={"whereField"+formRowIndex} name="whereField">
                                            {this.state.allStateFields.map((field, index) => {
                                                return (<option key={"whereFieldOption"+formRowIndex+index} value={field.fieldId}>{field.fieldName}</option>)
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-sm-3">
                                        <select onChange={(event)=> {this.changeFormValue(event, formRowIndex)}} value={formData.whereOperator} className="form-control" id={"whereOperator"+formRowIndex} name="whereOperator">
                                            {this.state.whereOperator.map((whereOperatorObjet, index) => {
                                                return (<option key={"whereOperatorOption"+formRowIndex+index} value={whereOperatorObjet.operator}>{whereOperatorObjet.label}</option>)
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-sm-4">
                                        <input onChange={(event)=> {this.changeFormValue(event, formRowIndex)}} value={formData.whereValue} type="text" className="form-control" name="whereValue" autoComplete="off" />
                                        <small className="text-danger">{ formData.whereValueError != '' ? formData.whereValueError : '' }</small>
                                    </div>
                                    <div className="col-sm-1">
                                        <img onClick={this.removeFormRow.bind(this, formRowIndex)} className="remove-row" alt="remove-row" src="assets/static/images/x_button.svg" />
                                    </div>
                                </div>
                            </div>
                            )
                            })}
                            <div className="row">
                                <div className="col-md-12">
                                    <button onClick={this.addNewFilter.bind(this)} className="btn btn-sm float-left customize-view-btn">ADD FILTER</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="float-right">
                                        {/*<button disabled={!this.state.isFormValid} onClick={this.applyFilter.bind(this)} className="btn btn-sm customize-view-btn">APPLY</button> */}
                                        <button onClick={this.resetFilter.bind(this)} className="btn btn-sm customize-reset-btn ml-2">RESET</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 view-selection-panel">
                        <div className="row">
                            <div className="col-sm-5">
                                <h6><small>AVAILABLE FIELDS</small></h6>
                                <div className="pre-scrollable">
                                    <div className="list-group">
                                        <input type="text" onChange={(event)=> {this.availableFieldsSerach(event)}} className="form-control" placeholder="Search" />
                                        {this.state.filteredAvailableFields.map((availableFieldObj, availableFieldIndex) => {
                                            return(
                                                <a
                                                    onClick={this.handleAvailableFieldSelect.bind(this, availableFieldIndex)}
                                                    key={'availableFieldAnchorKey'+availableFieldIndex} 
                                                    href="#" 
                                                    className={this.state.clickedFilteredAvailableFieldIndex === availableFieldIndex ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>{ availableFieldObj.fieldName }
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 selection-button-div">
                                <img onClick={this.handleMoveInAvailable.bind(this)} className="mx-auto d-block" alt="view-field-selection" src="assets/static/images/leftarrowbutton.svg" />
                                <img onClick={this.handleMoveInSelected.bind(this)} className="mx-auto d-block" alt="view-field-selection" src="assets/static/images/rightarrowbutton.svg" />
                            </div>
                            <div className="col-sm-5">
                                <h6><small>SELECTED FIELDS</small></h6>
                                <div className="pre-scrollable">
                                    <div className="list-group">
                                    <input type="text" onChange={(event)=> {this.selectedFieldsSerach(event)}} className="form-control" placeholder="Search" />
                                        {
                                        this.state.selectedFields.length > 0 ?
                                            this.state.filteredSelectedFields.map((selectedFieldObj, selectedFieldIndex) => {
                                                return(
                                                    <a
                                                        onClick={this.handleSelectedFieldSelect.bind(this, selectedFieldIndex)}
                                                        key={'selectedFieldAnchorKey'+selectedFieldIndex} 
                                                        href="#" 
                                                        className={this.state.clickedFilteredSelectedFieldIndex === selectedFieldIndex ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>{ selectedFieldObj.fieldName }
                                                    </a>
                                                );
                                            }):
                                            <li className="list-group-item list-group-item-danger">Please select fields</li>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button disabled={ !this.state.isFormValid || this.state.isDisableCreateViewButton ? true : false } onClick={this.applyFilter.bind(this)} className="btn btn-sm customize-view-btn">CREATE VIEW</button>
                    </div>
                </div>
            </div>
        )
        /* jshint ignore:end */
    }
}