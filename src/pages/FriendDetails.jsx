import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTimeline } from "../context/TimelineContext";
import { ArrowLeft, Clock, Archive, Trash2, Edit2 } from "lucide-react";
import { FiPhone, FiMessageSquare, FiVideo } from "react-icons/fi";

const statusStyle = {
  overdue: "bg-red-500 text-white",
  "almost due": "bg-orange-400 text-white",
  "on-track": "bg-green-500 text-white",
};

export default function FriendDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const { addEntry } = useTimeline();

  useEffect(() => {
    fetch("/friends.json")
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((f) => f.id === parseInt(id));
        setFriend(found);
      });
  }, [id]);

  if (!friend)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-[#244d3f] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  const handleCheckIn = (type) => {
    addEntry(friend.name, type);
    toast.success(`✅ ${type} with ${friend.name} logged!`, {
      position: "bottom-right",
    });
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 mb-5 hover:text-[#244d3f] transition"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Left Column */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center border border-gray-100">
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-gray-100"
            />
            <h2 className="text-xl font-bold text-gray-800">{friend.name}</h2>
            <span
              className={`text-xs px-3 py-1 rounded-full mt-2 mb-3 capitalize font-medium ${statusStyle[friend.status]}`}
            >
              {friend.status}
            </span>
            <div className="flex gap-2 flex-wrap justify-center mb-3">
              {friend.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 italic mb-1">"{friend.bio}"</p>
            <p className="text-sm text-gray-400">{friend.email}</p>

            <div className="w-full mt-6 space-y-2">
              <button className="w-full border border-gray-200 rounded-lg py-2 text-sm text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <Clock size={15} /> Snooze 2 Weeks
              </button>
              <button className="w-full border border-gray-200 rounded-lg py-2 text-sm text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <Archive size={15} /> Archive
              </button>
              <button className="w-full border border-red-200 rounded-lg py-2 text-sm text-red-500 flex items-center justify-center gap-2 hover:bg-red-50 transition">
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl shadow-sm p-4 text-center border border-gray-100">
                <p className="text-2xl font-bold text-gray-800">{friend.days_since_contact}</p>
                <p className="text-xs text-gray-400 mt-1">Days Since Contact</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 text-center border border-gray-100">
                <p className="text-2xl font-bold text-gray-800">{friend.goal}</p>
                <p className="text-xs text-gray-400 mt-1">Goal (Days)</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 text-center border border-gray-100">
                <p className="text-base font-bold text-gray-800">{formatDate(friend.next_due_date)}</p>
                <p className="text-xs text-gray-400 mt-1">Next Due</p>
              </div>
            </div>

            {/* Relationship Goal */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700">Relationship Goal</h3>
                <button className="text-xs text-gray-400 border border-gray-200 px-3 py-1 rounded hover:bg-gray-50 flex items-center gap-1">
                  <Edit2 size={12} /> Edit
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Connect every{" "}
                <span className="font-semibold text-gray-800">{friend.goal} days</span>
              </p>
            </div>

            {/* Quick Check-In */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-700 mb-4">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: "Call", icon: <FiPhone size={28} className="text-gray-600" /> },
                  { type: "Text", icon: <FiMessageSquare size={28} className="text-gray-600" /> },
                  { type: "Video", icon: <FiVideo size={28} className="text-gray-600" /> },
                ].map(({ type, icon }) => (
                  <button
                    key={type}
                    onClick={() => handleCheckIn(type)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-[#244d3f] transition"
                  >
                    {icon}
                    <span className="text-sm text-gray-600 font-medium">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
