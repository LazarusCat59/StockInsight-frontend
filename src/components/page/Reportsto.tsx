import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar/Sidebar';
import { Stock, Audit, LoginDetails } from '../../types';
import { useParams } from 'react-router-dom';
import { getAudit, getStock } from '../../apicalls';
import { authContext } from '../../App';

const Reportsto: React.FC = () => {
	const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;

	const [stockId, setStockId] = useState('');
	const [stockDetails, setStockDetails] = useState<Stock>({
		id: 0,
 		url: '',
 		location: '',
 		audit_details: '',
		name: '',
		category: '',
		item_code: '',
		bill_no: '',
		purchase_date: '',
		description: ''
 	});

 	const [auditDetails, setAuditDetails] = useState<Audit>({
		id: 0,
		url: '',
		time: '',
		remarks:'',
		auditor_name: '',
    condition: '',
    auditor: ''
	});

	let params = useParams();
	if(params.stockId !== undefined) {
		setStockId(params.stockId);
	}

 	const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can generate the report in a downloadable format
    // For simplicity, let's just log the details to the console
    console.log('Stock Details:', stockDetails);
    console.log('Audit Details:', auditDetails);
    // Trigger the download
    downloadReport();
	};

	const downloadReport = () => {
    // Simulating the download
    alert('Downloading report...');
    // You can add your logic to generate and download the report here
    // For example, you can use libraries like jsPDF or FileSaver.js to generate PDF or CSV files and trigger the download
	};

	useEffect(() => {
		getStock(loginToken, Number(stockId)).then(stock => {
			if(stock !== undefined) {
				setStockDetails(stock);
				if(stock.audit_details !== null) {
					getAudit(loginToken, stock.audit_details).then(audit => {
						if(audit !== undefined) {
							setAuditDetails(audit);
						}
					});
			}}});
	}, []);

 return (
     <div className='flex'>
         <Navbar/>
         <div className="bg-gray-100 min-h-screen w-full p-5">
             <header className="bg-white border-b border-gray-200 p-4">
                 <h1 className="text-2xl font-semibold">Audit Report</h1>
             </header>
             <main className="container mx-auto py-8">
                 <form onSubmit={handleSubmit}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="bg-white p-6 rounded shadow-md">
                             <h2 className="text-lg font-semibold mb-4">Stock Details</h2>
                             <p>Name: {stockDetails.name}</p>
                             <p>Category: {stockDetails.category}</p>
                             <p>Item Code: {stockDetails.item_code}</p>
                             <p>Bill No.: {stockDetails.bill_no}</p>
                             <p>Purchase Date: {stockDetails.purchase_date}</p>
                             <p>Description: {stockDetails.description}</p>
                         </div>
                         <div className="bg-white p-6 rounded shadow-md">
                             <h2 className="text-lg font-semibold mb-4">Audit Details</h2>
                             <p>Condition: {auditDetails.condition}</p>
                             <p>Audit Time: {auditDetails.time}</p>
                             <p>Auditor: {auditDetails.auditor}</p>
                         </div>
                     </div>
                     <div className="text-center mt-8">
                         <button
                             type="submit"
                             className="text-white bg-gradient-to-r from-blue-500  to-blue-900 hover:bg-gradient-to-br  focus:outline-none font-medium rounded-lg text-sm px-5 w-[10rem] py-2.5 text-center me-2 mb-2"
                         >
                             Download Report
                         </button>
                     </div>
                 </form>
             </main>
         </div>
     </div>
 );
}

export default Reportsto;
