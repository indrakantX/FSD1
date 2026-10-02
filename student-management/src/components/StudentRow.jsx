import { Pencil, Trash2 } from 'lucide-react';

export default function StudentRow({ student, onEdit, onDelete }) {
  return (
    <tr>
      <td className="roll-cell">{student.rollNo}</td>
      <td className="name-cell">{student.name}</td>
      <td className="email-cell">{student.email}</td>
      <td><span className="course-tag">{student.course}</span></td>
      <td>{student.age}</td>
      <td className="action-cell">
        <div className="row-actions">
          <button className="icon-button edit" title="Edit student" aria-label={`Edit ${student.name}`} onClick={() => onEdit(student)}><Pencil size={15} /></button>
          <button className="icon-button delete" title="Delete student" aria-label={`Delete ${student.name}`} onClick={() => onDelete(student.id)}><Trash2 size={15} /></button>
        </div>
      </td>
    </tr>
  );
}
