import React from "react";
// import logo from "./logo.svg";
import "../App.css";
import { render } from "react-dom";

import "antd/dist/antd.css";

import Chart from "./chart";

import {
  Layout,
  Button,
  PageHeader,
  Row,
  Col,
  Typography,
  Space,
  Card,
  DatePicker,
  Alert,
} from "antd";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

class RealtimeMode extends React.Component {
  state = {
    ultraChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "Ultrasonic Distance Value",
          backgroundColor: "rgba(201, 201, 238, 0.3)",
          // borderColor: "#92A098",
          // pointBackgroundColor: "#E5D0AB",
          // pointBorderColor: "#E5D0AB",
          borderWidth: "2",
          lineTension: 0.45,
          data: [],
        },
      ],
    },
    accChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "Acc. X-Axis Value",
          backgroundColor: "rgba(124, 234, 156, 0.3)",
          // borderColor: "#92A098",
          // pointBackgroundColor: "#E5D0AB",
          // pointBorderColor: "#E5D0AB",
          borderWidth: "2",
          lineTension: 0.45,
          data: [],
        },
        {
          type: "line",
          label: "Acc. Y-Axis Value",
          backgroundColor: "rgba(255, 192, 159, 0.3)",
          // borderColor: "#92A098",
          // pointBackgroundColor: "#E5D0AB",
          // pointBorderColor: "#E5D0AB",
          borderWidth: "2",
          lineTension: 0.45,
          data: [],
        },
        {
          type: "line",
          label: "Acc. Z-Axis Value",
          backgroundColor: "rgba(220, 127, 155, 0.3)",
          // borderColor: "#92A098",
          // pointBackgroundColor: "#E5D0AB",
          // pointBorderColor: "#E5D0AB",
          borderWidth: "2",
          lineTension: 0.45,
          data: [],
        },
      ],
    },
    loadChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "Load Value",
          backgroundColor: "rgba(121, 173, 220, 0.3)",
          // borderColor: "#92A098",
          // pointBackgroundColor: "#E5D0AB",
          // pointBorderColor: "#E5D0AB",
          borderWidth: "2",
          lineTension: 0.45,
          data: [],
        },
      ],
    },
    lineChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "Load Value",
          backgroundColor: "rgba(121, 173, 220, 0.3)",
          // borderColor: "#92A098",
          // pointBackgroundColor: "#E5D0AB",
          // pointBorderColor: "#E5D0AB",
          borderWidth: "2",
          lineTension: 0.45,
          data: [],
        },
        {
          type: "line",
          label: "Acc. X-Axis Value",
          backgroundColor: "rgba(124, 234, 156, 0.3)",
          // borderColor: "#92A098",
          // pointBackgroundColor: "#E5D0AB",
          // pointBorderColor: "#E5D0AB",
          borderWidth: "2",
          lineTension: 0.45,
          data: [],
        },
        {
          type: "line",
          label: "Acc. Y-Axis Value",
          backgroundColor: "rgba(255, 192, 159, 0.3)",
          // borderColor: "#92A098",
          // pointBackgroundColor: "#E5D0AB",
          // pointBorderColor: "#E5D0AB",
          borderWidth: "2",
          lineTension: 0.45,
          data: [],
        },
        {
          type: "line",
          label: "Acc. Z-Axis Value",
          backgroundColor: "rgba(220, 127, 155, 0.3)",
          // borderColor: "#92A098",
          // pointBackgroundColor: "#E5D0AB",
          // pointBorderColor: "#E5D0AB",
          borderWidth: "2",
          lineTension: 0.45,
          data: [],
        },
        {
          type: "line",
          label: "Ultrasonic Distance Value",
          backgroundColor: "rgba(201, 201, 238, 0.3)",
          // borderColor: "#92A098",
          // pointBackgroundColor: "#E5D0AB",
          // pointBorderColor: "#E5D0AB",
          borderWidth: "2",
          lineTension: 0.45,
          data: [],
        },
      ],
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true,
      },
      legend: {
        position: "bottom",
        align: "center",
      },
      pan: {
        enabled: false,
        mode: "xy",
        speed: 10,
        // threshold: 10
      },
      zoom: {
        enabled: false,
        drag: false,
        mode: "y",
        limits: {
          max: 10,
          min: 0.5,
        },
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Values",
              fontSize: 18,
            },
            ticks: {
            	autoSkip: true,
            	maxTicksLimit: 6,

           },

           gridLines: {
           	// display: false,
           }
           },
           
     
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Time",
              fontSize: 18,
            },
            // display: false,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              display: false,
            },
          },
        ],
      },
    },
    start_date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    end_date: new Date(),
    start_date_formatted: "",
    end_date_formatted: "",
    realtime_sensorDates: [],
    realtime_loadValues: [],
    realtime_accxValues: [],
    realtime_accyValues: [],
    realtime_acczValues: [],
    realtime_ultraValues: [],
    alertStatusMessageSuccess: "Status: Good!",
    alertStatusTypeSuccess: "success",
    alertStatusMessageError: "Status: Alert",
    alertStatusTypeError: "error",
    toggle: 1,
  };

  alertCheck(alert) {
    if (alert == 0) {
      this.setState({
        toggle: 1,
      });
    } else {
      this.setState({
        toggle: 0,
      });
    }
  }

  dateConvert(date) {
    return date.toISOString().substr(0, 19).replace("T", " ");
  }

  dateSelect(value, dateString) {
    this.setState({
      start_date_formatted: dateString[0],
      end_date_formatted: dateString[1],
    });
  }

  // dateSelectFinal(value, dateString) {
  //   console.log('onOK', this.state.start_date);
  // }

  realtimeFetchData() {
    var url = new URL("http://51.15.221.67:3030/sensors");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let start_date = this.dateConvert(new Date(Date.now() - 60 * 1000));
    let end_date = this.dateConvert(new Date());

    console.log(start_date);

    var params = { start_date, end_date };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        const sensorData = JSON.parse(result);
        console.log(sensorData);

        // let sensorDates = [];
        // let sensorValues = [];

        // console.log(Object.keys(sensorData.data).length);

        let alertStatus = 0;

        for (let i = 0; i < Object.keys(sensorData.data).length; i++) {
          if (this.state.realtime_sensorDates.length > 30) {
            this.state.realtime_sensorDates.push(sensorData.data[i].added_at);
            this.state.realtime_sensorDates.shift();

            this.state.realtime_loadValues.push(sensorData.data[i].load_sensor);
            this.state.realtime_loadValues.shift();

            this.state.realtime_accxValues.push(sensorData.data[i].acc_x);
            this.state.realtime_accxValues.shift();

            this.state.realtime_accyValues.push(sensorData.data[i].acc_y);
            this.state.realtime_accyValues.shift();

            this.state.realtime_acczValues.push(sensorData.data[i].acc_z);
            this.state.realtime_acczValues.shift();

            this.state.realtime_ultraValues.push(sensorData.data[i].ultra);
            this.state.realtime_ultraValues.shift();

            alertStatus = sensorData.data[i].alert;

          } else {
            this.state.realtime_sensorDates.push(sensorData.data[i].added_at);

            this.state.realtime_loadValues.push(sensorData.data[i].load_sensor);

            this.state.realtime_accxValues.push(sensorData.data[i].acc_x);
            this.state.realtime_accyValues.push(sensorData.data[i].acc_y);
            this.state.realtime_acczValues.push(sensorData.data[i].acc_z);

            this.state.realtime_ultraValues.push(sensorData.data[i].ultra);

            alertStatus = sensorData.data[i].alert;
          }
        }

        // console.log(this.state.realtime_sensorDates);

        let loadDataSet = this.state.loadChartData.datasets[0];
        loadDataSet.data = this.state.realtime_loadValues;

        let accxDataSet = this.state.accChartData.datasets[0];
        accxDataSet.data = this.state.realtime_accxValues;

        let accyDataSet = this.state.accChartData.datasets[1];
        accyDataSet.data = this.state.realtime_accyValues;

        let acczDataSet = this.state.accChartData.datasets[2];
        acczDataSet.data = this.state.realtime_acczValues;

        let ultraDataSet = this.state.ultraChartData.datasets[0];
        ultraDataSet.data = this.state.realtime_ultraValues;

        // console.log(sensorDataSet);

        // sensorDataSet.data = this.state.realtime_sensorValues;

        let loadChartData = {
          datasets: [loadDataSet],
          labels: this.state.realtime_sensorDates,
        };

        let accChartData = {
          datasets: [accxDataSet, accyDataSet, acczDataSet],
          labels: this.state.realtime_sensorDates,
        };

        let ultraChartData = {
          datasets: [ultraDataSet],
          labels: this.state.realtime_sensorDates,
        };

        this.setState({
          loadChartData: loadChartData,
          accChartData: accChartData,
          ultraChartData: ultraChartData,
        });

        this.alertCheck(alertStatus);

        // this.alertCheck(this.state.toggle);

        // console.log(sensorDataSet);
        // console.log(myChartData);
      })
      .catch((error) => console.log("error", error));
  }

  componentDidMount() {
    setInterval(() => {
      // console.log("I am running!");
      // console.log(this.state.start_date_formatted);
      this.realtimeFetchData();
    }, 5000);
    
      document.title = "ATD - Realtime Mode";
    
  }

  render() {
    const alert_display_success = this.state.toggle
      ? "alert-display-yes"
      : "alert-display-no";
    const alert_display_error = !this.state.toggle
      ? "alert-display-yes"
      : "alert-display-no";
    return (
      <div class="root">
          <div class="site-page-head">
            <Title class="site-page-title">Realtime Status</Title>

            <div className={`${alert_display_success}`}>
              <Alert
                message={this.state.alertStatusMessageSuccess}
                type={this.state.alertStatusTypeSuccess}
                showIcon
                banner
              />
            </div>
            <div className={`${alert_display_error}`}>
              <Alert
                message={this.state.alertStatusMessageError}
                type={this.state.alertStatusTypeError}
                showIcon
                banner
              />
            </div>
          </div>
          <div>


            <Row>
              <Col xs={24} >
                <div class="box-container">
                <Title level={2}>Load Sensor</Title>
                  <Chart
                    class="chart"
                    data={this.state.loadChartData}
                    options={this.state.lineChartOptions}
                  />


                </div>
              </Col>
            
              <Col xs={24}>
                <div class="box-container">
                <Title level={2}>Accelerometer</Title>
                  <Chart
                    class="chart"
                    data={this.state.accChartData}
                    options={this.state.lineChartOptions}
                  />
                </div>
              </Col>
          
            </Row>
          </div>
      </div>
    );
  }
}

export default RealtimeMode;
