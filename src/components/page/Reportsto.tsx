import React, { useContext, useEffect, useState, useCallback } from 'react';
import Navbar from '../Navbar/Sidebar';
import { Stock, Audit, LoginDetails } from '../../types';
import { useParams } from 'react-router-dom';
import { getAudit, getStock } from '../../apicalls';
import { authContext } from '../../App';

const Reportsto: React.FC = () => {
  const { loginToken } = useContext(authContext) as LoginDetails;
  const { stockId } = useParams();

  const [stockDetails, setStockDetails] = useState<Stock | null>(null);
  const [auditDetails, setAuditDetails] = useState<Audit | null>(null);

  const fetchStockDetails = useCallback(async () => {
    if (stockId && loginToken) {
      const stock = await getStock(loginToken, Number(stockId));
      if (stock !== undefined) {
        setStockDetails(stock);
        if (stock.audit_details !== null) {
          const audit = await getAudit(loginToken, stock.audit_details);
          if (audit !== undefined) {
            setAuditDetails(audit);
          }
        }
      }
    }
  }, [stockId, loginToken]);

  useEffect(() => {
    fetchStockDetails();
  }, [fetchStockDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stockDetails && auditDetails) {
      console.log('Stock Details:', stockDetails);
      console.log('Audit Details:', auditDetails);
      downloadReport();
    }
  };

  const downloadReport = () => {
    alert('Downloading report...');
     
  };

  if (!stockDetails || !auditDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex'>
              <Navbar/>
              <div className="bg-custom-gray min-h-screen w-full p-5">
                  <header className="bg-custom-light-gray border-b border-custom-yellow p-4">
                      <h1 className="text-2xl font-semibold text-custom-white">Audit Report</h1>
                  </header>
                  <main className="container mx-auto py-8">
                      <form onSubmit={handleSubmit}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="bg-custom-light-gray p-6 rounded shadow-md border border-custom-yellow text-custom-white">
                                  <h2 className="text-lg font-semibold mb-4 text-custom-yellow">Stock Details</h2>
                                  <p>Name: {stockDetails.name}</p>
                                  <p>Category: {stockDetails.category}</p>
                                  <p>Item Code: {stockDetails.item_code}</p>
                                  <p>Bill No.: {stockDetails.bill_no}</p>
                                  <p>Purchase Date: {stockDetails.purchase_date}</p>
                                  <p>Description: {stockDetails.description}</p>
                              </div>
                              <div className="bg-custom-light-gray p-6 rounded shadow-md border border-custom-yellow text-custom-white">
                                  <h2 className="text-lg font-semibold mb-4 text-custom-yellow">Audit Details</h2>
                                  <p>Condition: {auditDetails.condition}</p>
                                  <p>Audit Time: {auditDetails.time}</p>
                                  <p>Auditor: {auditDetails.auditor}</p>
                              </div>
                          </div>
                          {/* <div className="text-center mt-8">
                              <button
                                  type="submit"
                                  className="text-white bg-gradient-to-r from-slate-600  to-zinc-900 hover:bg-gradient-to-br  focus:outline-none font-medium rounded-lg text-sm px-5 w-[10rem] py-2.5 text-center me-2 mb-2"
                              >
                                  Download Report
                              </button>
                          </div> */}
                      </form>
                  </main>
              </div>
          </div>
  );
};

export default Reportsto;