import React, { useState, useEffect, useContext } from 'react'
import { authContext } from '../../App'
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../Imports'
import { getStock, getChoices, createAudit, deleteAudit } from '../../apicalls';
import { LoginDetails, Choices } from '../../types';

const NewAudit = () => {
	const { loginToken, setLoginToken, userRole, setUserRole } = useContext(authContext) as LoginDetails;

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [billNo, setBillNo] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [description, setDescription] = useState('');
	const [auditDetail, setAuditDetail] = useState('');

	const [condition, setCondition] = useState('');
	const [remarks, setRemarks] = useState('');

	const params = useParams();

	let navigate = useNavigate();
	const routeChange = () =>{ 
		let path = `/audit/`; 
		navigate(path);
	}


	let stockId = '';
	if(typeof params.stockId !== 'undefined') {
		stockId = params.stockId;
	}   

  // Function to handle form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Log input values to the console
    // console.log('Name:', name);
    // console.log('Type:', type);
    // console.log('Item Code:', itemCode);
    // console.log('Bill No.:', billNo);
    // console.log('Purchase Date:', purchaseDate);
    // console.log('Description:', description);

    if(!remarks) {
      setRemarks(' ');
    }
		createAudit(loginToken, Number(stockId), condition, remarks);
    if(auditDetail) {
      deleteAudit(loginToken, auditDetail);
    }
		routeChange();
  };

	const [isLoaded, setLoaded] = useState(false);

	const [APIConditions, setAPIConditions] = useState<Array<Choices>>([{ name: '', code: '' }]);
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
					setAuditDetail(stock.audit_details);
				}
			}
		});

		getChoices(loginToken, 3).then(cat => {
			if(typeof cat !== 'undefined') {
				setAPIConditions(cat.results);
			}
		});
		
		getChoices(loginToken, 2).then(cat => {
			if(typeof cat !== 'undefined') {
				setCategories(cat.results);
			} 
		});

		setLoaded(true);
	}, []);

  useEffect(() => {
    console.log(auditDetail);
  }, [auditDetail])

  return (
    <div className="flex bg-custom-gray">
    <Sidebar />
    <div className="mx-auto h-screen w-3/5 mt-5">
      <div className="container mx-12 rounded-xl bg-custom-light-gray pt-5" key={isLoaded ? 'yes' : 'no' }>
      <div className=" mx-auto ">
  <h1 className="text-center text-4xl font-extrabold mt-5  mb-3 text-custom-white">Stock Details</h1>

  </div>
  <div className="mt-5 grid grid-cols-2 px-3 pb-1 pt-3 ">
    <p className="text-center font-bold text-custom-white">Name</p>
    <p className="text-center font-bold text-custom-white">Category</p>
  </div>
  <div className="grid grid-cols-2 pb-3">
    <input className="mx-10 rounded text-center  h-10 bg-custom-black text-custom-yellow border border-custom-yellow" type="text" defaultValue={name} disabled/>
    <select className="mx-10 rounded text-center  h-10 bg-custom-black text-custom-yellow border border-custom-yellow" defaultValue="Electronics" disabled>
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
    <input className="mx-10 rounded text-center  h-10 bg-custom-black text-custom-yellow border border-custom-yellow" type="text" defaultValue={itemCode} disabled/>
    <input className="mx-10 rounded text-center  h-10 bg-custom-black text-custom-yellow border border-custom-yellow" type="text" defaultValue={billNo} disabled/>
  </div>
  <div className="grid grid-cols-2 pb-1">
    <p className="text-center font-bold text-custom-white">Purchase Date</p>
    <p className="text-center font-bold text-custom-white">Description</p>
  </div>
  <div className="mb-5 grid grid-cols-2 pb-5">
    <input className="mx-10 rounded text-center  h-10 bg-custom-black text-custom-yellow border border-custom-yellow" type="text" defaultValue={purchaseDate} disabled/>
    <input className="mx-10 rounded text-center  h-10 bg-custom-black text-custom-yellow border border-custom-yellow" type="text" defaultValue={description} disabled/>
  </div>
  <h1 className="text-center text-4xl text-custom-white font-extrabold mt-5 mb-3">Audit Details</h1>
  <div className="grid grid-cols-2 pb-1">
    <p className="text-center font-bold text-custom-white">Condition</p>
    <p className="text-center font-bold text-custom-white">Remarks</p>
  </div>
  <div className="mb-5 grid grid-cols-2 pb-5">
	<select className="mx-10 rounded text-center  h-10 bg-custom-black text-custom-yellow border border-custom-yellow" onChange={(e) => setCondition(e.target.value)}>
		<option value="">-- Select Condition --</option>
	{APIConditions.map((item, index) => (
		<option key={index} value={item.code}>{item.name}</option>
		))}
  </select>
  <input className="mx-10 rounded text-center  h-10 bg-custom-black text-custom-white border border-custom-yellow" type="text" onChange={(e) => setRemarks(e.target.value)}/>
  </div>
  <div className="flex justify-center items-center">
<button type="button" className={`text-white mb-5 bg-gray-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"`} onClick={handleSubmit} >Audit</button>
</div>
</div>
</div>
</div>
)}
	{/*
    <div>
    <div className="flex">
    <Sidebar />
    <div className="mx-auto">
      <h1 className="text-center text-4xl font-extrabold mt-5 mr-14">Stock Details</h1>
      <div className="container mx-12 rounded-xl bg-slate-200 pt-5">
  <div className="h-12 w-12 then shadow-md rounded-full flex mx-auto"></div>
  <div className="mt-5 grid grid-cols-2 px-3 pb-1 pt-3">
    <p className="text-center font-bold">Name</p>
    <p className="text-center font-bold">Type</p>
  </div>
  <div className="grid grid-cols-2 pb-3">
    <input className="mx-10 rounded" type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />
    <select className="mx-10 rounded text-center bg-white" defaultValue={type} onChange={(e) => setType(e.target.value)}>
      <option defaultValue="FUR">Furniture</option>
      <option defaultValue="ELC">Electronics</option>
    
    </select>
  </div>
  <div className="grid grid-cols-2 pb-1">
    <p className="text-center font-bold">Item Code</p>
    <p className="text-center font-bold">Bill No.</p>
  </div>
  <div className="grid grid-cols-2 pb-3">
    <input className="mx-10 rounded" type="text" defaultValue={itemCode} onChange={(e) => setItemCode(e.target.value)} />
    <input className="mx-10 rounded" type="text" defaultValue={billNo} onChange={(e) => setBillNo(e.target.value)} />
  </div>
  <div className="grid grid-cols-2 pb-1">
    <p className="text-center font-bold">Purchase Date</p>
    <p className="text-center font-bold">Description</p>
  </div>
  <div className="mb-5 grid grid-cols-2 pb-5">
    <input className="mx-10 rounded" type="text" defaultValue={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)}/>
    <input className="mx-10 rounded" type="text" defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
  </div>
</div>
</div>

    <div>
    <div className="flex">
    <Sidebar />
    <div className="mx-auto">
      <h1 className="text-center text-4xl font-extrabold mt-5 mr-14">Stock Details</h1>
{/*
<div id="Audit" className="mx-auto">
<h1 className="text-center text-4xl font-extrabold mr-20">Audit Details</h1>
<div className="container mx-12 rounded-xl bg-slate-200">
  <div className="mb-10 mt-5 grid grid-flow-row grid-cols-4 pt-8">
    <div></div>
    <p className="text-center font-bold">Good</p>
    <p className="text-center font-bold">Average</p>
    <p className="text-center font-bold">Bad</p>
  </div>
  <div className="my-10 grid grid-flow-row grid-cols-4">
    <p className="text-center font-bold">Mouse</p>
    <input type="radio" name="mouse" onChange={() => handleRadioChange('mouse', 'GOOD')} />
    <input type="radio" name="mouse" onChange={() => handleRadioChange('mouse', 'AVRG')} />
    <input type="radio" name="mouse" onChange={() => handleRadioChange('mouse', 'BRKN')} />
     </div>
  <div className="my-10 grid grid-flow-row grid-cols-4">
    <p className="text-center font-bold">Keyboard</p>
    <input type="radio" name="keyboard" onChange={() => handleRadioChange('keyboard', 'GOOD')} /> 
    <input type="radio" name="keyboard" onChange={() => handleRadioChange('keyboard', 'AVRG')} />   
    <input type="radio" name="keyboard" onChange={() => handleRadioChange('keyboard', 'BRKN')} /> 
  </div>
  <div className="my-10 grid grid-flow-row grid-cols-4">
    <p className="text-center font-bold">Monitor</p>
    <input type="radio" name="monitor" onChange={() => handleRadioChange('monitor', 'GOOD')} /> 
    <input type="radio" name="monitor" onChange={() => handleRadioChange('monitor', 'AVRG')} /> 
    <input type="radio" name="monitor" onChange={() => handleRadioChange('monitor', 'BRKN')} /> 
  </div>
  <div className="my-10 grid grid-flow-row grid-cols-4 pb-8">
    <p className="text-center font-bold">CPU</p>
    <input type="radio" name="cpu" onChange={() => handleRadioChange('cpu', 'GOOD')} /> 
    <input type="radio" name="cpu" onChange={() => handleRadioChange('cpu', 'AVRG')} /> 
    <input type="radio" name="cpu" onChange={() => handleRadioChange('cpu', 'BRKN')} /> 
  </div>
  </div>
  <div className="flex justify-center items-center ">
<button type="submit" className={`text-white bg-gray-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"`} onClick={handleSubmit} >Submit</button>
</div>
</div>*/}

export default NewAudit;
