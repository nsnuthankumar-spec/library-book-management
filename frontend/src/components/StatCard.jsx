export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow text-white">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl font-bold mt-1">
        {icon} {value}
      </div>
    </div>
  );
}
