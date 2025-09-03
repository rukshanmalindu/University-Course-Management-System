import { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/card';
import api from '../../../lib/store/api/client';

interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  totalInstructors: number;
  // Add other stats fields as needed
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats')
      .then(res => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-lg font-semibold">Total Courses</div>
          <div className="text-2xl">{stats?.totalCourses ?? 0}</div>
        </Card>
        <Card className="p-6">
          <div className="text-lg font-semibold">Total Students</div>
          <div className="text-2xl">{stats?.totalStudents ?? 0}</div>
        </Card>
        <Card className="p-6">
          <div className="text-lg font-semibold">Total Instructors</div>
          <div className="text-2xl">{stats?.totalInstructors ?? 0}</div>
        </Card>
        {/* Add more cards for other stats if needed */}
      </div>
    </div>
  )
}