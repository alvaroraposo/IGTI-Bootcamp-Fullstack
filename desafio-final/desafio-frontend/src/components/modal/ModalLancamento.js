import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import TipoLancamento from './TipoLancamento'
import css from './style/modallancamento.module.css'
import LabelInput from './LabelInput'
import axios from 'axios';

export default function ModalLancamento(props) {
    const myItem = props.myItem ?? null;
    const today = new Date().toISOString().substr(0,10);
    const {description, value, yearMonthDay = today, type = "-", category, _id} = myItem ?? "";    
    const [state, setState] = useState({_id, description, value, yearMonthDay, type, category});
    const isEditable = (!props.myItem) ? true : false;

    const onSalvarClick = async () => {
        const saveData = async () => {
            const connectionString = (!_id) ? "http://localhost:8081/transaction" : "http://localhost:8081/transaction/" + _id;
            const method = (!_id) ? "post" : "put";
            const response = await axios[method](connectionString, state);
        }    

        await saveData();
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={css.modal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className={css.modalTitle}>
                    Inclusão de Lançamento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="p-0">
                <div className="p-2" style={{border: "1px solid lightgray"}}>
                    <TipoLancamento myType={type} onChangeTipo={(newType) => {setState({...state, type: newType})}} isEditable={isEditable}/>
                    <LabelInput myLabel="Descrição" name="focusedInput" myValue={description} onInputChange={(newDescricao) => {setState({...state, description: newDescricao})}}/>
                    <LabelInput myLabel="Categoria" myValue={category} onInputChange={(newCategoria) => {setState({...state, category: newCategoria})}}/>                    
                    <div className="p-0 row align-items-end">
                        <LabelInput myLabel="Valor" rowCol="col-8" myValue={value} onInputChange={(newValor) => {setState({...state, value: parseInt(newValor)})}}/>                    
                        <div className="pl-1 ml-0 col-4 row justify-content-end">
                            <input type="date" defaultValue={yearMonthDay} onChange={(event) => {setState({...state, yearMonthDay: event.target.value})}}/>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <Button variant="info" onClick={onSalvarClick}>SALVAR</Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>        
    )
}
