import { useTimeline } from "../context/TimelineContext";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#7c5cbf", "#244d3f", "#4ade80"];

export default function Stats() {
  const { timeline } = useTimeline();

  const counts = { Text: 0, Call: 0, Video: 0 };
  timeline.forEach((e) => {
    if (counts[e.type] !== undefined) counts[e.type]++;
  });

  const data = Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .filter((d) => d.value > 0);

  const hasData = data.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Friendship Analytics</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-500 mb-4 font-medium">By Interaction Type</p>

          {hasData ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <p className="text-lg">No data yet.</p>
              <p className="text-sm mt-1">Log some interactions from a friend's page first!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
