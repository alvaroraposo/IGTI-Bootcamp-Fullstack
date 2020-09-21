import React from 'react'
import css from './style/gridline.module.css'

//verde -  #a7f5e2 vermelho - "#f5b4a7"
/*
const mockItem = {
    description: "Salário",
    value: 4000,
    category: "Receita",
    year: 2019,
    month: 6,
    day: 1,
    yearMonth: "2019-06",
    yearMonthDay: "2019-06-01",
    type: "+"
  }

*/
export default function GridLine(props) {
    const {description, value, day, type, category} = props.myItem;    
    const colorType = (type === '+') ? {background: "#a7f5e2"} : {background: "#f5b4a7"}

    return (
        <div id="divLinha" className={`mb-1 row justify-content-center ${css.divGridLine}`} style={colorType}>
            <div className={`col-1 ${css.divGridLineVerticalMiddle} ${css.divGridLineFontBold}`}>{day}</div>
            <div className="col-8">
                <div className={`${css.divGridLineFontBold}`}>{category}</div>
                <div style={{fontStyle: "italic"}}>{description}</div>
            </div>
            <div className={`col-1 ${css.divGridLineFontBold} ${css.divGridLineAlignEnd} ${css.divGridLineVerticalMiddle}`}>
                <span>R$ {value},00</span>
            </div>
            <div className={`row col-2 ${css.divGridLineAlignEnd} ${css.divGridLineVerticalMiddle}`}>
                <div className="col-6" onClick={() => props.onEditarItemButtonClick(props.myItem)}><i className="fas fa-pencil-alt"></i></div>
                <div className="col-6" onClick={() => props.onRemoverItemButtonClick(props.myItem)}><i className="fas fa-trash-alt"></i></div>
            </div>
        </div>
    )
}
