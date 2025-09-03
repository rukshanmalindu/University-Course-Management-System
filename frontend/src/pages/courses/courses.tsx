import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../lib/store/api/client';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  // Add other fields as needed
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    // Fetch all courses
    api.get('/courses')
      .then(res => setCourses(res.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (id) {
      // Fetch course detail if id is present
      api.get(`/courses/${id}`)
        .then(res => setSelectedCourse(res.data))
        .catch(() => setSelectedCourse(null));
    } else {
      setSelectedCourse(null);
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ul className="space-y-2">
            {courses.map(course => (
              <li key={course.id}>
                <Card
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <div className="font-semibold">{course.title}</div>
                  <div className="text-sm text-gray-500">{course.instructor}</div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {selectedCourse ? (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-2">{selectedCourse.title}</h2>
              <p className="mb-2">{selectedCourse.description}</p>
              <div className="text-sm text-gray-500">
                Instructor: {selectedCourse.instructor}
              </div>
              <Button className="mt-4" onClick={() => navigate('/courses')}>
                Back to Courses
              </Button>
            </Card>
          ) : (
            <div className="text-gray-400">Select a course to view details.</div>
          )}
        </div>
      </div>
    </div>
  );
}