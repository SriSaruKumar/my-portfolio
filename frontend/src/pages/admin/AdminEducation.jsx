import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/AdminHeader';
import API from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import Modal from '../../components/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const AdminEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    cgpa: '',
    description: '',
  });

  const fetchEducation = async () => {
    try {
      const res = await API.get('/education');
      if (res.data.success) setEducation(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleOpenModal = (edu = null) => {
    if (edu) {
      setEditingId(edu._id);
      setFormData({
        institution: edu.institution || '',
        degree: edu.degree || '',
        field: edu.field || '',
        startYear: edu.startYear || '',
        endYear: edu.endYear || '',
        cgpa: edu.cgpa || '',
        description: edu.description || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        institution: '',
        degree: '',
        field: '',
        startYear: '',
        endYear: '',
        cgpa: '',
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/admin/education/${editingId}`, formData);
      } else {
        await API.post('/admin/education', formData);
      }
      setIsModalOpen(false);
      fetchEducation();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving education');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete education entry?')) return;
    try {
      await API.delete(`/admin/education/${id}`);
      fetchEducation();
    } catch (err) {
      alert('Error deleting education');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader title="Manage Education" />

      <main className="p-8 space-y-6 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Education Entries ({education.length})</h2>
          <button onClick={() => handleOpenModal()} className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center gap-2 shadow-md">
            <Plus className="w-4 h-4" />
            <span>Add Education</span>
          </button>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu._id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-start justify-between shadow-sm">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{edu.institution}</h3>
                  <p className="text-sm font-semibold text-blue-500">{edu.degree} in {edu.field} ({edu.startYear} - {edu.endYear})</p>
                  {edu.cgpa && <p className="text-xs text-gray-500 mt-1">CGPA: {edu.cgpa}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenModal(edu)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(edu._id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Education' : 'Add Education'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">Institution</label>
              <input type="text" required value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">Degree</label>
                <input type="text" required value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} placeholder="B.Tech" className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">Field of Study</label>
                <input type="text" value={formData.field} onChange={(e) => setFormData({ ...formData, field: e.target.value })} placeholder="Information Technology" className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">Start Year</label>
                <input type="text" required value={formData.startYear} onChange={(e) => setFormData({ ...formData, startYear: e.target.value })} placeholder="2022" className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">End Year</label>
                <input type="text" value={formData.endYear} onChange={(e) => setFormData({ ...formData, endYear: e.target.value })} placeholder="2026" className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">CGPA</label>
                <input type="text" value={formData.cgpa} onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })} placeholder="8.05" className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-800">Cancel</button>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white">Save Education</button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
};

export default AdminEducation;
