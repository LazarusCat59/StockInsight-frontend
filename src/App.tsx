import React, { useState } from 'react';
import { BrowserRouter , Route, Routes ,Link} from 'react-router-dom';
import {Sidebar,Home,Mainpage,Login,Footer,Request} from './components/Imports';
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
	function RequestWithNavbar() {
		return (
		  <div>
			<Sidebar />
			<Request />
		  </div>
		);
	  }

	return (
		<div className="App ">
			<BrowserRouter>
			<Routes>
			<Route path ='/' element={ <Mainpage/>} />
			<Route path ='/request' element={ <Request/>} />
			<Route path = '/login' element={<Login/>}/>
			</Routes>
			<Footer />
			</BrowserRouter>
			
 
      </div>
	  
    
  );
}
		


export default App;

