const NotificationDropdown = () => {
  return (
    <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Notifications</h3>
      <ul className="space-y-2">
        <li className="p-2 hover:bg-gray-100 rounded-md">
          🎉 New message from therapist
        </li>
        <li className="p-2 hover:bg-gray-100 rounded-md">
          💬 Your feedback has been received
        </li>
        <li className="p-2 hover:bg-gray-100 rounded-md">
          ⚙️ Profile settings updated
        </li>
      </ul>
    </div>
  );
};

export default NotificationDropdown;


// const notifications = [
//   { id: 1, text: "New message from Dr. Jane", time: "2m ago" },
//   { id: 2, text: "Your session report is ready", time: "10m ago" },
//   { id: 3, text: "Payment received successfully", time: "1h ago" },
// ];

// const NotificationDropdown = ({ onClose }) => {
//   return (
//     <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden z-50">
//       <div className="p-3 border-b text-gray-700 font-semibold">
//         Notifications
//       </div>
//       <div className="max-h-64 overflow-y-auto">
//         {notifications.length > 0 ? (
//           notifications.map((n) => (
//             <div
//               key={n.id}
//               className="p-3 hover:bg-gray-50 flex flex-col border-b last:border-0"
//             >
//               <span className="text-sm text-gray-800">{n.text}</span>
//               <span className="text-xs text-gray-500">{n.time}</span>
//             </div>
//           ))
//         ) : (
//           <p className="p-3 text-gray-500 text-sm text-center">
//             No new notifications
//           </p>
//         )}
//       </div>
//       <button
//         onClick={onClose}
//         className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50"
//       >
//         Close
//       </button>
//     </div>
//   );
// };

// export default NotificationDropdown;
