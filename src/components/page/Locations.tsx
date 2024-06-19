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
	const { loginToken, setLoginToken, userRole, setUserRole } = useContext(authContext) as LoginDetails;
	const [locations, setLocations] = useState<Array<Choices>>([]);
	const [auditloc, setAuditloc] = useState<Choices>({
		code: '',
		name: '',
	});

	useEffect(() => {

		(async () => {
			let loc = await getChoices(loginToken, 1);

			if(typeof loc !== 'undefined') {
				setLocations(loc.results);
			}

		})()

	}, []);

	useEffect(() => {
		(async () => {
			if(userRole === 'ADT') {
				let assignment = await getCurrentAssignment(loginToken);

				locations.forEach((item) => {
					if(typeof assignment !== 'undefined') {
						if(item.code === assignment.location) {
							setAuditloc({
								code: assignment.location,
								name: item.name
							});
						}}
				});
			}
		})()
	}, [locations]);

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

		{(userRole === 'ADT' && auditloc.code !== '') &&
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
