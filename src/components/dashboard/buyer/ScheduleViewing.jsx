import React, { useState } from 'react';

const ScheduleViewing = () => {
  const [viewings, setViewings] = useState([
    { id: 1, property: 'Luxury 3-BHK Villa', agent: 'Saleha Baig', date: '30 May, 2026', time: '02:00 PM', status: 'Confirmed' },
    { id: 2, property: 'Penthouse Studio', agent: 'John Doe', date: '02 June, 2026', time: '11:00 AM', status: 'Pending' }
  ]);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-xl font-serif font-bold text-[#0A1A2F] uppercase border-l-4 border-[#C9A03D] pl-3">
          Viewing Schedules
        </h3>
        <p className="text-gray-400 text-xs font-semibold uppercase mt-1">Track your upcoming private site tours and luxury walkthroughs</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-widest uppercase bg-gray-50">
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Agent/Host</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium">
              {viewings.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50/50 transition">
                  <td className="py-4 px-4 font-bold text-[#0A1A2F]">{v.property}</td>
                  <td className="py-4 px-4 text-gray-500">{v.agent}</td>
                  <td className="py-4 px-4 font-semibold text-gray-700">{v.date} aur {v.time}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      v.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleViewing;