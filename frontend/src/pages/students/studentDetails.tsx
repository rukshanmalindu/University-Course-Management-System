import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../lib/store/api/client';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';


interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Add other fields as needed
}

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/students/${id}`)
        .then(res => setStudent(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!student) return <div>Student not found.</div>;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Student Details</h1>
      <Card className="p-6">
        <div className="mb-2 font-semibold">Name: {student.firstName} {student.lastName}</div>
        <div className="mb-2">Email: {student.email}</div>
        {/* Add more fields as needed */}
        <Button className="mt-4" onClick={() => navigate('/students')}>
          Back to Students
        </Button>
      </Card>
    </div>
  );
}