import React, { useEffect, useContext } from 'react';
import { Sidebar } from '../Imports';
import { useState } from 'react';
import { getChoices, Choices } from '../../apicalls';
import { authContext, LoginDetails } from '../../App';



const Request: React.FC = () => {
  const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;

	const [locations, setLocations] = useState<Array<Choices>>([{ name: '', code: '' }]);
  const [selectedOption, setSelectedOption] = useState('');

  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    location: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSelectChange = (event:any) => {
    setFormData(prevState => ({
      ...prevState,
      ["location"]: event.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Log form data to the console
    // You can add further logic here, like sending the form data to the server
  };
  useEffect(() => {
    getChoices(loginToken, 1).then(cat => {
		  if(typeof cat !== 'undefined') {
			  setLocations(cat.results);
		  }
    });
  }, []);

  return (
    <div className="flex justify-start"><Sidebar />
    <div className="container mx-auto px-10 py-32">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">New Stock Request</h1>
        <div className="flex items-center space-x-2"></div>
      </div>
      <div className="rounded-md border bg-white px-8 py-6 shadow-xl">
        <p className="mb-4 text-gray-700">Please fill out this form to request new stock. Once you submit the form, it will be sent to the Head of Department for approval.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col">
            <label htmlFor="itemName" className="mb-2 font-medium text-gray-700">Item name</label>
            <input type="text" id="itemName" className="appearance-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-75" onChange={handleInputChange} />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="itemDescription" className="mb-2 font-medium text-gray-700">Item description</label>
            <textarea id="itemDescription" className="appearance-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-75" rows={4} onChange={handleInputChange}></textarea>
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="location" className=" font-medium text-gray-700">Location</label>
            <input type="text" id="location"   />
            <select name="location" id="location" className="appearance-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-75" onChange={handleSelectChange} >
              {locations.map((item, index) => (
                <option key={index} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 font-bold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">Submit Request</button>
        </form>
      </div>
    </div>
    </div>
  );
};


export default Request;
