import { useTimeline } from "../hooks/useTimeline";
import { useState } from "react";

const typeConfig = {
  Call: { icon: "/call.png", color: "text-green-600" },
  Text: { icon: "/text.png", color: "text-purple-600" },
  Video: { icon: "/video.png", color: "text-blue-600" },
};

export default function Timeline() {
  const { timeline } = useTimeline();
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? timeline : timeline.filter((e) => e.type === filter);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Timeline</h1>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 mb-6 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#244d3f]"
        >
          <option value="All">Filter timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No interactions yet.</p>
            <p className="text-sm mt-1">Go check in with a friend!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 border border-gray-100 hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <img src={typeConfig[entry.type]?.icon} alt={entry.type} className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    <span className={typeConfig[entry.type]?.color}>{entry.type}</span>{" "}
                    with {entry.friendName}
                  </p>
                  <p className="text-xs text-gray-400">{entry.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}