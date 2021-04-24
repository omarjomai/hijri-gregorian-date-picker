import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment-hijri";
import { format } from "./timemoment";
import { Manager, Reference, Popper } from "react-popper";
import onClickOutside from "react-onclickoutside";
import DayNames from "./DayNames.js";
import MonthList from "./MonthsList";
import YearsList from "./YearsList";
import MonthDaysView from "./MonthDaysView";

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
  z-index: 1000;
`;

const HijriCalenderControls = styled.div`
  direction: rtl;
  text-align: center;
`;

const ControlButton = styled.button`
  position: absolute;
  border: 0px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  background-color: #fff;
  :hover {
    color: #888888;
  }
  :focus {
    outline: unset;
  }
`;
const PreviousButton = styled(ControlButton)``;

const NextButton = styled(ControlButton)``;
const MonthName = styled.strong``;

const YearAndMonthList = styled.div`
  margin-top: 10px;
`;

class HijriGregorianDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: "",
      selectedDateg: "",
      dateFormat: props.dateFormat || "iYYYY/iMM/iDD",
      dateFormatg: "YYYY/MM/DD",
      currentTime: moment(),
      currentTimeg: moment(),
      time: "00:00",
      calenderShown: false,
      showHijri: true,
    };
  }

  componentDidMount() {
    if (this.props.selectedDate) {
      let time = format(this.props.selectedDate, "YYYY/MM/DD");
      const selectedDateg = format(
        this.props.selectedDate,
        this.state.dateFormatg
      );
      let timeh = moment(selectedDateg, this.state.dateFormatg);
      const selectedDate = timeh.format(this.state.dateFormat);
      const mytime = format(this.props.selectedDate, "HH:mm");
      this.setState({
        currentTime: moment(selectedDateg, this.state.dateFormatg),
        currentTimeg: moment(selectedDateg, this.state.dateFormatg),
        time: mytime,
        selectedDateg,
        selectedDate,
      });
    }
  }
  componentDidUpdate(prevProps) {
    const { selectedDate: prevSelectedDate } = prevProps;
    const { selectedDate: nextSelectedDate } = this.props;
    if (prevSelectedDate !== nextSelectedDate && nextSelectedDate === "") {
      let time = this.state.currentTime;
      time.iDate(nextSelectedDate);
      const selectedDateg = time.format(this.state.dateFormatg);

      this.setState({
        ...this.state,
        selectedDate: nextSelectedDate,
        selectedDateg,
      });
    }
  }

  handleClickOutside = (evt) => {
    this.setState({
      calenderShown: false,
    });
  };

  subtractMonth = () => {
    this.setState((prevState) => {
      let plus = prevState.currentTime.subtract(1, "imonth");
      return {
        currentTime: plus,
      };
    });
  };
  subtractMonthg = () => {
    this.setState((prevState) => {
      let dates = prevState.currentTimeg;
      let plus = dates.subtract(1, "months");
      return {
        currentTimeg: plus,
      };
    });
  };

  addMonth = () => {
    this.setState((prevState) => {
      let plus = prevState.currentTime.add(1, "imonth");
      return {
        currentTime: plus,
      };
    });
  };
  addMonthg = () => {
    this.setState((prevState) => {
      let dates = prevState.currentTimeg;
      let plus = dates.add(1, "months");
      return {
        currentTimeg: plus,
      };
    });
  };

  setSelectedDate = (event) => {
    let time = this.state.currentTime;

    time.iDate(parseInt(event.target.value, 10));

    const selectedDate = time.format(this.state.dateFormat);
    const selectedDateg = time.format(this.state.dateFormatg);

    this.setState({
      selectedDate,
      selectedDateg,
      currentTimeg: moment(selectedDate, this.state.dateFormat),
      calenderShown: false,
    });

    if (this.props.withtime) {
      this.handleChange(selectedDateg + " " + this.state.time);
    } else this.handleChange(selectedDateg);
  };
  setSelectedDateg = (event) => {
    let time = this.state.currentTimeg;
    time.date(parseInt(event.target.value, 10));
    const selectedDateg = time.format(this.state.dateFormatg);
    const selectedDate = time.format(this.state.dateFormat);
    this.setState({
      selectedDateg,
      selectedDate,
      currentTime: moment(selectedDateg, this.state.dateFormatg),
      calenderShown: false,
    });
    if (this.props.withtime) {
      this.handleChange(selectedDateg + " " + this.state.time);
    } else this.handleChange(selectedDateg);
  };

  getMonthStartDayName = () => {
    let time = this.state.currentTime;
    time.startOf("iMonth");
    return time.format("dd");
  };

  handleFocus = (event) => {
    const { onFocus = () => {} } = this.props;
    onFocus(event.target.value);
    this.showCalender();
  };

  handleChange = (value) => {
    const { onChange = () => {} } = this.props;
    onChange(value);
  };

  showCalender = () => {
    this.setState({
      calenderShown: true,
    });
  };

  selectTime = (e) => {
    this.handleChange(this.state.selectedDateg + " " + e.target.value);
    this.setState({ time: e.target.value });
  };

  render() {
    const {
      className,
      name,
      placeholder,
      input,
      disabled,
      style,
      styletime,
      sbuttonstyle,
      sbuttontext,
      sbuttonclass,
      background = "#fff",
      selectedbackground = "#fff",
      styleInput = { textAlign: "center" },
    } = this.props;

    return (
      <div>
        <Manager>
          <Reference>
            {({ ref }) => (
              <div style={{ display: "flex", ...style }}>
                <input
                  style={{
                    ...style,
                    ...styleInput,
                    backgroundColor: this.state.calenderShown
                      ? background
                      : selectedbackground,
                  }}
                  ref={ref}
                  type="text"
                  autoComplete="off"
                  {...{ className, name, placeholder, disabled, ...input }}
                  value={
                    this.state.selectedDate
                      ? this.state.showHijri
                        ? this.state.selectedDate
                        : this.state.selectedDateg
                      : ""
                  }
                  onFocus={this.handleFocus}
                  readOnly
                />{" "}
                {this.props.withtime ? (
                  <input
                    style={styletime}
                    value={this.state.time}
                    onChange={this.selectTime}
                    type="time"
                  />
                ) : null}{" "}
              </div>
            )}
          </Reference>

          {this.state.calenderShown && (
            <>
              <Popper
                placement="bottom"
                modifiers={{
                  hide: { enabled: true },
                  preventOverflow: {
                    enabled: true,
                    boundariesElement: "viewport",
                  },
                }}
              >
                {({ ref, style, placement, arrowProps }) => (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 1000,
                      display: "flex",
                      flexDirection: "column",
                    }}
                    data-placement={placement}
                    ref={ref}
                  >
                    {this.state.showHijri ? (
                      <HijriCalender style={{ display: "inline-block" }}>
                        <HijriCalenderControls>
                          <button
                            className="btn"
                            onClick={this.subtractMonth}
                            type="button"
                          >
                            {"<"}
                          </button>
                          <MonthName>
                            {" "}
                            {this.state.currentTime.format("iMMMM") +
                              " (" +
                              this.state.currentTime.format("iMM") +
                              ") " +
                              this.state.currentTime.format("iYYYY")}{" "}
                          </MonthName>
                          <button
                            className="btn"
                            onClick={this.addMonth}
                            type="button"
                          >
                            {" "}
                            {">"}{" "}
                          </button>
                        </HijriCalenderControls>
                        <DayNames />
                        <MonthDaysView
                          g={false}
                          currentTime={this.state.currentTime}
                          dateFormat={this.state.dateFormat}
                          selectedDate={this.state.selectedDate}
                          setSelectedDate={this.setSelectedDate}
                        />
                        <div ref={arrowProps.ref} style={arrowProps.style} />
                      </HijriCalender>
                    ) : (
                      <HijriCalender style={{ display: "inline-block" }}>
                        <HijriCalenderControls>
                          <button
                            className="btn"
                            onClick={this.subtractMonthg}
                            type="button"
                          >
                            {"<"}
                          </button>
                          <MonthName>
                            {this.state.currentTimeg.format("MMMM") +
                              " (" +
                              this.state.currentTimeg.format("MM") +
                              ") " +
                              this.state.currentTimeg.format("YYYY")}
                          </MonthName>
                          <button
                            className="btn"
                            onClick={this.addMonthg}
                            type="button"
                          >
                            {" "}
                            {">"}{" "}
                          </button>
                        </HijriCalenderControls>
                        <DayNames />
                        <MonthDaysView
                          g={true}
                          currentTime={this.state.currentTimeg}
                          dateFormat={this.state.dateFormatg}
                          selectedDate={this.state.selectedDateg}
                          setSelectedDate={this.setSelectedDateg}
                        />
                        <div ref={arrowProps.ref} style={arrowProps.style} />
                      </HijriCalender>
                    )}
                    <button
                      style={sbuttonstyle}
                      className={sbuttonclass}
                      onClick={() => {
                        this.setState((state, props) => {
                          return { showHijri: !state.showHijri };
                        });
                      }}
                    >
                      {sbuttontext ? sbuttontext : "hijri/georgian"}
                    </button>
                  </div>
                )}
              </Popper>
            </>
          )}
        </Manager>
      </div>
    );
  }
}

export default onClickOutside(HijriGregorianDatePicker);
