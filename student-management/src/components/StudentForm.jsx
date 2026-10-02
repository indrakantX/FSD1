import { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';

const emptyForm = { rollNo: '', name: '', email: '', course: '', age: '' };

export default function StudentForm({ students, editingStudent, onAdd, onUpdate, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  // When "Edit" is clicked, fill the form with that student's data
  useEffect(() => {
    setForm(editingStudent || emptyForm);
    setError('');
  }, [editingStudent]);

  // Event handling: controlled inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.rollNo || !form.name || !form.email || !form.course || !form.age)
      return 'All fields are required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Enter a valid email address.';
    if (Number(form.age) < 1 || Number(form.age) > 100) return 'Enter a valid age.';
    const duplicate = students.some(
      (s) => s.rollNo === form.rollNo && (!editingStudent || s.id !== editingStudent.id)
    );
    if (duplicate) return 'Roll number already exists.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return setError(msg);

    editingStudent ? onUpdate(form) : onAdd(form);
    setForm(emptyForm);
    setError('');
  };

  return (
    <section className="panel form-panel" aria-labelledby="student-form-title">
      <div className="form-heading">
        <div>
          <p className="eyebrow">{editingStudent ? 'REVISE RECORD' : 'NEW ENROLLMENT'}</p>
          <h2 id="student-form-title">{editingStudent ? 'Update student' : 'Add a student'}</h2>
        </div>
        <span className="required-note"><span aria-hidden="true">*</span> Required fields</span>
      </div>
      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-fields">
          <label className="form-field">
            <span>Roll number</span>
            <input name="rollNo" placeholder="e.g. 24CS104" value={form.rollNo} onChange={handleChange} required />
          </label>
          <label className="form-field">
            <span>Full name</span>
            <input name="name" placeholder="Student name" value={form.name} onChange={handleChange} required />
          </label>
          <label className="form-field">
            <span>Email address</span>
            <input name="email" type="email" placeholder="name@college.edu" value={form.email} onChange={handleChange} required />
          </label>
          <label className="form-field">
            <span>Course</span>
            <select name="course" value={form.course} onChange={handleChange} required>
              <option value="">Select course</option>
              <option>BCA</option>
              <option>BSc IT</option>
              <option>BCom</option>
              <option>MCA</option>
              <option>B.Tech</option>
              <option>M.Tech</option>
            </select>
          </label>
          <label className="form-field">
            <span>Age</span>
            <input name="age" type="number" min="1" max="100" placeholder="Age" value={form.age} onChange={handleChange} required />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" className="primary">
            {editingStudent ? <Save size={16} /> : <Plus size={17} />}
            {editingStudent ? 'Save changes' : 'Add student'}
          </button>
          {editingStudent && (
            <button type="button" className="secondary" onClick={onCancel}><X size={16} /> Cancel</button>
          )}
        </div>
      </form>
      {error && <p className="error" role="alert">{error}</p>}
    </section>
  );
}
