import React, { useEffect, useState, useContext } from 'react'
import { Sidebar , Header} from '../Imports'
import { FaComputer } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { getAuditList } from '../../apicalls';
import { authContext } from '../../App';
import { Audit, isAudit, LoginDetails } from '../../types';

const AuditPage = () => {
	const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;

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
  const routeChange = () =>{ 
    let path = `/locations/LAB_1`; 
    navigate(path);
  }

	useEffect(() => {
		getAuditList(loginToken).then(adtlist => {
			if(typeof adtlist !== 'undefined') {
				
				function isArrayOfAudits(audits: unknown): audits is Audit[] {
					return Array.isArray(audits) && audits.every(item => isAudit(item));
				}
				if(isArrayOfAudits(adtlist.results)) {
					setAudits(adtlist.results);
				}
			}
		});
	}, []);
	return (
<div className="flex">
  <Sidebar />
  <div className="flex flex-col w-full p-4">
    <div className="container mx-auto mt-8 flex">
      <h1 className="font-extrabold text-3xl mr-auto">Stock Audits</h1>
      <button className={`hover:outline outline-slate-200 rounded-xl ml-auto bg-slate-200 hover:bg-slate-300 px-4`} onClick={routeChange}>New Audit</button>
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
			{audits.map((item, index) => (
      <div className="flex my-2">
        <p className="mr-auto">
          <span>{item.time}</span><br/>
          <span className="text-slate-500 text-sm">Completed</span>
        </p>
        <button className="ml-auto text-sm rounded-xl bg-slate-200 px-4 my-2 hover:bg-slate-300 hover:outline outline-slate-200" disabled>
          Report Unavailable
        </button>
      </div>
			))}
    </div>
  </div>
</div>
  )
}

export default AuditPage;
export {};
