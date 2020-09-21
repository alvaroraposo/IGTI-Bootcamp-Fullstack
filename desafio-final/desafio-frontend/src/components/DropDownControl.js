import React from 'react';
import { Button } from 'react-bootstrap';
import DropDownMenu from './DropDownMenu';

export default function DropDownControl(props) {
    
    const isButtonPreviousDisabled = (props.selectedYearMonth === props.myData[0]) ? true : false;
    const isButtonNextDisabled = (props.selectedYearMonth === props.myData[props.myData.length-1]) ? true : false;

    return (
        <div className={`row justify-content-center`}>
            <div className="col-1">
                <Button className="col-12" variant="info" disabled={isButtonPreviousDisabled} onClick={props.onPreviousButtonClick}>&lt;</Button>
            </div>
            <div className="p-0 col-2">
                <DropDownMenu className="p-0 col-12" myData={props.myData} mySelectedItem={props.selectedYearMonth} onChange={props.onChangeYearMonth}/>
            </div>            
            <div className="col-1">
                <Button className="col-12" variant="info" disabled={isButtonNextDisabled} onClick={props.onNextButtonClick}>&gt;</Button>
            </div>
        </div>
    )
}
