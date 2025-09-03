import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import api from '../../../lib/store/api/client';


interface Result {
  id: string;
  studentName: string;
  courseTitle: string;
  score: number;
  grade: string;
  // Add other fields as needed
}

export default function Results() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/results/${id}`)
        .then(res => setResult(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!result) return <div>Result not found.</div>;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Result Details</h1>
      <Card className="p-6">
        <div className="mb-2 font-semibold">Student: {result.studentName}</div>
        <div className="mb-2">Course: {result.courseTitle}</div>
        <div className="mb-2">Score: {result.score}</div>
        <div className="mb-2">Grade: {result.grade}</div>
        {/* Add more fields as needed */}
        <Button className="mt-4" onClick={() => navigate('/results')}>
          Back to Results
        </Button>
      </Card>
    </div>
  );
}