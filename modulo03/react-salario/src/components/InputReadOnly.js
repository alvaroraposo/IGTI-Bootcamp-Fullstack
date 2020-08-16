import React, { Component } from 'react';
import css from './inputreadonly.module.css';
import { calculateSalaryFrom } from '../helpers/salary';
import { formatNumber } from '../helpers/formatHelpers';

export default class InputReadOnly extends Component {
    
    render() {
        const fullSalary = this.props.fullSalary;
        const {baseINSS, discountINSS, baseIRPF, discountIRPF, netSalary} = calculateSalaryFrom(parseInt(fullSalary));

        const floatSalary = parseFloat(fullSalary);
        
        const calcPercentualINSS = parseFloat((discountINSS * 100) / floatSalary).toFixed(2);
        const calcPercentualIRPF = parseFloat((discountIRPF * 100) / floatSalary).toFixed(2);
        const calcPercentualSalarioLiquido = parseFloat(100.00 - calcPercentualINSS - calcPercentualIRPF).toFixed(2);

        const percentualSalarioLiquido = (netSalary) ? " (" + calcPercentualSalarioLiquido + "%)" : "(0%)";
        const percentualINSS = (discountINSS) ? " (" + calcPercentualINSS + "%)" : "(0%)";
        const percentualIRPF = (discountIRPF) ? " (" + calcPercentualIRPF + "%)" : "(0%)";

        return (
            <div className={css.divReadOnly}>
                <div className={css.divInput}>
                    <label>Base INSS:</label>
                    <input type="text" disabled={true} placeholder="Digite seu salário bruto" value={formatNumber(baseINSS)}/>
                </div>
                <div className={css.divInput}>
                    <label>Desconto INSS:</label>
                    <input type="text" disabled={true} placeholder="Digite seu salário bruto" value={`${formatNumber(discountINSS)} ${percentualINSS}`}/>
                </div>
                <div className={css.divInput}>
                    <label>Base IRPF:</label>
                    <input type="text" disabled={true} placeholder="Digite seu salário bruto"  value={formatNumber(baseIRPF)}/>
                </div>
                <div className={css.divInput}>
                    <label>Desconto IRPF:</label>
                    <input type="text" disabled={true} placeholder="Digite seu salário bruto"  value={`${formatNumber(discountIRPF)} ${percentualIRPF}`}/>
                </div>
                <div className={css.divInput}>
                    <label>Salário Líquido:</label>
                    <input type="text" disabled={true} placeholder="Digite seu salário bruto"  value={`${formatNumber(netSalary)} ${percentualSalarioLiquido}`}/>
                </div>                
            </div>
        )
    }
}
