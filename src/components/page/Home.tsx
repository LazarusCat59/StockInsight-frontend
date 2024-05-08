// Home.tsx
import React, { useEffect, useState, useContext } from 'react';
import { Sidebar } from '../Imports';
import { FaComputer } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { getAudit, getAuditedStocks, getStockList } from '../../apicalls';
import { authContext } from '../../App';
import { Audit, isArrayOfStocks, LoginDetails } from '../../types';

const Home = () => {
  const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;
  const [stockIds, setStockIds] = useState([0]);
  const [audits, setAudits] = useState<Array<Audit>>([]);
  const [stockNum, setStockNum] = useState(0);

  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  };

  console.log(loginToken);

  useEffect(() => {
    const fetchAudits = async () => {
      const fetchedAudits: Array<Audit> = [];
      const fetchedStockIds: Array<number> = [];

      try {
        const stocklist = await getAuditedStocks(loginToken);

        if (stocklist !== undefined && isArrayOfStocks(stocklist.results)) {
          for (const item of stocklist.results) {
            fetchedStockIds.push(item.id);

            if (item.audit_details !== null) {
              const audit = await getAudit(loginToken, item.audit_details);
              if (typeof audit !== 'undefined') {
                fetchedAudits.push(audit);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching audits:', error);
      } finally {
        setAudits(fetchedAudits);
        setStockIds(fetchedStockIds);
      }
    };

    fetchAudits();

    getStockList(loginToken, '', '').then(list => {
      if (typeof list!== 'undefined') {
        setStockNum(list.count);
      }
    })
  }, []);

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex flex-col justify-start w-full mx-auto ">
        <div className='flex p-5 '>
          <div className="mb-8 flex justify-center w-1/2 mx-auto">
            <div className='flex flex-col w-full mr-5'>
          <div className='flex-col mb-3'>

          <div className="w-full mb-4 rounded-md border border-gray-300 p-6 bg-white shadow-md">
                <p className="text-center text-5xl font-bold text-gray-800">{stockNum}</p>
                <p className="text-center text-lg text-gray-600">Total Stock</p>
              </div>
          <div className="w-full rounded-md border border-gray-300 p-6 bg-white shadow-md">
                <p className="text-center text-5xl font-bold text-gray-800">{audits.length}</p>
                <p className="text-center text-lg text-gray-600">Total Audits</p>
              </div>
              
          </div>
              <div className="mb-8 mt-10  flex flex-col w-full ml-16 mx-auto">
                <h2 className="mb-4 text-lg font-medium text-gray-800">Completed Audits</h2>
                <div className="flex flex-col space-y-4 w-[30rem]">
                  <div className="rounded-md border border-gray-300 p-4 bg-white shadow-md">
                    <h3 className="text-base font-medium text-gray-800">Classroom 1 Inventory</h3>
                    <p className="mt-2 text-sm text-gray-600">Status: Ongoing</p>
                  </div>
                  <div className="rounded-md border border-gray-300 p-4 bg-white shadow-md">
                    <h3 className="text-base font-medium text-gray-800">Lab 2 Inventory</h3>
                    <p className="mt-2 text-sm text-gray-600">Status: Completed</p>
                  </div>
                  <div className="rounded-md border border-gray-300 p-4 bg-white shadow-md">
                    <h3 className="text-base font-medium text-gray-800">Lab 3 Inventory</h3>
                    <p className="mt-2 text-sm text-gray-600">Status: Incomplete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" border border-gray-700 mb-8 flex justify-center  w-1/2 mx-auto">
            <div className="flex flex-col w-full p-4">
              <div className="container mx-auto mt-8 flex">
                <h1 className="font-extrabold text-3xl mr-auto">Stock Audits</h1>
                <button className={`hover:outline outline-slate-200 rounded-xl ml-auto bg-slate-200 hover:bg-slate-300 px-4`} onClick={() => routeChange(`/locations`)}>New Audit</button>
              </div>
              <div className="container mx-auto mt-8">
                <input
                  className="w-full rounded bg-slate-200 placeholder:text-center hover:bg-slate-300 py-1 px-4"
                  type="text"
                  placeholder="Search by product name or Location"
                />
              </div>
              <div className="container mx-auto mt-6">
                <h1 className="text-xl font-extrabold mb-1">Recent Audits</h1>
                {audits && audits.map((item, index) => (
                  <div className="flex my-2">
                    <p className="mr-auto">
                      <span>{item.time}</span><br/>
                      <span className="text-slate-500 text-sm">Completed</span>
                    </p>
                    <button className="ml-auto text-sm rounded-xl bg-slate-200 px-4 my-2 hover:bg-slate-300 hover:outline outline-slate-200" onClick={() => routeChange(`/reports/${stockIds[index]}`)}>
                      View Report
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
