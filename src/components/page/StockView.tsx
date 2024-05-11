import React, { useState, useEffect, useContext } from 'react'
import { authContext } from '../../App'
import { Sidebar } from '../Imports'
import { getChoices, getStock, getAudit } from '../../apicalls';
import { useNavigate, useParams } from 'react-router-dom';
import { Choices, LoginDetails } from '../../types';

const StockView = () => {
	const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;

	const params = useParams();

	let stockId = '';
	if(typeof params.stockId !== 'undefined') {
		stockId = params.stockId;
	}

	let navigate = useNavigate();
  const routeChange = () =>{ 
    let path = `/audit/${stockId}`; 
    navigate(path);
  }

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [billNo, setBillNo] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [description, setDescription] = useState('');
	const [condition, setCondition] = useState('');
	const [remarks, setRemarks] = useState('');

	const [isLoaded, setLoaded] = useState(false);

	const [categories, setCategories] = useState<Array<Choices>>([{ name: '', code: '' }]);
  
	useEffect(() => {
		getStock(loginToken, Number(stockId)).then(stock => {
			if(typeof stock !== 'undefined') {
				setName(stock.name);
				setItemCode(stock.item_code);
				setBillNo(stock.bill_no);
				setPurchaseDate(stock.purchase_date);
				setCategory(stock.category);
				if(stock.description !== null) {
					setDescription(stock.description);
				} 
				if(stock.audit_details !== null) {
					getAudit(loginToken, stock.audit_details).then(audit => {
						if(typeof audit !== 'undefined') {
							setCondition(audit.condition);
							if(audit.remarks !== null) {
								setRemarks(audit.remarks);
							}
						}
					});
				} setLoaded(true);
			}
		});

		getChoices(loginToken, 2).then(cat => {
			if(typeof cat !== 'undefined') {
				setCategories(cat.results);
			}
		});
	}, []);

  return (
    <div>
    <div className="flex h-screen bg-custom-gray">
    <Sidebar />
    <div className="mx-auto w-3/5 mt-5">
      <div className="container mx-12 rounded-xl bg-custom-light-gray pt-5" key={isLoaded ? 'yes' : 'no' }>
      <div className=" mx-auto ">
  <h1 className="text-center text-4xl font-extrabold mt-5  mb-3 text-custom-white">Stock Details</h1>

  </div>
  <div className="mt-5 grid grid-cols-2 px-3 pb-1 pt-3">
    <p className="text-center font-bold text-custom-white">Name</p>
    <p className="text-center font-bold text-custom-white">Category</p>
  </div>
  <div className="grid grid-cols-2 pb-3">
    <input className="mx-10 rounded text-center h-10 bg-custom-black text-custom-yellow border border-custom-yellow" type="text" defaultValue={name} disabled/>
    <select className="mx-10 rounded text-center  bg-custom-black text-custom-yellow border border-custom-yellow" defaultValue="Electronics" disabled>
			{categories.map((item, index) => (
				<option key={index} value={item.code}>{item.name}</option>
				))}
    </select>
  </div>
  <div className="grid grid-cols-2 pb-1">
    <p className="text-center font-bold text-custom-white">Item Code</p>
    <p className="text-center font-bold text-custom-white">Bill No.</p>
  </div>
  <div className="grid grid-cols-2 pb-3">
    <input className="mx-10 rounded text-center bg-custom-black text-custom-yellow border border-custom-yellow h-10" type="text" defaultValue={itemCode} disabled/>
    <input className="mx-10 rounded text-center  bg-custom-black text-custom-yellow border border-custom-yellow" type="text" defaultValue={billNo} disabled/>
  </div>
  <div className="grid grid-cols-2 pb-1">
    <p className="text-center font-bold text-custom-white">Purchase Date</p>
    <p className="text-center font-bold text-custom-white">Description</p>
  </div>
  <div className="mb-5 grid grid-cols-2 pb-5">
    <input className="mx-10 rounded text-center  bg-custom-black text-custom-yellow border border-custom-yellow h-10" type="text" defaultValue={purchaseDate} disabled/>
    <input className="mx-10 rounded text-center  bg-custom-black text-custom-yellow border border-custom-yellow" type="text" defaultValue={description} disabled/>
  </div>

  <div className="flex justify-center items-center ">
<button type="button" className={`text-custom-black mb-5 bg-custom-white hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center font-bold dark:bg-custom-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"`} onClick={routeChange} >Audit</button>
</div>
</div>
 
  
</div>
 
</div>
</div>
  )
}

export default StockView;
