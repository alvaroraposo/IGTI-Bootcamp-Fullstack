import React from 'react'
import { Dropdown } from 'react-bootstrap';


export default function DropDownMenu(props) {
    const onChangeYearMonth = (index) => {
        props.onChange(index);
    }

    return (
        <>
            <Dropdown className="p-0 col-12">
                <Dropdown.Toggle id="dropdown-basic" variant="info" className="col-12">
                    {props.mySelectedItem}
                </Dropdown.Toggle>

                <Dropdown.Menu className="col-12">
                    {props.myData.map((item,index) => {
                        return <Dropdown.Item key={index} href={`#/action-${index+1}`} onClick={() => onChangeYearMonth(index)} style={{"textAlign": "center"}}>{item}</Dropdown.Item>
                    })}                    
                </Dropdown.Menu>
            </Dropdown>                
        </>
    )
}
