import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaComputer } from "react-icons/fa6";
import { useContext } from 'react';
import { authContext } from "../../App";
import { getChoices, getCurrentAssignment, getCurrentUser } from '../../apicalls';
import { Choices, LoginDetails } from '../../types';
import { Sidebar } from '../Imports';

const Locations = () => 
  
{
	const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;
	const [locations, setLocations] = useState<Array<Choices>>([]);
	const [userRole, setUserRole] = useState('');
	const [auditloc, setAuditloc] = useState<Choices>({
		code: '',
		name: '',
	});

	useEffect(() => {
		getChoices(loginToken, 1).then(
			loc => {
				if(typeof loc !== 'undefined') {
					setLocations(loc.results);
				}
			})
		getCurrentUser(loginToken).then(user => {
			if (typeof user !== 'undefined') {
				setUserRole(user.role);
			}});
	}, []);

	useEffect(() => {
		if(userRole === 'ADT') {
			getCurrentAssignment(loginToken).then(a => {
				if(typeof a !== 'undefined') {
					locations.forEach((item, index) => {
						if(item.code === a.location) {
							setAuditloc({
								code: a.location,
								name: item.name
						})}});
				}
			});
		}
	}, [userRole]);
	

  return (
    <div className=" h-screen flex justify-start bg-custom-light-gray">
    <Sidebar/>
    <div>
    <div className="container mx-auto mt-8 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 grid-flow-row">
		{userRole !== 'ADT' && locations.map((item, index) => (
		<div className="outline outline-custom-yellow hover:bg-custom-yellow rounded mx-2 my-2 p-3 bg-custom-gray hover:text-custom-black text-custom-white font-bold">
    <Link to={`/locations/${item.code}`}>
    <FaComputer className="w-48 h-48 text-custom-black object-cover aspect-square p-3 mx-auto"/>
      <h3 className="font-bold text-center  ">{item.name}</h3>
      <p className="font-semibold text-center">{item.code}</p>
    </Link>
		</div>
		))}

		{userRole === 'ADT' &&
		<div className="outline outline-custom-yellow hover:bg-custom-yellow rounded mx-2 my-2 p-3 bg-custom-gray hover:text-custom-black text-custom-white font-bold">
    <Link to={`/locations/${auditloc.code}`}>
    <FaComputer className="w-48 h-48 text-custom-black object-cover aspect-square p-3 mx-auto"/>
      <h3 className="font-bold text-center ">{auditloc.name}</h3>
      <p className="font-extralight text-center">{auditloc.code}</p>
    </Link>
		</div>
		}
</div>

</div>



    
  </div>
);
}


export default Locations;
export{};
