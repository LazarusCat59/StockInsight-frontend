import axios, { AxiosResponse } from 'axios'
import { isAPIError, isList, isUser, isAudit, isStock,
	isToken, isChoice, isChoiceList, isComputer, isLoginError,
	APIError, List, User, Audit, Stock, Token, Choices, ChoicesList,
	Computer, LoginError} from './types'

function catchErrors(data: any): any {
	if(typeof data === "undefined") {
		return;
	} else if(isAPIError(data)) {
		console.error(data.detail);
		return;
	}
	
	return data;
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
	
	let checked_data = catchErrors(data);

	if(isToken(checked_data)) {
		return checked_data.token;
	}
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

	let checked_data = catchErrors(data);

	if(isList(checked_data)) {
		return checked_data;
	}
}

export async function getComputerList(token: string): Promise<List | undefined> {
	let data: APIError | List | undefined = await makeRequest("GET", "http://127.0.0.1:8000/api/computer_list/", { headers: { "Authorization" : `Token ${token}` }});

	let checked_data = catchErrors(data);

	if(isList(checked_data)) {
		return checked_data;
	}
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

	let checked_data = catchErrors(data);

	if(isChoiceList(checked_data)) {
		return checked_data;
	}
}

export async function getStock(token: string, id: number | string): Promise<Stock | undefined> {
	let data: APIError | Audit | undefined;

	if(typeof id === 'string') {
		data = await makeRequest("GET", id, { headers: { "Authorization" : `Token ${token}` }});
	} else {
		data = await makeRequest("GET", `http://127.0.0.1:8000/api/stock/${id}/`, { headers: { "Authorization" : `Token ${token}` }});
	}

	let checked_data = catchErrors(data);
	
	if(isStock(checked_data)) {
		return checked_data;
	}
}

export async function getAudit(token: string, id: number | string): Promise<Audit | undefined> {
	let data: APIError | Audit | undefined;

	if(typeof id === 'string') {
		data = await makeRequest("GET", id, { headers: { "Authorization" : `Token ${token}` }});
	} else {
		data = await makeRequest("GET", `http://127.0.0.1:8000/api/audit/${id}/`, { headers: { "Authorization" : `Token ${token}` }});
	}

	let checked_data = catchErrors(data);

	if(isAudit(checked_data)) {
		return checked_data;
	}
}

export async function getAuditList(token: string): Promise<List | undefined> {
	let data: APIError | List | undefined = undefined

	data = await makeRequest("GET", "http://127.0.0.1:8000/api/audit_list/", { headers: { "Authorization" : `Token ${token}` }});

	let checked_data = catchErrors(data);
	
	if(isList(checked_data)) {
		return checked_data;
	}
}

export async function getCurrentUser(token: string): Promise<User | undefined> {
	let data: APIError | User | undefined;

	data = await makeRequest("GET", "http://127.0.0.1:8000/api/currentuser/", { headers: { "Authorization" : `Token ${token}` }});

	let checked_data = catchErrors(data);
	
	if(isUser(checked_data)) {
		return checked_data;
	}
}

export async function getAuditedStocks(token: string): Promise<List | undefined> {
	let data: APIError | List | undefined = await makeRequest("GET", "http://127.0.0.1:8000/api/auditedstocks/", { headers: { "Authorization" : `Token ${token}` }});

	let checked_data = catchErrors(data);

	if(isList(checked_data)) {
		return checked_data;
	}
}

export async function createUser(token: string, uname: string, pwd: string, email: string, role:string): Promise<User | undefined> {
	let data: APIError | User | undefined = await makeRequest("POST", "http://127.0.0.1:8000/api/register/", { username: uname, password: pwd, email: email, role: role}, { headers: { "Authorization" : `Token ${token}` }});

	let checked_data = catchErrors(data);

	if(isUser(checked_data)) {
		return checked_data;
	}
}

export async function createAudit(token: string, stockId: number, condition: string, remarks: string): Promise<Audit | undefined> {
	let data: APIError | Audit | undefined = await makeRequest("POST", "http://127.0.0.1:8000/api/audit_create/", { condition: condition, remarks: remarks}, { headers: { "Authorization" : `Token ${token}` } });
	
	let checked_data = catchErrors(data);

	if(isAudit(checked_data)) {
		let stock: APIError | Stock | undefined = await makeRequest("PATCH", `http://127.0.0.1:8000/api/stock/${stockId}/`, { audit_details: checked_data.url }, { headers: { "Authorization" : `Token ${token}` }});

		if (catchErrors(stock) === undefined) {
			return;
		}

		return checked_data;
	}
}

export async function createStock(token: string, name: string, category: string, description: string, item_code: string, bill_no: string, purchase_date: string, location: string): Promise<Stock | undefined> {
	let dataToSend = { name: name, category: category, description: description, item_code: item_code, bill_no: bill_no, purchase_date: purchase_date, location: location };
	console.log(dataToSend);
	let data: APIError | Stock | undefined = await makeRequest("POST", "http://127.0.0.1:8000/api/audit_create/",
		{ name: name, category: category, description: description, item_code: item_code, bill_no: bill_no, purchase_date: purchase_date, location: location },
		{ headers: { "Authorization" : `Token ${token}` } });
	
	let checked_data = catchErrors(data);

	if(isStock(checked_data)) {
		return checked_data;
	}
}

export async function deleteAudit(token: string, id: string | number) {
	let data: APIError | undefined;
	if(typeof id === 'string') {
		data = await makeRequest("DELETE", id, { headers: { "Authorization" : `Token ${token}` }});
	} else {
		data = await makeRequest("DELETE", `https://127.0.0.1:8000/api/audit/${id}`, { headers: { "Authorization" : `Token ${token}` }});
	}
	
	catchErrors(data);
}

