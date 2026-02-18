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
