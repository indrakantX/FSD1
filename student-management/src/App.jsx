import { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Search, UsersRound } from 'lucide-react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

const STORAGE_KEY = 'students';

// Read saved students from the browser (so data survives a page refresh)
const loadStudents = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export default function App() {
  // STATE
  const [students, setStudents] = useState(loadStudents); // all records
  const [editingStudent, setEditingStudent] = useState(null); // record being edited
  const [search, setSearch] = useState('');

  // Save to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  // CREATE
  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  // UPDATE
  const updateStudent = (updated) => {
    setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
    setEditingStudent(null);
  };

  // DELETE
  const deleteStudent = (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    setStudents(students.filter((s) => s.id !== id));
    if (editingStudent && editingStudent.id === id) setEditingStudent(null);
  };

  // READ (with search filter)
  const filtered = students.filter((s) =>
    `${s.name} ${s.rollNo} ${s.course}`.toLowerCase().includes(search.toLowerCase())
  );
  const courseCount = new Set(students.map((student) => student.course)).size;
  const postgraduateCount = students.filter((student) => student.course.startsWith('M')).length;

  return (
    <div className="container">
      <header className="topbar">
        <a className="brand" href="#directory" aria-label="Student services directory">
          <span className="brand-mark"><GraduationCap size={21} strokeWidth={1.8} /></span>
          <span className="brand-name">STUDENT SERVICES<span>ACADEMIC OFFICE</span></span>
        </a>
        <span className="topbar-note">ACADEMIC RECORDS</span>
      </header>

      <main id="directory">
        <section className="intro">
          <div>
            <p className="eyebrow">REGISTRATION / DIRECTORY</p>
            <h1>Student directory</h1>
            <p className="intro-note">Academic year 2026–27 <span aria-hidden="true">/</span> Enrollment ledger</p>
          </div>
          <div className="intro-index" aria-hidden="true">01<span>—</span>03</div>
        </section>

        <section className="stats" aria-label="Enrollment overview">
          <div className="stat-item">
            <span className="stat-icon"><UsersRound size={18} /></span>
            <span className="stat-copy"><span className="stat-value">{students.length}</span><span className="stat-label">Students enrolled</span></span>
          </div>
          <div className="stat-item">
            <span className="stat-icon stat-icon-coral"><BookOpen size={18} /></span>
            <span className="stat-copy"><span className="stat-value">{courseCount}</span><span className="stat-label">Courses represented</span></span>
          </div>
          <div className="stat-item">
            <span className="stat-icon stat-icon-gold"><GraduationCap size={18} /></span>
            <span className="stat-copy"><span className="stat-value">{postgraduateCount}</span><span className="stat-label">Postgraduate students</span></span>
          </div>
        </section>

        <StudentForm
          students={students}
          editingStudent={editingStudent}
          onAdd={addStudent}
          onUpdate={updateStudent}
          onCancel={() => setEditingStudent(null)}
        />

        <section className="records-section" aria-labelledby="records-title">
          <div className="records-heading">
            <div>
              <p className="eyebrow">CAMPUS ROSTER</p>
              <h2 id="records-title">Student records <span className="record-count">{filtered.length}</span></h2>
            </div>
            <label className="search-box">
              <Search size={17} aria-hidden="true" />
              <span className="sr-only">Search by name, roll number, or course</span>
              <input
                placeholder="Search records"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && <span className="search-match">{filtered.length} found</span>}
            </label>
          </div>
          <StudentList students={filtered} onEdit={setEditingStudent} onDelete={deleteStudent} />
          <div className="records-footer">
            <span>Showing {filtered.length} of {students.length} records</span>
            <span>STUDENT SERVICES <span className="footer-dot">●</span> REGISTRY</span>
          </div>
        </section>
      </main>
    </div>
  );
}
