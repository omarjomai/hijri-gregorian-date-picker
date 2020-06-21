import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment-hijri'
import { Manager, Reference, Popper } from 'react-popper'
import onClickOutside from 'react-onclickoutside'
import DayNames from './DayNames.js'
import MonthList from './MonthsList'
import YearsList from './YearsList'
import MonthDaysView from './MonthDaysView'

const HijriCalender = styled.div`
  width: 300px;
  direction: rtl;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #ddd;
  margin-top: 2px;
  font-family: serif;
  box-sizing: unset;
  -webkit-box-sizing: unset;
  font-size: 14px;
  border-radius: 4px;
  color: black !important;
  z-index:1000;
`

const HijriCalenderControls = styled.div`
  direction: rtl;
  text-align: center;
`

const ControlButton = styled.button`
  position: absolute;
  border: 0px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  background-color: #fff;
  :hover {
    color: #888888
  }
  :focus {
    outline: unset
  }
`
const PreviousButton = styled(ControlButton)`

`

const NextButton = styled(ControlButton)`
`
const MonthName = styled.strong`
`

const YearAndMonthList = styled.div`
  margin-top: 10px;
`

class HijriGregorianDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.selectedDate || "",
      selectedDateg: props.selectedDate || "",
      dateFormat: props.dateFormat || 'iYYYY/iMM/iDD',
      dateFormatg:"YYYY/MM/DD",
      currentTime: moment(),
      currentTimeg: moment(),

      calenderShown: false
    };
  }

  componentDidMount() {
    if (this.state.selectedDate) {
      let time=moment(this.state.selectedDate, this.state.dateFormat)
      const selectedDateg = time.format(this.state.dateFormatg)
      this.setState({
        currentTime: moment(this.state.selectedDate, this.state.dateFormat),
        currentTimeg: moment(this.state.selectedDate, this.state.dateFormat),
        selectedDateg

        
       
      })
    }
  }
  componentDidUpdate(prevProps) {
     const { selectedDate: prevSelectedDate } = prevProps;
     const { selectedDate: nextSelectedDate } = this.props;
    if (prevSelectedDate !== nextSelectedDate) {
      let time = this.state.currentTime
      time.iDate(nextSelectedDate)
      const selectedDateg = time.format(this.state.dateFormatg)

       this.setState({ ...this.state, selectedDate: nextSelectedDate,selectedDateg })
     }
  }

  handleClickOutside = evt => {
    this.setState({
      calenderShown: false
    })
  }

  subtractMonth = () => {
    this.setState((prevState) => ({
      currentTime: prevState.currentTime.subtract(1, 'iMonth')
    }));
  }
  subtractMonthg = () => {
    this.setState((prevState) => ({
      currentTimeg: prevState.currentTimeg.subtract(1, 'month')
    }));
  }

  addMonth = () => {
    this.setState((prevState) => ({
      currentTime: prevState.currentTime.add(1, 'iMonth')
    }));
  }
  addMonthg = () => {
    this.setState((prevState) => ({
      currentTimeg: prevState.currentTimeg.add(1, 'month')
    }));
  }

  setSelectedDate = (event) => {
    let time = this.state.currentTime

    time.iDate(parseInt(event.target.value, 10))

    const selectedDate = time.format(this.state.dateFormat)
    const selectedDateg = time.format(this.state.dateFormatg)

    this.setState({
      selectedDate,
      selectedDateg,
      currentTimeg: moment(selectedDate, this.state.dateFormat),
      calenderShown: false
    })
    this.handleChange(selectedDate)
  }
  setSelectedDateg = (event) => {
    let time = this.state.currentTimeg
    time.date(parseInt(event.target.value, 10))
    const selectedDateg = time.format(this.state.dateFormatg)
    const selectedDate = time.format(this.state.dateFormat)
    this.setState({
      selectedDateg,
      selectedDate,
      currentTime: moment(selectedDateg, this.state.dateFormatg),
      calenderShown: false
    })
    this.handleChange(selectedDate)
  }



  getMonthStartDayName = () => {
    let time = this.state.currentTime
    time.startOf('iMonth')
    return time.format('dd')
  }

  handleFocus = (event) => {
    const { onFocus = () => { } } = this.props
    onFocus(event.target.value)
    this.showCalender()
  }

  handleChange = (value) => {
    const { onChange = () => { } } = this.props
    onChange(value)
  }

  showCalender = () => {
    this.setState({
      calenderShown: true
    })
  }

 
 

 
 

  render() {
    const { className, name, placeholder, input, disabled } = this.props;
    return (
      <div >
        <Manager>
          <Reference>
            {({ ref }) => (
             
              <input style={{width:"100%",textAlign:"center"}}  ref={ref} type="text" autoComplete="off" {...{ className, name, placeholder, disabled, ...input }} value={this.state.selectedDate?this.state.selectedDate+" - "+this.state.selectedDateg:""}   onFocus={this.handleFocus} readOnly />
           
            )}
          </Reference>
          
          {this.state.calenderShown &&
           <> 
           <Popper
              placement="bottom"
              modifiers={{
                hide: { enabled: true},
                preventOverflow: { enabled: true, boundariesElement: 'viewport'}, 
              }}
            >
              {({ ref, style, placement, arrowProps }) => (
              <div style={{display: "flex",flexDirection: "row",justifyContent: "center",position: "absolute",  zIndex: 1000,backgroundColor:"transparent"}} data-placement={placement}  ref={ref} > 
             
                  <HijriCalender style={{display: "inline-block"}}  >
                    <HijriCalenderControls >
                      <button className="btn" onClick={this.subtractMonth} type="button" >{'<'}</button>
                      <MonthName> {this.state.currentTime.format('iMMMM') + ' ('+this.state.currentTime.format('iMM')+') ' + this.state.currentTime.format('iYYYY')} </MonthName>
                      <button className="btn" onClick={this.addMonth} type="button" > {'>'} </button>
                      {/* {this.props.quickSelect &&
                        <YearAndMonthList>
                          <YearsList currentTime={this.state.currentTime} onChange={this.handelYearChange}/>
                          <MonthList currentTime={this.state.currentTime} onChange={this.handelMonthChange}/>
                        </YearAndMonthList>
                      } */}
                      
                    </HijriCalenderControls>
                    <DayNames />
                    <MonthDaysView g={false} currentTime={this.state.currentTime} dateFormat={this.state.dateFormat} selectedDate={this.state.selectedDate} setSelectedDate={this.setSelectedDate}/>
                    <div ref={arrowProps.ref} style={arrowProps.style} />
                  </HijriCalender>
               
                 <HijriCalender style={{display: "inline-block"}}  >
                   <HijriCalenderControls>
                     <button className="btn" onClick={this.subtractMonthg} type="button" >{'<'}</button>
                     <MonthName>{this.state.currentTimeg.format('MMMM') + ' ('+this.state.currentTimeg.format('MM')+') ' + this.state.currentTimeg.format('YYYY')}</MonthName>
                     <button className="btn" onClick={this.addMonthg} type="button" > {'>'} </button>
                   
                   </HijriCalenderControls>
                   <DayNames />
                   <MonthDaysView g={true} currentTime={this.state.currentTimeg} dateFormat={this.state.dateFormatg} selectedDate={this.state.selectedDateg} setSelectedDate={this.setSelectedDateg}/>
                   <div ref={arrowProps.ref} style={arrowProps.style} />
                 </HijriCalender>
               
               </div> 
              )}
            </Popper>
            {/* <Popper
              placement="bottom-end"
              modifiers={{
                hide: { enabled: true},
                preventOverflow: { enabled: true, boundariesElement: 'viewport'}, 
              }}
            >
              {({ ref, style, placement, arrowProps }) => (
                <div>
                  <HijriCalender ref={ref} style={style} data-placement={placement}>
                    <HijriCalenderControls>
                      <PreviousButton onClick={this.subtractMonthg} type="button" >{'<'}</PreviousButton>
                      <MonthName>{this.state.currentTimeg.format('MMMM') + ' ('+this.state.currentTimeg.format('MM')+') ' + this.state.currentTimeg.format('YYYY')}</MonthName>
                      <NextButton onClick={this.addMonthg} type="button" > {'>'} </NextButton>
                    
                    </HijriCalenderControls>
                    <DayNames />
                    <MonthDaysView g={true} currentTime={this.state.currentTimeg} dateFormat={this.state.dateFormatg} selectedDate={this.state.selectedDateg} setSelectedDate={this.setSelectedDateg}/>
                    <div ref={arrowProps.ref} style={arrowProps.style} />
                  </HijriCalender>
                </div>
              )}
            </Popper> */}
          
          </>
          }
         
        </Manager>
      </div>
    )
  }
}

export default onClickOutside(HijriGregorianDatePicker);
