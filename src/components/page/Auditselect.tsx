import React, { useState, useContext } from 'react';
import { Sidebar } from '../Imports';
import { User, LoginDetails } from '../../types';
import { createUser } from '../../apicalls';
import { authContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Auditselect = () => {
  const navigate = useNavigate();
  const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;
  const [users, setUsers] = useState<User[]>([]);
  const [selectedAuditor, setSelectedAuditor] = useState('');

  const handleSubmit = () => {
   

    navigate('/');
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-screen'>
        <h2 className="text-4xl font-bold text-black dark:text-gray-800 mx-60">
          Users
        </h2>
        <h3 className="my-2 text-lg text-gray-600 dark:text-gray-800 mx-60">
          Manage who can view and edit the stock management system
        </h3>
        <div className="mx-60 mt-5">
          <div className="p-5 h-16 border flex justify-between">
            <div>
              <i className="ri-user-line" /> Role
            </div>
            <div>Username</div>
          </div>
          {users.map((user, index) => (
            <div key={index} className="p-5 h-16 border flex justify-between">
              <div>
                <i className="ri-user-line" /> {user.role}
              </div>
              <div>{user.email}</div>
            </div>
          ))}
        </div>
        <div className="mx-60 mt-3">
          <select
            className="block w-56 h-12 py-2 px-3 rounded-md shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-white bg-gradient-to-r from-gray-500 to-gray-900 hover:bg-gradient-to-bl hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm text-center items-center dark:hover:bg-gray-700  bg-gray-50 focus:border-blue-500 p-5 appearance-none border border-gray-300 focus:ring-opacity-75"
            value={selectedAuditor}
            onChange={(e) => setSelectedAuditor(e.target.value)}
          >
            <option value="">Select Auditor</option>
            <option value="auditor1">Auditor 1</option>
            <option value="auditor2">Auditor 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mx-60 mt-5 space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auditselect;
