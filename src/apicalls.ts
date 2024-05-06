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

export interface User {
	username: string;
	email: string;
	role: string;
}

export interface Stock {
	id: number;
	url: string;
	name: string;
	description: string | null;
	item_code: string;
	bill_no: string;
	purchase_date: string;
	location: string;
	audit_details: string | null;
	type: string | null;
}

export interface StockType {
	id: number;
	url: string;
	name: string;
	category: string;
}

export interface AuditDetails {
	id: number;
	url: string;
	auditor_name: string;
	time: string;
	condition: string;
	remarks: string | null;
	auditor: string | null;
}

export interface Computer {
	id: number;
	url: string;
	name: string;
	keyboard: string;
	mouse: string;
	cpu: string;
	monitor: string;
}

export interface List {
	count: number;
	next: string | null;
	previous: string | null;
	results: Array<Stock | AuditDetails | StockType | Computer>;
}

export interface Choices {
	code: string;
	name: string;
}

interface ChoicesList {
	length: number;
	results: Array<Choices>;
}


function isAPIError(err: any): err is APIError {
	return (err as APIError).detail !== undefined;
}

function isLoginError(err: any): err is LoginError {
	return (err as LoginError).non_field_errors !== undefined;
}

export function isStock(stock: any): stock is Stock {
	return (stock as Stock).name !== undefined;
}

export function isAudit(audit: any): audit is AuditDetails {
	return (audit as AuditDetails).auditor_name !== undefined;
}

async function makeRequest(type: string, url: string, reqdata: any, config?: any): Promise<any> {
	try {
		let response: AxiosResponse;
		if(type === 'GET') {
			response = await axios.get(url, reqdata);
		} else if(type === 'POST') {
			response = await axios.post(url, reqdata, config);
		} else if(type === 'PATCH') {
			response = await axios.patch(url, reqdata, config);
		} else if(type === 'DELETE') {
			response = await axios.delete(url, config);
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

export async function getStockList(token: string, name: string, location: string): Promise<List | undefined> {
	let data: APIError | List | undefined = undefined

	if(name !== '' && location !== '') {
		data = await makeRequest("GET", "http://127.0.0.1:8000/api/stock_list/", { params: { name: name, location: location }, headers: { "Authorization" : `Token ${token}` }});
	} else if(name !== '') {
		data = await makeRequest("GET", "http://127.0.0.1:8000/api/stock_list/", { params: { name: name }, headers: { "Authorization" : `Token ${token}` }});
	} else if(location !== '') {
		data = await makeRequest("GET", "http://127.0.0.1:8000/api/stock_list/", { params: { location: location }, headers: { "Authorization" : `Token ${token}` }});
	} else {
		data = await makeRequest("GET", "http://127.0.0.1:8000/api/stock_list/", { headers: { "Authorization" : `Token ${token}` }});
	}

	// console.log(data);

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
	// console.log(data);

	if(typeof data === "undefined") {
		return;
	} else if(isAPIError(data)) {
		console.error(data.detail);
		return;
	}

	return data;
}

export async function createUser(token: string, uname: string, pwd: string, email: string, role:string): Promise<User | undefined> {
	let data: APIError | User | undefined = await makeRequest("POST", "http://127.0.0.1:8000/api/register/", { username: uname, password: pwd, email: email, role: role}, { headers: { "Authorization" : `Token ${token}` }});
	// console.log(data);

	if(typeof data === "undefined") {
		return;
	} else if(isAPIError(data)) {
		console.error(data.detail);
		return;
	}

	return data;
}

export async function getChoices(token: string, choice: number): Promise<ChoicesList | undefined> {
	let data: APIError | ChoicesList | undefined;
	if(choice === 1) {
		data = await makeRequest("GET", "http://127.0.0.1:8000/api/locations/", { headers: { "Authorization" : `Token ${token}` }});
	} else if(choice === 2) {
		data = await makeRequest("GET", "http://127.0.0.1:8000/api/categories/", { headers: { "Authorization" : `Token ${token}` }});
	} else if(choice === 3) {
		data = await makeRequest("GET", "http://127.0.0.1:8000/api/conditions/", { headers: { "Authorization" : `Token ${token}` }});
	} else {
			console.error("Invalid choice");
			return;
	}
	// console.log(data);

	if(typeof data === "undefined") {
		return;
	} else if(isAPIError(data)) {
		console.error(data.detail);
		return;
	}

	return data;
}

export async function getStock(token: string, id: number | string): Promise<Stock | undefined> {
	let data: APIError | Stock | undefined;
	if(typeof id === 'number') {
		data = await makeRequest("GET", `http://127.0.0.1:8000/api/stock/${id}/`, { headers: { "Authorization" : `Token ${token}` }});
	} else {
		data = await makeRequest("GET", id, { headers: { "Authorization" : `Token ${token}` }});
	}

	if(typeof data === "undefined") {
		return;
	} else if(isAPIError(data)) {
		console.error(data.detail);
		return;
	}

	return data;
}

export async function getAudit(token: string, id: number | string): Promise<AuditDetails | undefined> {
	let data: APIError | AuditDetails | undefined;
	if(typeof id === 'number') {
		data = await makeRequest("GET", `http://127.0.0.1:8000/api/audit/${id}/`, { headers: { "Authorization" : `Token ${token}` }});
	} else {
		data = await makeRequest("GET", id, { headers: { "Authorization" : `Token ${token}` }});
	}

	if(typeof data === "undefined") {
		return;
	} else if(isAPIError(data)) {
		console.error(data.detail);
		return;
	}

	return data;
}

export async function setAudit(token: string, stockId: number, condition: string, remarks: string) {
	console.log(condition, remarks);
	let data: APIError | AuditDetails | undefined = await makeRequest("POST", "http://127.0.0.1:8000/api/audit_create/", { condition: condition, remarks: remarks}, { headers: { "Authorization" : `Token ${token}` } });
	
	if(typeof data === "undefined") {
		return;
	} else if(isAPIError(data)) {
		console.error(data.detail);
		return;
	}

	console.log(data.url);
	let stock: APIError | Stock | undefined = await makeRequest("PATCH", `http://127.0.0.1:8000/api/stock/${stockId}/`, { audit_details: data.url },{ headers: { "Authorization" : `Token ${token}` }});
		
	if(typeof stock === "undefined") {
		return;
	} else if(isAPIError(stock)) {
		console.error(stock.detail);
		return;
	}

	return data;
}

export async function getAuditList(token: string): Promise<List | undefined> {
	let data: APIError | List | undefined = undefined

	data = await makeRequest("GET", "http://127.0.0.1:8000/api/audit_list/", { headers: { "Authorization" : `Token ${token}` }});

	// console.log(data);

	if(typeof data === "undefined") {
		return;
	} else if(isAPIError(data)) {
		console.error(data.detail);
		return;
	}

	return data;
}
