import React, { useEffect, useState } from 'react'
import { Sidebar } from '../Imports'
import { Link } from 'react-router-dom';
import { FaComputer } from "react-icons/fa6";
import { useContext } from 'react';
import { authContext } from "../../App";
import { getChoices } from '../../apicalls';
import { Choices, LoginDetails } from '../../types';
import Navbar from '../Navbar/Sidebar';

const Locations = () => 
  
{
	const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;
	const [locations, setLocations] = useState<Array<Choices>>([]);

	useEffect(() => {
		getChoices(loginToken, 1).then(
			loc => {
				if(typeof loc !== 'undefined') {
					setLocations(loc.results);
				}
			})
		}, []);
	

  return (
    <div className="flex justify-start">
    <Navbar/>
    <div>
    <div className="container mx-auto mt-8 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 grid-flow-row">
		{locations.map((item, index) => (
		<div className="outline outline-gray-300 rounded mx-2 my-2 p-3 hover:bg-slate-300">
    <Link to={`/locations/${item.code}`}>
    <FaComputer className="w-48 h-48  object-cover aspect-square p-3 mx-auto"/>
      <h3 className="font-bold text-center">{item.name}</h3>
      <p className="font-extralight text-center">{item.code}</p>
    </Link>
		</div>
		))}
</div>
</div>



    
  </div>
);
}


export default Locations;
export{};
