export interface LoginError {
	non_field_errors: Array<string>;
}

export interface APIError {
	detail: string;
};

export interface Token {
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
	category: string;
}

export interface Audit {
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
	results: Array<Stock | Audit | Computer>;
}

export interface Choices {
	code: string;
	name: string;
}

export interface ChoicesList {
	length: number;
	results: Array<Choices>;
}

export interface LoginDetails {
	loginToken: string;
	setLoginToken: (logintoken: string) => void;
}

export function isAPIError(err: any): err is APIError {
	return (err as APIError).detail !== undefined;
}

export function isLoginError(err: any): err is LoginError {
	return (err as LoginError).non_field_errors !== undefined;
}

export function isStock(stock: any): stock is Stock {
	return (stock as Stock).name !== undefined;
}

export function isAudit(audit: any): audit is Audit {
	return (audit as Audit).auditor_name !== undefined;
}

export function isChoice(choice: any): choice is Choices {
	return (choice as Choices).code !== undefined;
}

export function isList(list: any): list is List {
	return (list as List).count !== undefined;
}
export function isComputer(computer: any): computer is Computer {
	return (computer as Computer).keyboard !== undefined;
}
export function isToken(token: any): token is Token {
	return (token as Token).token !== undefined;
}

export function isUser(user: any): user is User {
	return (user as User).role !== undefined;
}

export function isChoiceList(choicelist: any): choicelist is ChoicesList {
	return (choicelist as ChoicesList).length !== undefined;
}

export function isArrayOfAudits(audits: unknown): audits is Audit[] {
	return Array.isArray(audits) && audits.every(item => isAudit(item));
}

export function isArrayOfStocks(stocks: unknown): stocks is Stock[] {
	return Array.isArray(stocks) && stocks.every(item => isAudit(item));
}
