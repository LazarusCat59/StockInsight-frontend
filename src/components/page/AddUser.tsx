import React, { useState, useContext } from 'react';
import { Sidebar } from '../Imports';
import { User, LoginDetails } from '../../types';
import { createUser } from '../../apicalls';
import { authContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();
  const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;

  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const addUser = () => {
    if (!selectedRole || !email || !username) return;

    if (
      users.some(
        user =>
          user.role === selectedRole &&
          (user.username === username || user.email === email)
      )
    ) {
      alert(
        'A user with the same username or email and role already exists.'
      );
      return;
    }

    const newUser: User = { email, username, role: selectedRole };
    setUsers([...users, newUser]);
    setEmail('');
    setUsername('');
    setSelectedRole('');

    // Print the user object to the console
    console.log(newUser);
  };

  const removeUser = (role: string) => {
    const updatedUsers = users.filter(user => user.role !== role);
    setUsers(updatedUsers);
  };

  const handleSubmit = () => {
    // console.log("Selected Role:", selectedRole);
    // console.log("Email:", email);
    // console.log("Username:", username);

    createUser(loginToken, username, password, email, selectedRole);
    alert("User created successfully");

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
        <h1 className="mx-60 mt-2 font-bold text-3xl">Add Or Remove Users</h1>

        <div className="relative mt-3">
          <div className="absolute ml-[15rem] inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
              <path d="M10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
            </svg>
          </div>
          <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20rem] ml-[15rem] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="flex mt-3 w-[20rem]">
          <span className="inline-flex ml-[15rem]  items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
          </span>
          <input type="text" className="w-[32rem] rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block  text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="flex mt-3 w-[20rem]">
          <span className="inline-flex ml-[15rem]  items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
          </span>
          <input type="password" className="w-[32rem] rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block  text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="mx-60 mt-3">
          <select
            id="role"
            name="role"
            className=" block w-56 h-12 py-2 px-3  bg-white rounded-md shadow-sm  sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  text-white bg-gradient-to-r from-gray-500 to-gray-900 hover:bg-gradient-to-bl  hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm  text-center  items-center  dark:hover:bg-gray-700 dark:focus:ring-blue-800bg-gray-50  focus:border-blue-500   p-5 appearance-none  border border-gray-300  focus:ring-opacity-75 "
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option  value="">Select Role</option>
            <option  value="CDN">Custodian</option>
            <option  value="ADT">Auditor</option>
          </select>
        </div>

        <div className="mx-60 mt-5 space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Add User
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
            onClick={() => removeUser('ser')}
          >
            Remove User
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
  