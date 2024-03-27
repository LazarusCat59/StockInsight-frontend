import React from 'react';
import { Navbar } from '../Index1';

const Request: React.FC = () => {
  return (
    <div className="bg-white flex-auto ">
      <div className="max-w-lg  justify-center  ">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">New Stock Request</h2>
          <p className="text-lg mb-8">Please fill out this form to request new stock. Once you submit the form, it will be sent to the Head Of Department for approval</p>
        </div>
        <form>
          <div className="mb-4">
            <input type="text" placeholder="Item name" className="w-full h-12 border border-gray-300 rounded-md px-4 bg-gray-100 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <input type="text" placeholder="Item description" className="w-full h-12 border border-gray-300 rounded-md px-4 bg-gray-100 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <select className="w-full h-12 border border-gray-300 rounded-md px-4 bg-gray-100 focus:outline-none focus:border-blue-500">
              <option value="" disabled selected>Select location</option>
              <option value="Lab1">Lab1</option>
              <option value="Lab2">Lab2</option>
              <option value="Lab3">Lab3</option>
              <option value="Class">Class</option>
              <option value="Staff Room">Staff Room</option>
            </select>
          </div>
          <div className="text-center">
            <button type="submit" className="w-full h-12 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Request;
