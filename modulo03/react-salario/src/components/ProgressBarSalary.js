import React, { Component } from 'react';
import css from './progressbarsalary.module.css';
import { calculateSalaryFrom } from '../helpers/salary';

export default class ProgressBarSalary extends Component {   
    render() {
        const fullSalary = this.props.fullSalary;
        const {baseINSS, discountINSS, baseIRPF, discountIRPF, netSalary} = calculateSalaryFrom(parseInt(fullSalary));

        const floatSalary = parseFloat(fullSalary);        
        const percentualINSS = (discountINSS * 100) / floatSalary;
        const percentualIRPF = (discountIRPF * 100) / floatSalary;
        const percentualSalarioLiquido = 100.00 - percentualINSS - percentualIRPF;

        const salarioLiquidoWidth = (percentualSalarioLiquido) ? percentualSalarioLiquido +  "%" : "100%";
        const percentualINSSWidth = (percentualINSS) ? percentualINSS + "%" : "0";
        const percentualIRPFWidth = (percentualIRPF) ? percentualIRPF + "%" : "0";

        return (
            <div className={css.progressBarMainDiv}>
                <div className={css.inssBar} style={{width: percentualINSSWidth}}>a</div>
                <div className={css.irpfBar} style={{width: percentualIRPFWidth}}>a</div>
                <div className={css.salarioLiquidoBar} style={{width: salarioLiquidoWidth}}>a</div>
            </div>
        )
    }
}
