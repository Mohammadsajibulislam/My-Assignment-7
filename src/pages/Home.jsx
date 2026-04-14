import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

const statusStyle = {
  overdue: "bg-red-500 text-white",
  "almost due": "bg-orange-400 text-white",
  "on-track": "bg-green-500 text-white",
};

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetch("/friends.json")
        .then((r) => r.json())
        .then((data) => {
          setFriends(data);
          setLoading(false);
        });
    }, 800);
  }, []);

  const total = friends.length;
  const onTrack = friends.filter((f) => f.status === "on-track").length;
  const needAttention = friends.filter((f) => f.status !== "on-track").length;
  const interactions = 12;

  const summaryCards = [
    { label: "Total Friends", value: total },
    { label: "On Track", value: onTrack },
    { label: "Need Attention", value: needAttention },
    { label: "Interactions This Month", value: interactions },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="text-center py-14 px-4 bg-white border-b border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 mb-6 text-sm max-w-md mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>
        <button className="bg-[#244d3f] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 mx-auto hover:bg-[#1a3c2f] transition font-medium text-sm">
          <UserPlus size={16} /> Add a Friend
        </button>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center"
            >
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-xs text-gray-400 mt-1">{card.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Friends Grid */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Your Friends</h2>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-4 border-[#244d3f] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <div
                key={friend.id}
                onClick={() => navigate(`/friend/${friend.id}`)}
                className="bg-white rounded-xl p-4 shadow-sm text-center cursor-pointer hover:shadow-md transition border border-gray-100"
              >
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-gray-100"
                />
                <p className="font-semibold text-gray-800 text-sm">{friend.name}</p>
                <p className="text-xs text-gray-400 mb-2">{friend.days_since_contact}d ago</p>
                <div className="flex flex-wrap gap-1 justify-center mb-2">
                  {friend.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full capitalize font-medium ${statusStyle[friend.status]}`}
                >
                  {friend.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}