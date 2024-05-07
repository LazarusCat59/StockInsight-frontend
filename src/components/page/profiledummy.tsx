import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  role: string;
  department: string;
  qualification: string;
  email: string;
  areaOfInterest: string;
  dateOfJoining: string;
  appointmentType: string;
}

const Profiledummy: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState<User>({
    name: 'Jeswin',
    role: 'Associate Professor and Head of Department',
    department: 'Computer Science and Engineering',
    qualification: 'Ph.D Computer Science and Engineering, PGDCL',
    email: 'jeswinroydcouth@aisat.ac.in',
    areaOfInterest: 'Cyber Security',
    dateOfJoining: '02.06.2014',
    appointmentType: 'Regular',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const navigate = useNavigate(); 
  const routeToAddUser = () => { 
    navigate('/adduser'); 
  };

  const handleEditProfile = () => {
    setEditing(!editing);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <div className="bg-white p-6 rounded shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">User Information</h3>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-auto">
              <label className="block mb-2">Name:</label>
              <input type="text" name="name" value={userData.name} onChange={handleChange} className="input w-64" readOnly={!editing} />
            </div>
            <div className="col-span-2 sm:col-auto">
              <label className="block mb-2">Designation:</label>
              <textarea name="role" value={userData.role} onChange={handleChange} className="input w-64 h-16 resize-none" readOnly={!editing} />
            </div>
            <div className="col-span-2 sm:col-auto">
              <label className="block mb-2">Department:</label>
              <textarea name="department" value={userData.department} onChange={handleChange} className="input w-64 h-16 resize-none" readOnly={!editing} />
            </div>
            <div className="col-span-2 sm:col-auto">
              <label className="block mb-2">Qualification:</label>
              <textarea name="qualification" value={userData.qualification} onChange={handleChange} className="input w-64 h-16 resize-none" readOnly={!editing} />
            </div>
            <div className="col-span-2 sm:col-auto">
              <label className="block mb-2">Email:</label>
              <input type="text" name="email" value={userData.email} onChange={handleChange} className="input w-64" readOnly={!editing} />
            </div>
            <div className="col-span-2 sm:col-auto">
              <label className="block mb-2">Area of Interest:</label>
              <input type="text" name="areaOfInterest" value={userData.areaOfInterest} onChange={handleChange} className="input w-64" readOnly={!editing} />
            </div>
            <div className="col-span-2 sm:col-auto">
              <label className="block mb-2">Date of Joining:</label>
              <input type="text" name="dateOfJoining" value={userData.dateOfJoining} onChange={handleChange} className="input w-64" readOnly={!editing} />
            </div>
            <div className="col-span-2 sm:col-auto">
              <label className="block mb-2">Type of Appointment:</label>
              <input type="text" name="appointmentType" value={userData.appointmentType} onChange={handleChange} className="input w-64" readOnly={!editing} />
            </div>
          </div>
        </form>
      </div>
      <div className="text-center mt-8">
        <Button onClick={handleEditProfile} className="px-4 py-2  rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
          {editing ? 'Save Profile' : 'Edit Profile'}
        </Button>
        <Button onClick={routeToAddUser} className="ml-4 px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
          Add User
        </Button>
      </div>
    </div>
  );
};

export default Profiledummy;
