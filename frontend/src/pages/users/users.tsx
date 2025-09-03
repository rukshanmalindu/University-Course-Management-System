import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import api from '../../lib/store/api/client';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  // Add other fields as needed
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users')
      .then(res => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map(user => (
          <Card key={user.id} className="p-4 flex flex-col space-y-2">
            <div className="font-semibold">{user.firstName} {user.lastName}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
            <div className="text-sm capitalize">Role: {user.role}</div>
            {/* Add more fields or actions as needed */}
          </Card>
        ))}
      </div>
    </div>
  )
}