import React from 'react'
import styled from 'styled-components'

const MonthDays = styled.div`
  text-align: right;
  display: flex;
  flex-flow: wrap;
`

const MonthDay = styled.div`
  margin: 2px;
  width: 30px;
  padding: 1px;
  border: 1px solid #fff;
  text-align: center;
  -webkit-box-sizing: unset !important;
  box-sizing: unset;
  border-radius: 4px;
  :hover {
    ${props => props.noHover? '' : "border: 1px solid black"};
  };
`

const MonthDayButton = styled.button`
  cursor: pointer;
  border: 0px;
  width: 30px;
  padding: 5px;
  font-size: 14px
  :focus {
    outline: unset;
  }
  border-radius: 4px;
  background-color: ${props => props.selected ? "black;" : "white;"};
  color: ${props => props.selected ? "white;" : ""};
  
`

class MonthDaysView extends React.Component {
  
  state = {
    englishDayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  }
  
  getMonthStartDayName = () => {
    let time = this.props.currentTime
    if(!this.props.g)
    time.startOf('iMonth')
    else
    time.startOf('month')
    return time.format('dd') 
  }

  monthDays = () => {
    if(!this.props.g)
    return this.props.currentTime.iDaysInMonth()
    else
    return this.props.currentTime.daysInMonth()
  }

  isSelectedDate = (i) => {
    let time = this.props.currentTime
    if(!this.props.g)
    time.iDate(parseInt(i, 10))
    else
    time.date(parseInt(i, 10))
    
    return this.props.selectedDate === time.format(this.props.dateFormat)
  }

  render(){
      let daysList = []
      for (let i = this.state.englishDayNames.indexOf(this.getMonthStartDayName()); i > 0; i--){
        daysList.push(
          <MonthDay key={daysList.length.toString()} noHover></MonthDay>
        )
      }
      for (let i = 1; i < this.monthDays() + 1; i++) {
        daysList.push(
          <MonthDay selected={this.isSelectedDate(i)} key={daysList.length.toString()}>
            <MonthDayButton selected={this.isSelectedDate(i)} onClick={this.props.setSelectedDate} value={i} type="button">{i}</MonthDayButton>
          </MonthDay>
        )
      }
      
      return <MonthDays>
      {
        daysList
      }
    </MonthDays>;
  }
}

export default MonthDaysView