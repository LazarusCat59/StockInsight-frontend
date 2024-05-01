import React, { useState } from 'react'
import { Sidebar } from '../Imports'
import ConditionSelector from '../elements/ConditionSelector';
import But from '../elements/But';

const Auditsystem = () => {
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
    const Content = "Submit";

  return (
    <div>
    <div className="flex">
    <Sidebar />
<div>
<div className='flex w-[85rem] pt-10 pr-10 pl-12 pb-6 '>
<div className="ml-[8rem] mr-[8rem] flex justify-center items-center h-92">
      <h1 className="text-center text-4xl font-extrabold mt-5 ">Stock Details</h1>
</div>
<div>
<div className="container mx-10 rounded-xl bg-slate-200 ">
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

</div>

<div id="Audit" className="mt-0">
<div className='flex w-[85rem] '>
<div className='ml-[10.5rem] mr-[5.8rem] flex justify-center items-center h-60'>
<h1 className="text-center text-4xl font-extrabold ">Audit Details</h1>
</div>
<div className="container flex justify-center ml-[5rem] text-lg  p-4 h-66 w-[38rem] rounded-xl bg-slate-200">
  <ConditionSelector/>
  
</div>
</div>
</div>
<div className='mt-5 mx-[53.3rem]'>
<But content={Content}/>
</div>
</div>
</div>
    </div>
  )
}


export default Auditsystem