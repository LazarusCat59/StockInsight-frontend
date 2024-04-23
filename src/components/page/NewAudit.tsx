import React, { useState } from 'react'
import { Sidebar } from '../Imports'

const NewAudit = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [billNo, setBillNo] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [description, setDescription] = useState('');
    const [good, setGood] = useState(false);
    const [average, setAverage] = useState(false);
    const [bad, setBad] = useState(false);
    const [auditResults, setAuditResults] = useState({
        mouse: '',
        keyboard: '',
        monitor: '',
        cpu: '',
    });
  
    // Function to handle form submission
    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      // Log input values to the console
      console.log('Name:', name);
      console.log('Type:', type);
      console.log('Item Code:', itemCode);
      console.log('Bill No.:', billNo);
      console.log('Purchase Date:', purchaseDate);
      console.log('Description:', description);
      console.log('Good:', good);
      console.log('Average:', average);
      console.log('Bad:', bad);
      
    };
 

    const handleRadioChange = (component: string, value: string) => {
        setAuditResults((prevState: any) => ({
            ...prevState,
            [component]: value,
        }));
    };


  return (
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
    <input className="mx-10 rounded" type="text" value={name} onChange={(e) => setName(e.target.value)} />
    <select className="mx-10 rounded text-center bg-white" value={type} onChange={(e) => setType(e.target.value)}>
      <option value="volvo">Furniture</option>
      <option value="saab">Electronics</option>
    
    </select>
  </div>
  <div className="grid grid-cols-2 pb-1">
    <p className="text-center font-bold">Item Code</p>
    <p className="text-center font-bold">Bill No.</p>
  </div>
  <div className="grid grid-cols-2 pb-3">
    <input className="mx-10 rounded" type="text" value={itemCode} onChange={(e) => setItemCode(e.target.value)} />
    <input className="mx-10 rounded" type="text" value={billNo} onChange={(e) => setBillNo(e.target.value)} />
  </div>
  <div className="grid grid-cols-2 pb-1">
    <p className="text-center font-bold">Purchase Date</p>
    <p className="text-center font-bold">Description</p>
  </div>
  <div className="mb-5 grid grid-cols-2 pb-5">
    <input className="mx-10 rounded" type="text" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)}/>
    <input className="mx-10 rounded" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
  </div>
</div>
</div>


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
    <input type="radio" name="mouse" onChange={() => handleRadioChange('mouse', 'Good')} />
    <input type="radio" name="mouse" onChange={() => handleRadioChange('mouse', 'Average')} />
     <input type="radio" name="mouse" onChange={() => handleRadioChange('mouse', 'Bad')} />
     </div>
  <div className="my-10 grid grid-flow-row grid-cols-4">
    <p className="text-center font-bold">Keyboard</p>
    <input type="radio" name="keyboard" onChange={() => handleRadioChange('keyboard', 'Good')} /> 
    <input type="radio" name="keyboard" onChange={() => handleRadioChange('keyboard', 'Average')} />   
    <input type="radio" name="keyboard" onChange={() => handleRadioChange('keyboard', 'Bad')} /> 
  </div>
  <div className="my-10 grid grid-flow-row grid-cols-4">
    <p className="text-center font-bold">Monitor</p>
    <input type="radio" name="monitor" onChange={() => handleRadioChange('monitor', 'Good')} /> 
    <input type="radio" name="monitor" onChange={() => handleRadioChange('monitor', 'Average')} /> 
    <input type="radio" name="monitor" onChange={() => handleRadioChange('monitor', 'Bad')} /> 
  </div>
  <div className="my-10 grid grid-flow-row grid-cols-4 pb-8">
    <p className="text-center font-bold">CPU</p>
    <input type="radio" name="cpu" onChange={() => handleRadioChange('cpu', 'Good')} /> 
    <input type="radio" name="cpu" onChange={() => handleRadioChange('cpu', 'Average')} /> 
    <input type="radio" name="cpu" onChange={() => handleRadioChange('cpu', 'Bad')} /> 
  </div>
  </div>
  <div className="flex justify-center items-center ">
<button type="submit" className={`text-white bg-gray-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"`} onClick={handleSubmit} >Submit</button>
</div>
</div>
</div>

    </div>
  )
}


export default NewAudit;



