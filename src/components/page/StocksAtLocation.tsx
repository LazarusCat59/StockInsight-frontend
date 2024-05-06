import React, { useEffect, useState } from 'react'
import { Sidebar } from '../Imports'
import { Link, useParams } from 'react-router-dom';
import { FaComputer } from "react-icons/fa6";
import { useContext } from 'react';
import { authContext, LoginDetails } from "../../App";
import { Stock, getStockList, isStock } from '../../apicalls';

const StocksAtLocation = () => {
	const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;
	const [stocks, setStocks] = useState<Array<Stock>>([]);

	const params = useParams();
	let locationId = ''
	if(typeof params.locationId !== 'undefined') {
		locationId = params.locationId;
	}

	useEffect(() => {
		getStockList(loginToken, '', locationId).then(stks => {
			if(typeof stks !== 'undefined') {

				function isArrayOfStocks(stocks: unknown): stocks is Stock[] {
					return Array.isArray(stocks) && stocks.every(item => isStock(item));
				}

				if(isArrayOfStocks(stks.results)) {
					setStocks(stks.results);
				}
			}
		});
	}, []);

  return (
    <div className="flex justify-start">
    <Sidebar />
    <div>
    <div className="container mx-auto mt-8 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 grid-flow-row">
		{stocks.map((item, index) => (
		<div key={index} className="outline outline-gray-300 rounded mx-2 my-2 p-3 hover:bg-slate-300">
    <Link to={`/stocks/${item.id}`}>
    <FaComputer className="w-48 h-48  object-cover aspect-square p-3 mx-auto"/>
      <h3 className="font-bold text-center">{item.name}</h3>
    </Link>
		</div>
		))}
</div>
</div>
  </div>
);
}

export default StocksAtLocation;
export{};
