import React, { useEffect, useState, useContext } from 'react'
import { Sidebar } from '../Imports'
import { FaComputer } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { getAudit, getAuditedStocks } from '../../apicalls';
import { authContext } from '../../App';
import { Audit, isArrayOfStocks, LoginDetails } from '../../types';
import { isTemplateExpression } from 'typescript';

const AuditPage = () => {
	const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;

	const [ stockIds, setStockIds ] = useState([0]);
	const [audits, setAudits] = useState<Array<Audit>>([{
		id: 0,
		url: '',
		auditor_name: '',
		time:'',
		condition: '',
		remarks: '',
		auditor: ''
	}]);

  let navigate = useNavigate(); 
  const routeChange = (path: string) =>{ 
    // let path = `/reports/${id}`; 
    navigate(path);
  }

	// useEffect(() => {
	// 	let stkIds: Array<number> = []
	// 	let adts: Array<Audit> = [];
	// 	getAuditedStocks(loginToken).then(stocklist => {
	// 		if(stocklist !== undefined) {
	// 			if(isArrayOfStocks(stocklist.results)) {
	// 				stocklist.results.forEach(item => {
	// 					stkIds.push(item.id);
	// 					if(item.audit_details !== null) {
	// 						getAudit(loginToken, item.audit_details).then(audit => {
	// 							if(typeof audit !== 'undefined') {
	// 								adts.push(audit)
	// 								setAudits(adts);
	// 							}
	// 						});
	// 					}
	// 				});
	// 			}
	// 		}
	// 		setStockIds(stkIds);
	// 	});

		
	// }, []);

	useEffect(() => {
		let stkIds: Array<number> = [];
		const fetchAudits = async () => {
		  const fetchedAudits: Array<Audit> = [];
	  
		  try {
			const stocklist = await getAuditedStocks(loginToken);
	  
			if (stocklist !== undefined && isArrayOfStocks(stocklist.results)) {
			  for (const item of stocklist.results) {
				stkIds.push(item.id);
	  
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
			setStockIds(stkIds);
		  }
		};
	  
		fetchAudits();
	  }, []);

	// useEffect(() => {
	// 	console.log(audits);
	// }, [audits]);

	return (
<div className="flex">
  <Sidebar />
	<div className=" border border-custom-black shadow-md bg-custom-gray  mb-8 flex justify-center  w-full mx-auto">
            <div className="flex flex-col w-full p-4">
              <div className="container mx-auto mt-8 flex">
                <h1 className="font-extrabold text-3xl mr-auto ">Stock Audits</h1>
                <button className={`hover:outline  rounded-xl ml-auto bg-custom-black text-custom-yellow hover:bg-custom-black hover:text-white selection:text-black px-4  hover:outline-slate-200 outline outline-custom-yellow`} onClick={() => routeChange(`/locations`)}>New Audit</button>
              </div>
              <div className="container mx-auto mt-8">
                <input
                  className="w-full rounded hover:bg-custom-black hover:outline  hover:outline-slate-200 selection:text-black text-custom-yellow placeholder:text-center hover:placeholder-white placeholder-custom-yellow bg-custom-black py-1 px-4"
                  type="text"
                  placeholder="Search by product name or Location"
                />
              </div>
              <div className="container mx-auto mt-6">
                <h1 className="text-xl font-extrabold mb-1 selection:text-custom-black">Recent Audits</h1>
                {audits && audits.map((item, index) => (
                  <div className="flex my-2">
                    <p className="mr-auto">
                      <span className='text-custom-white selection:text-custom-yellow font-semibold'>{item.time}</span><br/>
                      <span className="text-custom-yellow  selection:text-black text-sm font-semibold">Completed</span>
                    </p>
                    <button className="ml-auto text-sm font-semibold rounded-xl selection:text-black  bg-custom-black text-custom-yellow hover:bg-custom-black hover:text-white px-4 my-2 hover:outline hover:outline-slate-200 outline outline-custom-yellow" onClick={() => routeChange(`/reports/${stockIds[index]}`)}>
                      View Report
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
</div>
  )
}

export default AuditPage;
export {};
