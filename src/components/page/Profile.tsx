import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  role: string;
  department: string;
}


const Profile: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  // Simulate user data fetching (replace with your actual logic)
  React.useEffect(() => {

 

    const userData = {
      name: 'Jeswin',
      role: 'HOD',
      department: 'CS Department',
    };
    setCurrentUser(userData);
  }, []);
  let navigate = useNavigate(); 
  const routenew = () =>{ 
    let path = `/adduser`; 
    navigate(path);
  }

  return (
    <div className="flex  justify-end  h-screen  mx-auto px-4 py-8">
      <div>
        <input type="ADDUSER" placeholder='ADDUSER' className="text-white bg-gray-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={routenew}/>
      </div>
    </div>
  );
};

export default Profile;
export{};