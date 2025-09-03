import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import api from '../../lib/store/api/client';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Add other fields as needed
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/students')
      .then(res => setStudents(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Students</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {students.map(student => (
          <Card key={student.id} className="p-4 flex flex-col space-y-2">
            <div className="font-semibold">{student.firstName} {student.lastName}</div>
            <div className="text-sm text-gray-500">{student.email}</div>
            <Button
              variant="outline"
              className="mt-2 self-start"
              onClick={() => navigate(`/students/${student.id}`)}
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}