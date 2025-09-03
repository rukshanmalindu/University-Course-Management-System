import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import api from '../../lib/store/api/client';
import { useAuthStore } from '../../lib/store/auth.store';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  // Add other fields as needed
}

export default function Profile() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/profile')
      .then(res => setProfile(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <Card className="p-6">
        <div className="mb-4">
          <div className="text-lg font-semibold">Name</div>
          <div>{profile?.firstName} {profile?.lastName}</div>
        </div>
        <div className="mb-4">
          <div className="text-lg font-semibold">Email</div>
          <div>{profile?.email}</div>
        </div>
        <div className="mb-4">
          <div className="text-lg font-semibold">Role</div>
          <div className="capitalize">{profile?.role}</div>
        </div>
        {/* Add more profile fields or edit functionality as needed */}
        <Button>Edit Profile</Button>
      </Card>
    </div>
  )
}