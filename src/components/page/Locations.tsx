import React, { useState } from 'react'
import { Sidebar } from '../Imports'
import { useNavigate } from 'react-router-dom';
import { FaComputer } from "react-icons/fa6";
import { getLocations } from '../../apicalls';
import { useContext } from 'react';
import { authContext, LoginDetails } from "../../App";
import { LabLocation } from '../../apicalls';

const Locations = () => 
  
{
	const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;
	const [locations, setLocations] = useState<Array<LabLocation>>([]);

	(async () => { 
		let loc = await getLocations(loginToken);
		if(typeof loc !== 'undefined') {
			setLocations(loc.locations);
		}
	})()
	

  return (
    <div className="flex justify-start">
    <Sidebar />
    <div>
    <div className="container mx-auto mt-8 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 grid-flow-row">
		{locations.map((item, index) => (
		<div className="outline outline-gray-300 rounded mx-2 my-2 p-3 hover:bg-slate-300">
    <a href={`/locations/${item.code}`}>
    <FaComputer className="w-48 h-48  object-cover aspect-square p-3 mx-auto"/>
      <h3 className="font-bold text-center">{item.name}</h3>
      <p className="font-extralight text-center">{item.code}</p>
    </a>
		</div>
		))}
</div>
</div>



    
  </div>
);
}


export default Locations;
export{};
