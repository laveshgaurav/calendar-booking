import React from "react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import axios from "axios";
import SlideComponent from "./SlideComponent";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    data: [],
    slide1: [],
    slide2: [],
    slider: false,
  };

  async componentDidMount() {
    try {
      const resp = await axios.post(
        "https://cors-anywhere.herokuapp.com/http:/quinncareapi-dev.us-east-2.elasticbeanstalk.com/graphhttp://quinncareapi-dev.us-east-2.elasticbeanstalk.com/graph",
        {
          requestobjects: [
            {
              posts: {
                operationtype: "read",
                id: {
                  return: true,
                },
                userid: {
                  searchvalues: ["41329663-5834-11eb-8e6e-3ca82abc3dd4"],
                  return: true,
                },
                iscalendarentry: {
                  searchvalues: ["true"],
                  return: true,
                },
                images: {
                  return: true,
                },
                rating: {
                  return: true,
                },
                text: {
                  return: true,
                },
                privacy: {
                  searchvalues: [18],
                  return: true,
                },
                typeofday: {
                  return: true,
                },

                calendardatetime: {
                  return: true,
                  sort: "descending",
                },
                maxitemcount: "20",
                continuationtoken: null,
              },
            },
          ],
        }
      );
      // console.table(resp.data.responseobjects[0].posts);
      this.setState({
        data: resp.data.responseobjects[0].posts,
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  renderHeader() {
    // const dateFormat = "mmmm yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{this.state.currentMonth.toUTCString().slice(8, 16)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    // const dateFormat = "dddd";
    const days = ["SUN", "MON", "TUE", "WED", "THUS", "FRI", "SAT"];

    // let startDate = startOfWeek(this.state.currentMonth);

    // for (let i = 0; i < 7; i++) {
    //   days.push(
    // <div className="col col-center" key={i}>
    //   {format(addDays(startDate, i), dateFormat)}
    // </div>
    //   );
    // }
    return (
      <div className="days row">
        {days.map((item, i) => (
          <div className="col col-center" key={i}>
            {item}
          </div>
        ))}
      </div>
    );

    // return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
    // let formattedMonth = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        // formattedMonth = format(currentMonth, "m");
        // const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            <div style={{ position: "relative", zIndex: 11 }}>
              {this.state.data.map((item, i) =>
                new Date(item.calendardatetime).getDate() == formattedDate &&
                new Date(item.calendardatetime).getMonth() ==
                  this.state.currentMonth.getMonth() &&
                isSameMonth(day, monthStart) ? (
                  <div
                    key={i}
                    style={{ width: "32px", height: "32px" }}
                    onClick={() => {
                      this.setState({
                        slide1: this.state.data.slice(0, i + 1),
                      });
                      this.setState({
                        slider: true,
                      });
                      this.setState({
                        slide2: this.state.data.slice(
                          i + 1,
                          this.state.data.length + 1
                        ),
                      });
                      console.log(i);
                      // this.setState({ slide: true });
                    }}
                  >
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={item.images[0].imageurl}
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
    });
  };

  render() {
    // console.log(this.state.data);
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        <SlideComponent
          slide1={this.state.slide1}
          slide2={this.state.slide2}
          slide={this.state.slider}
          removeSlide={() => {
            this.setState({ slider: false });
          }}
        />
      </div>
    );
  }
}

export default Calendar;
