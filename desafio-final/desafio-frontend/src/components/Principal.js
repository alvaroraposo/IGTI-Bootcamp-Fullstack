import React, { useEffect, useState } from 'react';
import css from './style/principal.module.css'
import Header from './Header';
import DropDownControl from './DropDownControl';
import Sumario from './Sumario';
import Options from './Options';
import GridDay from './GridDay';
import ModalLancamento from './modal/ModalLancamento';
import axios from 'axios';

function Principal() {
  const [showModalLancamento, setShowModalLancamento] = useState(false);
  const [itemModal, setItemModal] = useState(null);
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [byPassUseEffect, setBypPassUseEffect] = useState(true);
  const [selectedYearMonth, setSelectedYearMonth] = useState("");
  const [selectedRawYearMonth, setSelectedRawYearMonth] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get("http://localhost:8081/transaction/periods");

          if(response && response.data) {
              const formattedData = response.data.map((item, index) => {
                  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
                  const splittedItem = item.split("-");
                  return months[index % 12] + "/" + splittedItem[0];
              })
              setData(formattedData);
              setSelectedYearMonth(formattedData[formattedData.length-1]);
              setSelectedRawYearMonth(response.data[response.data.length-1]);
              setRawData(response.data);
          }                
      }

      fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      
      if(!selectedRawYearMonth || selectedRawYearMonth.length <= 0)
        return;
      
      const response = await axios.get(`http://localhost:8081/transaction?yearMonth=${selectedRawYearMonth}`);      
      
      if(response && response.data) {
        setTransactions(response.data);
        setFilteredTransactions(response.data);
      }        
    }

    fetchData();
  }, [selectedRawYearMonth, byPassUseEffect]);

  const onChangeYearMonth = (index) => {
      setSelectedYearMonth(data[index]);
      setSelectedRawYearMonth(rawData[index]);
  }

  const onPreviousButtonClick = () => {
      const index = data.indexOf(selectedYearMonth);

      if(index > 0) {
          setSelectedYearMonth(data[index-1]);
          setSelectedRawYearMonth(rawData[index-1]);
      }
  }

  const onNextButtonClick = () => {
      const index = data.indexOf(selectedYearMonth);

      if(index < data.length) {
          setSelectedYearMonth(data[index+1]);
          setSelectedRawYearMonth(rawData[index+1]);
      }
  }

  const onHideModal = () => {
    setBypPassUseEffect(!byPassUseEffect); 
    setShowModalLancamento(false); 
    setItemModal(null);
  }

  const onRemoverItemButtonClick = (item) => {
    const fetchData = async () => {
      const response = await axios.delete(`http://localhost:8081/transaction/${item._id}`);
      setBypPassUseEffect(!byPassUseEffect);
    }
    
    fetchData();
  }

  const onChangeFilter = (value) => {
    if(!value || value === "")
      setFilteredTransactions(transactions);

    const ft = transactions.reduce((acc, dailyTransactions) => {
      const dailyFilteredTransacitons = dailyTransactions.transactions.filter((transaction) => {
        return (transaction.description.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      })

      if(dailyFilteredTransacitons.length > 0) {
        acc.push({
          day: dailyTransactions.day,
          transactions: dailyFilteredTransacitons
        })
      }
              
      return acc;
    },[]);

    setFilter(value);
    setFilteredTransactions(ft);
  }

  return (
    <div className={css.divPrincipal}>
        <Header/>
        <DropDownControl 
          onChangeYearMonth={onChangeYearMonth} 
          onPreviousButtonClick={onPreviousButtonClick} 
          onNextButtonClick={onNextButtonClick} 
          selectedYearMonth={selectedYearMonth}
          myData={data}/>
        <Sumario myData={filteredTransactions}/>
        <Options filter={filter} onNovoItemButtonClick={() => {setShowModalLancamento(true)}} onChangeFilter={(value) => onChangeFilter(value)}/>
        {
          filteredTransactions.map((item) => {
            return <GridDay myTransactions={item} onEditarItemButtonClick={(item) => {setItemModal(item); setShowModalLancamento(true)}} onRemoverItemButtonClick={onRemoverItemButtonClick}/>
          })
        }        
        <ModalLancamento show={showModalLancamento} onHide={onHideModal} myItem={itemModal}/>
    </div>
  );
}

export default Principal;