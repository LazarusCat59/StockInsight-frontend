import React, { useState, useContext, useEffect } from 'react';
import { Sidebar } from '../Imports';
import { User, LoginDetails, isArrayOfUsers, isAssignment, Choices } from '../../types';
import { createAssignment, createUser, getChoices, getUnassignedAuditors } from '../../apicalls';
import { authContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Auditselect = () => {
  const navigate = useNavigate();
  const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;
  const [users, setUsers] = useState<User[]>([]);
  const [selectedAuditor, setSelectedAuditor] = useState('');
	const [location, setLocation] = useState('');
	const [locations, setLocations] = useState<Array<Choices>>([]);

  const handleSubmit = () => {
		createAssignment(loginToken, selectedAuditor, location).then(a => {
			if(typeof a !== 'undefined' && isAssignment(a)) {
				alert("Assignment created");
			} else {
				alert("Assignment creation unsuccessful");
		}});

    navigate('/');
  };

	useEffect(() => {
		getUnassignedAuditors(loginToken).then(list => {
			if(typeof list !== 'undefined' && isArrayOfUsers(list.results)) {
				setUsers(list.results);
			}
		});

    getChoices(loginToken, 1).then(cat => {
      if (typeof cat !== 'undefined') {
        setLocations(cat.results);
      }
    });
	}, []);

  return (
    <div className='flex h-screen bg-custom-light-gray'>
      <Sidebar />
      <div className='w-screen text-custom-white  bg-custom-light-gray'>
        <h2 className="text-4xl font-bold  mx-60">
          Users
        </h2>
        <h3 className="my-2 text-lg mx-60">
          Manage who can view and edit the stock management system
        </h3>
        <div className="mx-60 mt-5">
          <div className="p-5 h-16 border border-custom-yellow text-custom-white shadow-lg  bg-custom-black  flex justify-between">
            <div>
              <i className="ri-user-line" /> Role
            </div>
            <div>Username</div>
          </div>
          {users.map((user, index) => (
            <div key={index} className="p-5 h-16 text-custom-white border-custom-yellow  shadow-lg bg-custom-black border flex justify-between">
              <div>
                <i className="ri-user-line" /> {user.role}
              </div>
              <div>{user.username}</div>
            </div>
          ))}
        </div>
        <div className="mx-60 mt-3">
          <select
            className=" block w-56 h-12 py-2 px-3 rounded-md shadow-sm sm:text-sm dark:bg-custom-black dark:border-custom-yellow dark:text-custom-yellow dark:focus:ring-blue-500 dark:focus:border-custom-white text-custom-yellow bg-gradient-to-r  hover:bg-gradient-to-bl hover:bg-blue-800 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium text-sm text-center items-center dark:hover:bg-custom-black dark:hover:text-custom-white dark:hover:border-custom-white  bg-custom-black focus:border-blue-500 p-5 appearance-none border border-gray-300 focus:ring-opacity-75  "
            value={selectedAuditor}
            onChange={(e) => setSelectedAuditor(e.target.value)}
          >
            <option value="">-- Select Auditor --</option>
						{users.map((user, index) => (
							<option value={user.url}>{user.username}</option>
						))}
            {/* Add more options as needed */}
          </select>
         <div className='mt-2'>
         <select
            className="block w-56 h-12 py-2 px-3 rounded-md shadow-sm sm:text-sm dark:bg-custom-black dark:border-custom-yellow dark:text-custom-yellow dark:focus:ring-blue-500 dark:focus:border-custom-white text-custom-yellow bg-gradient-to-r  hover:bg-gradient-to-bl hover:bg-blue-800 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium text-sm text-center items-center dark:hover:bg-custom-black dark:hover:text-custom-white dark:hover:border-custom-white  bg-custom-black focus:border-blue-500 p-5 appearance-none border border-gray-300 focus:ring-opacity-75"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">-- Select Location --</option>
						{locations.map((loc, index) => (
							<option value={loc.code}>{loc.name}</option>
						))}
            {/* Add more options as needed */}
          </select>
         </div>
        </div>
        <div className="mx-60 mt-5 space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auditselect;
