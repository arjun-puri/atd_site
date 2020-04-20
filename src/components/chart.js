import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-zoom";

const Chart = props => <Line data={props.data} options={props.options} redraw />;

export default Chart;