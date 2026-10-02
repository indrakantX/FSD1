import StudentRow from './StudentRow';
import { UsersRound } from 'lucide-react';

export default function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon"><UsersRound size={20} /></span>
        <p>No student records found</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="student-table">
        <thead>
          <tr>
            <th>Roll number</th><th>Student</th><th>Email address</th><th>Course</th><th>Age</th><th><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <StudentRow key={s.id} student={s} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
