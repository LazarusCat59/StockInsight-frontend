import axios, { AxiosResponse } from 'axios'

interface LoginError {
	non_field_errors: Array<string>;
}

interface APIError {
	detail: string;
};

interface Token {
	token: string;
};

interface User {
	username: string;
	email: string;
	role: string;
}

interface Stock {
	id: string;
	name: string;
	description: string | null;
	audit_details: string | null;
	type: string | null;
}

interface StockType {
	id: string;
	name: string;
	category: string;
}

interface AuditDetails {
	id: string;
	auditor_name: string;
	time: string;
	condition: string;
	remarks: string;
	auditor: string;
}

interface Computer {
	id: string;
	keyboard: string;
	mouse: string;
	cpu: string;
	monitor: string;
}

interface List {
	count: number;
	next: number | null;
	previous: number | null;
	results: Array<Stock | AuditDetails | StockType | Computer>;
}

function isAPIError(err: any): err is APIError {
	return (err as APIError).detail !== undefined;
}

function isLoginError(err: any): err is LoginError {
	return (err as LoginError).non_field_errors !== undefined;
}

async function makeRequest(type: string, url: string, reqdata: any): Promise<any> {
	try {
		let response: AxiosResponse;
		if(type === 'GET') {
			response = await axios.get(url, reqdata);
		} else if(type === 'POST') {
			response = await axios.post(url, reqdata);
		} else if(type === 'PATCH') {
			response = await axios.patch(url, reqdata);
		} else if(type === 'DELETE') {
			response = await axios.delete(url, reqdata);
		} else {
			console.log("Invalid type of request");
			return;
		}
		
		let data = response.data;
		
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Handle Axios-specific errors
			console.error("Axios error:", error.message);
			if (error.response !== undefined) {
				return error.response.data;
			}
		} else if(error instanceof Error) {
			// Handle general errors
			console.error("General error:", error.message);
		}
	}
}

export async function getLoginToken(uname: string, pwd: string): Promise<string | undefined> {
	let data: LoginError | Token | undefined = await makeRequest("POST", "http://127.0.0.1:8000/api/login/", { username: uname, password: pwd });
	
	if(typeof data === "undefined") {
		return;
	} else if (isLoginError(data)) {
		console.error(data.non_field_errors[0]);
		return;
	}

	return data.token;
}

export async function getStockList(token: string): Promise<List | undefined> {
	let data: APIError | List | undefined = await makeRequest("GET", "http://127.0.0.1:8000/api/stock_list/", { headers: { "Authorization" : `Token ${token}` }});
	console.log(data);

	if(typeof data === "undefined") {
		return;
	} else if(isAPIError(data)) {
		console.error(data.detail);
		return;
	}

	return data;
}

export async function getComputerList(token: string): Promise<List | undefined> {
	let data: APIError | List | undefined = await makeRequest("GET", "http://127.0.0.1:8000/api/computer_list/", { headers: { "Authorization" : `Token ${token}` }});
	console.log(data);

	if(typeof data === "undefined") {
		return;
	} else if(isAPIError(data)) {
		console.error(data.detail);
		return;
	}

	return data;
}

export async function createUser(token: string, uname: string, pwd: string, email: string, role:string): Promise<User | undefined> {
	let data: APIError | User | undefined = await makeRequest("POST", "http://127.0.0.1:8000/api/register/", { username: uname, password: pwd, email: email, role: role, headers: { "Authorization" : `Token ${token}` }});
	console.log(data);

	if(typeof data === "undefined") {
		return;
	} else if(isAPIError(data)) {
		console.error(data.detail);
		return;
	}

	return data;
}
