import React, { useState } from "react";
import Navbar from "../Navbar/Sidebar";

const ConditionSelector: React.FC<{ auditResults: any; setAuditResults: any }> = ({ auditResults, setAuditResults }) => {
  const conditions = ["Good", "Bad", "Average"];

  const handleConditionChange = (productId: string, condition: string) => {
    setAuditResults((prevConditions: any) => ({
      ...prevConditions,
      [productId]: condition
    }));
  };

  return (
    <table className="border-collapse ">
      <thead>
        <tr>
          <th className="px-4 py-2">Product</th>
          {conditions.map(condition => (
            <th key={condition} className="px-8 py-2">{condition}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(auditResults).map(([product, selectedCondition]: any) => (
          <tr key={product}>
            <td className=" px-8 py-2">{product}</td>
            {conditions.map(condition => (
              <td key={`${product}-${condition}`} className=" px-12 py-2">
                <input
                  id={`${product}-${condition}`}
                  type="radio"
                  value={condition}
                  name={`${product}-condition`}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={selectedCondition === condition}
                  onChange={() => handleConditionChange(product, condition)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Auditsystem = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [billNo, setBillNo] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [auditResults, setAuditResults] = useState({
    Mouse: '',
    Keyboard: '',
    Monitor: '',
    CPU: '',
  });

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Type:', type);
    console.log('Item Code:', itemCode);
    console.log('Bill No.:', billNo);
    console.log('Purchase Date:', purchaseDate);
    console.log('Description:', description);
    console.log('Audit Results:', auditResults);
  };

  const Content = "Submit";

  return (
    <div className="flex">
      <Navbar/>
      <div>
        <div className='flex w-[80rem] pt-10 pr-10 pl-12 pb-6 '>
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
                  <option value="Furniture">Furniture</option>
                  <option value="Electronics">Electronics</option>
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
              <div className="grid grid-cols-2 pb-1 ">
                <p className="text-center font-bold ">Purchase Date</p>
                <p className="text-center font-bold">Description</p>
              </div>
              <div className="mb-5 grid grid-cols-2 pb-5">
                <input className="mx-10 rounded px-6 " type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
                <input className="mx-10 rounded " type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
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
              <ConditionSelector auditResults={auditResults} setAuditResults={setAuditResults} />
            </div>
          </div>
        </div>
        
        <div className='mt-5 mx-[53.3rem]'>
          <button onClick={handleSubmit} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
            {Content}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auditsystem;
