// import React, { useState } from 'react';
// import { PlusCircle } from 'lucide-react';
// import SessionCard from '../components/profile/SessionCard';
// import SessionForm from '../components/SessionForm';

// function SessionPage() {
//   const [showForm, setShowForm] = useState(false);
//   const [sessions, setSessions] = useState([]);

//   const handleAddSession = (formData) => {
//     const newSession = {
//       id: crypto.randomUUID(),
//       ...formData,
//       reviewed: false,
//     };
    
//     setSessions([...sessions, newSession]);
//     setShowForm(false);
//   };

//   const handleDeleteSession = (id) => {
//     setSessions(sessions.filter(session => session.id !== id));
//   };

//   const handleEditSession = (id, updates) => {
//     setSessions(sessions.map(session => 
//       session.id === id ? { ...session, ...updates } : session
//     ));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
//           <button
//             onClick={() => setShowForm(true)}
//             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <PlusCircle className="mr-2" size={20} />
//             Add Session
//           </button>
//         </div>

//         {showForm ? (
//           <div className="mb-8">
//             <SessionForm
//               onSubmit={handleAddSession}
//               onCancel={() => setShowForm(false)}
//             />
//           </div>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {sessions.map(session => (
//               <SessionCard
//                 key={session.id}
//                 session={session}
//                 onDelete={handleDeleteSession}
//                 onEdit={handleEditSession}
//               />
//             ))}
//             {sessions.length === 0 && (
//               <div className="col-span-full text-center py-12 text-gray-500">
//                 No sessions scheduled yet. Click "Add Session" to create one!
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SessionPage;
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import SessionList from '../components/HelperComponents/SessionList';
import SessionForm from '../components/SessionForm';
import SessionFilter from '../components/HelperComponents/SessionFilter';

function SessionPage() {
  const [showForm, setShowForm] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('upcoming');

  const handleAddSession = (formData) => {
    const newSession = {
      id: crypto.randomUUID(),
      ...formData,
      reviewed: false,
      status: 'upcoming',
    };
    
    setSessions([...sessions, newSession]);
    setShowForm(false);
  };

  const handleStatusChange = (sessionId, newStatus) => {
    setSessions(sessions.map(session => 
      session.id === sessionId ? { ...session, status: newStatus } : session
    ));
  };

  const handleEditSession = (id, updates) => {
    setSessions(sessions.map(session => 
      session.id === id ? { ...session, ...updates } : session
    ));
  };

  const getFilterTitle = (status) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming Sessions';
      case 'completed':
        return 'Completed Sessions';
      case 'canceled':
        return 'Canceled Sessions';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Session Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="mr-2" size={20} />
            Add Session
          </button>
        </div>

        {showForm ? (
          <div className="mb-8">
            <SessionForm
              onSubmit={handleAddSession}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : (
          <>
            <SessionFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
            
            <div className="transition-all duration-300">
              <SessionList
                title={getFilterTitle(activeFilter)}
                sessions={sessions}
                status={activeFilter}
                onStatusChange={handleStatusChange}
                onEdit={handleEditSession}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SessionPage;
