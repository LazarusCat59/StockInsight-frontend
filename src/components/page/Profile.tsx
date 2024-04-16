import React from 'react';
import { Button } from 'react-bootstrap';

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

  return (
    <div className="container mx-auto px-4 py-8">

    </div>
  );
};

export default Profile;
export{};