import React from "react";
// import logo from "./logo.svg";
import "../App.css";
import { render } from "react-dom";

import "antd/dist/antd.css";

import locale from "antd/es/date-picker/locale/en_GB";

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
} from "antd";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

class HistoryMode extends React.Component {
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
        enabled: true,
        drag: false,
        mode: "xy",
        limits: {
          max: 10,
          min: 0,
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
  };

  dateConvert(date) {
    return date.toISOString().substr(0, 19).replace("T", " ");
  }

  dateSelect(value, dateString) {
    // console.log(value);
    // console.log(this.dateConvert(value[0]));
    dateString[0] = this.dateConvert(value[0]);
    dateString[1] = this.dateConvert(value[1]);
    this.setState({
      start_date_formatted: dateString[0],
      end_date_formatted: dateString[1],
    });
  }

  fetchData() {
    var url = new URL("http://atd.arjunpuri.me/sensors");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // let start_date = this.dateConvert(this.state.start_date);
    // let end_date = this.dateConvert(this.state.end_date);

    let start_date = this.state.start_date_formatted;
    let end_date = this.state.end_date_formatted;

    var params = { start_date, end_date };

    Object.keys(params).forEach((key) => {
      url.searchParams.append(key, params[key]);
    });

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        let sensorData = JSON.parse(result);
        console.log(sensorData);

        // For dates

        let sensorDates = [];

        // For Sensor values

        let loadValues = [];

        let accxValues = [];
        let accyValues = [];
        let acczValues = [];

        let ultraValues = [];

        for (let i = 0; i < Object.keys(sensorData.data).length; i++) {
          sensorDates.push(sensorData.data[i].added_at);
          loadValues.push(sensorData.data[i].load_sensor);
          ultraValues.push(sensorData.data[i].ultra);
          accxValues.push(sensorData.data[i].acc_x);
          accyValues.push(sensorData.data[i].acc_y);
          acczValues.push(sensorData.data[i].acc_z);
        }

        // console.log(sensorDates);

        // let sensorDataSet = this.state.lineChartData.datasets[0];

        // For making sensor Datasets

        let loadDataSet = this.state.lineChartData.datasets[0];
        loadDataSet.data = loadValues;

        let accxDataSet = this.state.lineChartData.datasets[1];
        accxDataSet.data = accxValues;

        let accyDataSet = this.state.lineChartData.datasets[2];
        accyDataSet.data = accyValues;

        let acczDataSet = this.state.lineChartData.datasets[3];
        acczDataSet.data = acczValues;

        let ultraDataSet = this.state.lineChartData.datasets[4];
        ultraDataSet.data = ultraValues;

        // Final Dataset

        let loadChartData = {
          datasets: [loadDataSet],
          labels: sensorDates,
        };

        let accChartData = {
          datasets: [accxDataSet, accyDataSet, acczDataSet],
          labels: sensorDates,
        };

        let ultraChartData = {
          datasets: [ultraDataSet],
          labels: sensorDates,
        };

        let myChartData = {
          datasets: [
            loadDataSet,
            accxDataSet,
            accyDataSet,
            acczDataSet,
            ultraDataSet,
          ],
          labels: sensorDates,
        };

        this.setState({
          lineChartData: myChartData,
          loadChartData: loadChartData,
          accChartData: accChartData,
          ultraChartData: ultraChartData,
        });
      })
      .catch((error) => console.log("error: ", error));
  }

  componentDidMount() {
    
      document.title = "ATD - History Mode";
    
  }

  render() {
    return (
      <div class="root">
        <div>
          <Title class="site-page-title">History</Title>
        </div>
        <div>
          <Row>
            <Col xs={24}>
              <div class="date-picker">
                <RangePicker showTime onChange={this.dateSelect.bind(this)}/>
                <br />
                <Button type="primary" onClick={this.fetchData.bind(this)}>
                  Get Data
                </Button>
              </div>
            </Col>
            <Col xs={24}>
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

export default HistoryMode;
