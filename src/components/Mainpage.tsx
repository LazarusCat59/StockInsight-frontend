import React from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

const Mainpage = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/login`; 
    navigate(path);
  }
  // Function to handle redirection for each user type
  const redirectToLogin = (userType: string) => {
    
    /*
    switch (userType) {
      case 'HOD':
         // Redirect to HOD login page
        break;
      case 'Auditor':
        window.location.href = '/login'; // Redirect to Auditor login page
        break;
      case 'Custodian':
        window.location.href = '/login'; // Redirect to Custodian login page
        break;
      default:
        break;
    }*/
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white">
        <body>
          <div className="flex h-screen flex-col items-center justify-center">
            <div className="mb-8 text-3xl font-bold">Albertian Institute of Science and Technology (AISAT)</div>
            <div className="mb-6 text-xl">Login</div>
            <div className="flex flex-col space-y-4">
              <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700" onClick={routeChange}>LOGIN</button>
              
            </div>
          </div>
        </body>
      </div>
    </div>
  );
};

export default Mainpage;


// Add an empty export to make it a module
export {};
