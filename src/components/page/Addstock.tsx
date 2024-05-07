import React, { useState, useEffect, useContext } from 'react';
import { Sidebar } from '../Imports';
import Inputbox from '../elements/Inputbox';
import { getChoices, Choices } from '../../apicalls';
import { authContext, LoginDetails } from '../../App';

const Addstock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Condition');
  const [type, setType] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [desc, setdesc] = useState('');
  const [date, setdate] = useState('');
  const [billNo, setbillNo] = useState('');
  const [loc, setloc] = useState('');
  const [stockName, setstockName] = useState('');
  const [locations, setLocations] = useState<Array<Choices>>([{ name: '', code: '' }]);
  const [condition, setCondition] = useState<Array<Choices>>([{ name: '', code: '' }]);
  const [categories, setcategories] = useState<Array<Choices>>([{ name: '', code: '' }]);
  const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;

  useEffect(() => {
    getChoices(loginToken, 1).then(cat => {
      if (typeof cat !== 'undefined') {
        setLocations(cat.results);
      }
    });
  }, [loginToken]); 
  
  useEffect(() => {
    getChoices(loginToken, 2).then(cat => {
      if (typeof cat !== 'undefined') {
        setcategories(cat.results);
      }
    });
  }, [loginToken]);

  useEffect(() => {
    getChoices(loginToken, 3).then(cat => {
      if (typeof cat !== 'undefined') {
        setCondition(cat.results);
      }
    });
  }, [loginToken]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectChange = (event: any) => {
    // handle select change logic here
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div>
        <div className='flex justify-center w-[85rem] mt-3'>
          <div className='bg-slate-200 border rounded-full h-36 w-36'></div>
        </div>
        <div className='flex justify-center items-center w-[85rem] '>
          <Inputbox ph="stock name" tag="Name : " type={stockName} setType={setstockName} />
        </div>

        <div className='mx-64 mt-2'>
          <h1 className='text-xl font-semibold  '> Stock Details:</h1>
          <div className='flex '>
        <div>
              <div className='mr-36'>
                        <Inputbox ph="description" tag="Desc :" type={desc} setType={setdesc} />
              <Inputbox ph="dd/mm/yyyy (Purchase Date)" tag="Date :" type={date} setType={setdate} />
              <div className='flex mt-5'>
              <h1 className='text-xl font-semibold'> Location:</h1>
                <select name="location" id="location" className=" text-white bg-gray-50 mx-6  bg-gradient-to-r from-gray-500 to-gray-900 hover:bg-gradient-to-bl  hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800bg-gray-50  focus:border-blue-500  h-12 w-56 p-5 appearance-none  border border-gray-300  focus:ring-opacity-75" onChange={handleSelectChange} >
                  {locations.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
        </div>
            <div className='ml-5'>
              <Inputbox ph="item code" tag="Code :" type={itemCode} setType={setItemCode} />
              <Inputbox ph="bill number" tag="BillNo: " type={billNo} setType={setbillNo} />
              <div className='flex mt-5'>
              <h1 className='text-xl font-semibold'>Condition:</h1>
              <select name="location" id="location" className=" text-white bg-gradient-to-r mx-6 from-gray-500 to-gray-900 hover:bg-gradient-to-bl  hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  ml-2 px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800bg-gray-50  focus:border-blue-500  h-12 w-56 p-5 appearance-none  border border-gray-300  focus:ring-opacity-75" onChange={handleSelectChange} >
                {condition.map((item, index) => (
                  <option key={index} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
              <div className=' flex mt-5'>
               
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
        <div>
        <div className='flex'>
            <div className=' flex'>
              <label htmlFor="message" className="text-xl ml-[13.8rem] font-semibold ">
                Remarks :
              </label>
              <textarea
                id="message"
                rows={2}
                className="block p-2.5 w-[36rem] text-sm ml-5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400"
                placeholder="Description"
              ></textarea>
            </div>
          
          </div>
          <div className='mt-5 ml-[20.5rem]'>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 w-[10rem] py-2.5 text-center me-2 mb-2"
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
