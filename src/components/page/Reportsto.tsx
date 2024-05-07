import React, { useState } from 'react';
import Navbar from '../Navbar/Sidebar';

interface StockDetails {
    name: string;
    type: string;
    itemCode: string;
    billNo: string;
    purchaseDate: string;
    description: string;
}

interface AuditDetails {
    condition: string;
    auditTime: string;
    auditor: string;
}

const Reportsto: React.FC = () => {
    const [stockDetails, setStockDetails] = useState<StockDetails>({
        name: '',
        type: '',
        itemCode: '',
        billNo: '',
        purchaseDate: '',
        description: ''
    });

    const [auditDetails, setAuditDetails] = useState<AuditDetails>({
        condition: '',
        auditTime: '',
        auditor: ''
    });

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
                                <p>Type: {stockDetails.type}</p>
                                <p>Item Code: {stockDetails.itemCode}</p>
                                <p>Bill No.: {stockDetails.billNo}</p>
                                <p>Purchase Date: {stockDetails.purchaseDate}</p>
                                <p>Description: {stockDetails.description}</p>
                            </div>
                            <div className="bg-white p-6 rounded shadow-md">
                                <h2 className="text-lg font-semibold mb-4">Audit Details</h2>
                                <p>Condition: {auditDetails.condition}</p>
                                <p>Audit Time: {auditDetails.auditTime}</p>
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
