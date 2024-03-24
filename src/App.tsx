import React, { useState } from 'react';
import {Navbar} from './components/Index1';
import logo from './logo.svg';
import './App.css';
import axios, { AxiosResponse } from 'axios'
import { Pageheader } from './components/Pageheader';
<source />

interface Data {
	id: number;
	text: string;
};

async function getRequest(): Promise<Array<Data> | undefined> {
	try {
		let response = await axios.get('http://127.0.0.1:8000/api/data');
		
		let data: Array<Data> = response.data;
		
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Handle Axios-specific errors
			console.error("Axios error:", error.message);
		} else if(error instanceof Error) {
			// Handle general errors
			console.error("General error:", error.message);
			return;
		}
	}
}

function App() {
	const [data, setData] = useState("Updating...");

	(async () => {
		let resdata = await getRequest();
		console.log(resdata);
		if(typeof resdata !== 'undefined') {
			setData(resdata[0].text)
		}
	})()

	return (
		<div className="flex bg-black">
		<div className="Navbar">
			<Navbar />
		</div>
		<div className=" p-7 text-3xl font-mono text-white ">Homepage</div>
		</div>
		
	);
}


export default App;

