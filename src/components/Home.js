import React from "react";

import "../App.css";
import { render } from "react-dom";
import "antd/dist/antd.css";

import {
	Typography,
} from "antd";

const { Title, Paragraph } = Typography;

class Home extends React.Component {
	componentDidMount() {
		document.title = "ATD";
	}

	render() {
		return (
			<div class="root home">
			
				<Title>
					Anti Theft Device
				</Title>
				<Paragraph>
					A major project created by: <br />

					Arjun Puri, Ashish Kumar Meena, Bhavya Khanna and Manan Gulyaani <br />
					MSIT, Janakpuri
				</Paragraph>

			</div>
			);
	}
}

export default Home;