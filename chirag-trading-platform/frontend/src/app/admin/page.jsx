"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [replyId, setReplyId] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [newSocial, setNewSocial] = useState({ platform: '', url: '', username: '', followers: '', icon: '', isActive: true });
  const [adminContact, setAdminContact] = useState({ email: '', phone: '', address: '' });
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ title: '', description: '', details: '', icon: 'FaChartLine', isActive: true });

  // Fetch admin contact details
  const fetchAdminContact = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/adminContact');
      const data = await res.json();
      setAdminContact(data);
    } catch (e) {
      console.error('Failed to fetch admin contact', e);
    }
  };
  const fetchContacts = async () => {
    const res = await fetch('http://localhost:5000/api/contacts');
    const data = await res.json();
    setContacts(data);
  };

  // Fetch services
  const fetchServices = async () => {
    const res = await fetch('http://localhost:5000/api/services');
    const data = await res.json();
    setServices(Array.isArray(data) ? data : []);
  };

  // Fetch social links
  const fetchSocial = async () => {
    const res = await fetch('http://localhost:5000/api/social');
    const data = await res.json();
    setSocialLinks(Array.isArray(data) ? data : []);
  };
  // Save admin contact details
  const saveAdminContact = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/adminContact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminContact),
    });
    // Re-fetch to update UI
    fetchAdminContact();
    alert('Admin contact saved');
  };

  useEffect(() => {
    fetchContacts();
    fetchSocial();
    fetchAdminContact();
    fetchServices();
  }, []);

  const deleteContact = async (id) => {
    await fetch(`http://localhost:5000/api/contacts/${id}`, { method: 'DELETE' });
    fetchContacts();
  };

  const sendReply = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/contacts/${replyId}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ replyMessage })
    });
    setReplyId(null);
    setReplyMessage('');
    alert('Reply sent (if email configured)');
  };

  const addOrUpdateSocial = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/social', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSocial)
    });
    setNewSocial({ platform: '', url: '', username: '', followers: '', icon: '', isActive: true });
    fetchSocial();
  };

  const deleteSocial = async (id) => {
    await fetch(`http://localhost:5000/api/social/${id}`, { method: 'DELETE' });
    fetchSocial();
  };

  const addOrUpdateService = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService)
      });
      
      if (!res.ok) throw new Error('Failed to save service');
      
      setNewService({ title: '', description: '', details: '', icon: 'FaChartLine', isActive: true });
      fetchServices();
      alert('Service saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving service. Check if your backend server is running and connected to MongoDB.');
    }
  };

  const deleteService = async (id) => {
    await fetch(`http://localhost:5000/api/services/${id}`, { method: 'DELETE' });
    fetchServices();
  };

  return (
    <section className="py-12 bg-background min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Messages Management */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold mb-6 text-glow">User Messages</h2>
                    <div className="overflow-x-auto">
            <table className="w-full table-auto min-w-[600px] mb-8">
              <thead className="bg-darkCard">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Message</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{c.name}</td>
                    <td className="px-4 py-2 text-white">{c.email}</td>
                    <td className="px-4 py-2 text-white">{c.phone}</td>
                    <td className="px-4 py-2 text-white">{c.message}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button onClick={() => deleteContact(c.id)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-500">Delete</button>
                      <button onClick={() => setReplyId(c.id)} className="px-3 py-1 bg-neonGreen text-black rounded hover:bg-neonGreen/80">Reply</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reply Modal */}
          {replyId && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
              <div className="bg-darkCard p-6 rounded-lg w-96">
                <h3 className="text-xl mb-4">Reply to Message</h3>
                <form onSubmit={sendReply}>
                  <textarea
                    className="w-full h-32 bg-black/30 border border-neonGreen rounded p-2 text-white"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Write your reply..."
                  />
                  <div className="flex justify-end mt-4 space-x-2">
                    <button type="button" onClick={() => setReplyId(null)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-neonGreen text-black rounded">Send</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </motion.div>

        {/* Social Links Management */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <h2 className="text-3xl font-bold mb-6 text-glow">Social Links</h2>
                    <div className="overflow-x-auto">
            <table className="w-full table-auto min-w-[600px] mb-8">
              <thead className="bg-darkCard">
                <tr>
                  <th className="px-4 py-2">Platform</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">URL</th>
                  <th className="px-4 py-2">Followers</th>
                  <th className="px-4 py-2">Active</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {socialLinks.map((s) => (
                  <tr key={s.id} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{s.platform}</td>
                    <td className="px-4 py-2 text-white">{s.username}</td>
                    <td className="px-4 py-2 text-white"><a href={s.url} target="_blank" rel="noreferrer" className="underline">Link</a></td>
                    <td className="px-4 py-2 text-white">{s.followers}</td>
                    <td className="px-4 py-2 text-white">{s.isActive ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button onClick={() => deleteSocial(s.id)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add / Update Social Link Form */}
          <form onSubmit={addOrUpdateSocial} className="glass-panel p-6 rounded-xl">
            <h3 className="text-xl mb-4 text-glow">Add / Update Social Link</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Platform" className="bg-black/30 border border-neonGreen rounded p-2 text-white" value={newSocial.platform} onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })} required />
              <input placeholder="Username" className="bg-black/30 border border-neonGreen rounded p-2 text-white" value={newSocial.username} onChange={(e) => setNewSocial({ ...newSocial, username: e.target.value })} />
              <input placeholder="URL" className="bg-black/30 border border-neonGreen rounded p-2 text-white" value={newSocial.url} onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })} required />
              <input placeholder="Followers" className="bg-black/30 border border-neonGreen rounded p-2 text-white" value={newSocial.followers} onChange={(e) => setNewSocial({ ...newSocial, followers: e.target.value })} />
              <input placeholder="Icon (optional)" className="bg-black/30 border border-neonGreen rounded p-2 text-white" value={newSocial.icon} onChange={(e) => setNewSocial({ ...newSocial, icon: e.target.value })} />
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={newSocial.isActive} onChange={(e) => setNewSocial({ ...newSocial, isActive: e.target.checked })} />
                <span className="text-white">Active</span>
              </label>
            </div>
            <button type="submit" className="mt-4 px-6 py-2 bg-neonGreen text-black font-bold rounded hover:bg-neonGreen/80">Save</button>
          </form>
        </motion.div>

        {/* Services Management */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-glow">Services</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto min-w-[600px] mb-8">
              <thead className="bg-darkCard">
                <tr>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Icon</th>
                  <th className="px-4 py-2">Active</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{s.title}</td>
                    <td className="px-4 py-2 text-white">{s.description}</td>
                    <td className="px-4 py-2 text-white">{s.icon}</td>
                    <td className="px-4 py-2 text-white">{s.isActive ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button onClick={() => deleteService(s.id)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add / Update Service Form */}
          <form onSubmit={addOrUpdateService} className="glass-panel p-6 rounded-xl">
            <h3 className="text-xl mb-4 text-glow">Add / Update Service</h3>
            <div className="grid grid-cols-1 gap-4">
              <input placeholder="Title" className="bg-black/30 border border-neonGreen rounded p-2 text-white" value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })} required />
              <input placeholder="Short Description" className="bg-black/30 border border-neonGreen rounded p-2 text-white" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} required />
              <textarea placeholder="Full Details" className="bg-black/30 border border-neonGreen rounded p-2 text-white" rows={3} value={newService.details} onChange={(e) => setNewService({ ...newService, details: e.target.value })} required />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Icon Name (e.g. FaChartLine)" className="bg-black/30 border border-neonGreen rounded p-2 text-white" value={newService.icon} onChange={(e) => setNewService({ ...newService, icon: e.target.value })} />
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={newService.isActive} onChange={(e) => setNewService({ ...newService, isActive: e.target.checked })} />
                  <span className="text-white">Active</span>
                </label>
              </div>
            </div>
            <button type="submit" className="mt-4 px-6 py-2 bg-neonGreen text-black font-bold rounded hover:bg-neonGreen/80">Save Service</button>
          </form>
        </motion.div>

        {/* Admin Contact Management */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <h2 className="text-3xl font-bold mb-6 text-glow">Admin Contact Details</h2>
          <form onSubmit={saveAdminContact} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-darkCard p-6 rounded-xl">
            <input placeholder="Email" className="bg-black/30 border border-neonGreen rounded p-2 text-white" value={adminContact.email} onChange={(e) => setAdminContact({ ...adminContact, email: e.target.value })} required />
            <input placeholder="Phone" className="bg-black/30 border border-neonGreen rounded p-2 text-white" value={adminContact.phone} onChange={(e) => setAdminContact({ ...adminContact, phone: e.target.value })} />
            <textarea placeholder="Address" className="bg-black/30 border border-neonGreen rounded p-2 text-white col-span-2" rows={3} value={adminContact.address} onChange={(e) => setAdminContact({ ...adminContact, address: e.target.value })} />
            <button type="submit" className="mt-4 px-6 py-2 bg-neonGreen text-black font-bold rounded hover:bg-neonGreen/80">Save</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
