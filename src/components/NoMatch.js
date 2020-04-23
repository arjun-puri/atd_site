import React from "react";

import "../App.css";
import { render } from "react-dom";
import "antd/dist/antd.css";

import {
	Typography,
} from "antd";

const { Title, Paragraph } = Typography;

class NoMatch extends React.Component {
	componentDidMount() {
		document.title = "ATD";
	}

	render() {
		return (
			<div class="root">
			
				<Title>
					Error: 404
				</Title>
				<Paragraph>
					Does not exist!
				</Paragraph>

			</div>
			);
	}
}

export default NoMatch;