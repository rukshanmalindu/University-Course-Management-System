import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import api from '../../lib/store/api/client';
import { Button } from '../../components/ui/button';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
}

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/courses/${id}`)
        .then(res => setCourse(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!course) return <div>Course not found.</div>;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <Card className="p-6">
        <div className="mb-2">{course.description}</div>
        <div className="text-sm text-gray-500">Instructor: {course.instructor}</div>
        <Button className="mt-4" onClick={() => navigate('/courses')}>
          Back to Courses
        </Button>
      </Card>
    </div>
  );
}