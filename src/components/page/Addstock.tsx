import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import { Sidebar } from '../Imports';
import Inputbox, { InputboxProps } from '../elements/Inputbox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getChoices, createStock } from '../../apicalls';
import { authContext } from '../../App';
import { Choices, LoginDetails } from '../../types';

const Addstock = () => {
  const [selectedOption, setSelectedOption] = useState('Condition');
  const [type, setType] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [desc, setdesc] = useState('');
  const [date, setDate] = useState(new Date());
  const [billNo, setbillNo] = useState('');
  const [loc, setloc] = useState('');
  const [stockName, setstockName] = useState('');
  const [locations, setLocations] = useState<Array<Choices>>([{ name: '', code: '' }]);
  const [conditions, setConditions] = useState<Array<Choices>>([{ name: '', code: '' }]);
  const [categories, setCategories] = useState<Array<Choices>>([{ name: '', code: '' }]);
  const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;

  useEffect(() => {
    getChoices(loginToken, 1).then(cat => {
      if (typeof cat !== 'undefined') {
        setLocations(cat.results);
      }
    });
    getChoices(loginToken, 2).then(cat => {
      if (typeof cat !== 'undefined') {
        setCategories(cat.results);
      }
    });
    getChoices(loginToken, 3).then(cat => {
      if (typeof cat !== 'undefined') {
        setConditions(cat.results);
      }
    });
  }, [loginToken]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // handle select change logic here
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    const formData = {
      stockName,
      type,
      desc,
      date,
      itemCode,
      billNo,
      loc,
      conditions
    };

		// const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
		// 	weekday: "long",
		// 	year: "numeric",
		// 	month: "numeric",
		// 	day: "numeric"
		// 	});
		// const parts = dateTimeFormat.formatToParts(date);
		// console.log(parts)
		let purchasedate = date.toISOString().slice(0,10)
		createStock(loginToken, stockName, categories[0].code, desc, itemCode, billNo, purchasedate, loc);

    console.log(formData);
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div>
        <div className='flex justify-center w-[85rem] mt-3'>
          <div className='bg-slate-200 border rounded-full h-36 w-36'></div>
        </div>
        <div className='flex justify-center items-center w-[85rem] '>
          <Inputbox ph="stock name" tag="Name: " value={stockName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setstockName(e.target.value)} />
        </div>
        <div className='mx-64 mt-2'>
          <h1 className='text-xl font-semibold'>Stock Details:</h1>
          <div className='flex '>
            <div>
              <div className='mr-36'>
                <Inputbox ph="description" tag="Desc :" value={desc} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setdesc(e.target.value)} />
                <Inputbox ph="item code" tag="Code :" value={itemCode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemCode(e.target.value)} />
              <Inputbox ph="bill number" tag="BillNo: " value={billNo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setbillNo(e.target.value)} />

              <div className='flex mt-5'>
              <h1 className='text-xl font-semibold'>Date:</h1>
              <DatePicker className='ml-[1.8rem] w-56 border rounded-lg h-10 px-[4rem] border-gray-300 bg-gray-200   focus:ring-blue-500 focus:border-blue-500 text-white bg-gradient-to-r mx-6 from-gray-500 to-gray-900 hover:bg-gradient-to-bl  hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none  font-medium  py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800  p-5 appearance-none  focus:ring-opacity-75' selected={date} onChange={(date: Date) => setDate(date as Date)} />
              </div>
              </div>
            </div>
            <div>
      <div className=' flex mt-5 ml-9'>
              <h1 className='text-xl font-semibold'>Category:</h1>
                <select name="location" id="location" className=" text-white bg-gradient-to-r mx-6 from-gray-500 to-gray-900 hover:bg-gradient-to-bl  hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-5  px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800bg-gray-50  focus:border-blue-500  h-12 w-56 p-5 appearance-none  border border-gray-300  focus:ring-opacity-75" onChange={handleSelectChange} >
								<option value="">-- Select Category --</option>
                  {categories.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex mt-5'>
              <h1 className='text-xl font-semibold'>Condition:</h1>
                <select name="location" id="location" className=" text-white bg-gradient-to-r mx-6 from-gray-500 to-gray-900 hover:bg-gradient-to-bl  hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  ml-2 px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800bg-gray-50  focus:border-blue-500  h-12 w-56 p-5 appearance-none  border border-gray-300  focus:ring-opacity-75" onChange={handleSelectChange} >
								<option value="">-- Select Condition --</option>
                  {conditions.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>  
                <div className='flex mt-5'>
                  <h1 className='text-xl font-semibold'>Location:</h1>
                  <select name="location" id="location" className=" text-white bg-gray-50 mx-6  bg-gradient-to-r from-gray-500 to-gray-900 hover:bg-gradient-to-bl  hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800bg-gray-50  focus:border-blue-500  h-12 w-56 p-5 appearance-none  border border-gray-300  focus:ring-opacity-75" onChange={handleSelectChange} >
								<option value="">-- Select Location --</option>
                    {locations.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
      </div>
          </div>
        </div>
        <div>
        <div className='flex mt-3 ml-[14.5rem]'>
            <div className=' flex'>
              <label htmlFor="message" className="text-xl mt-8 font-semibold ">
                Remarks :
              </label>
              <textarea
                id="message"
                rows={2}
                className="block p-2.5 w-[36rem] text-sm ml-2 mt-5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400"
                placeholder="Description"
              ></textarea>
            </div>

          </div>
          <div className='mt-5 ml-[20.5rem]'>
          <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500  to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 w-[10rem] py-2.5 text-center me-2 mb-2"
              onClick={handleSubmit} // Add onClick handler to call handleSubmit function
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addstock;
