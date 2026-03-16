import { useQuery } from "@apollo/client/react";
import { GET_PROJECTS, GET_TASKS } from "../../graphql/queries";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function Dashboard() {
  const { data: projectData } = useQuery(GET_PROJECTS);
  const { data: taskData } = useQuery(GET_TASKS);

  const projects = projectData?.projects || [];
  const tasks = taskData?.tasks || [];

  const totalProjects = projects.length;
  const totalTasks = tasks.length;

  const done = tasks.filter((t: any) => t.status === "DONE").length;
  const todo = tasks.filter((t: any) => t.status === "TODO").length;
  const progress = tasks.filter((t: any) => t.status === "IN_PROGRESS").length;

  /* ---------------- STATUS CHART ---------------- */

  const statusData = [
    { name: "Todo", value: todo },
    { name: "In Progress", value: progress },
    { name: "Done", value: done },
  ];

  /* ---------------- PIE DATA ---------------- */

  const completionData = [
    { name: "Completed", value: done },
    { name: "Remaining", value: totalTasks - done },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  /* ---------------- TASKS PER PROJECT ---------------- */

  const tasksPerProject = projects.map((p: any) => ({
    name: p.name,
    tasks: tasks.filter((t: any) => t.project?.id === p.id).length,
  }));

  /* ---------------- TEAM PRODUCTIVITY ---------------- */

  const userMap: any = {};

  tasks.forEach((task: any) => {
    const name = task.assignedTo?.name || "Unassigned";

    if (!userMap[name]) userMap[name] = 0;

    userMap[name]++;
  });

  const teamData = Object.keys(userMap).map((user) => ({
    name: user,
    tasks: userMap[user],
  }));

  /* ---------------- WEEKLY TREND ---------------- */

  const weeklyData = [
    { day: "Mon", tasks: 2 },
    { day: "Tue", tasks: 4 },
    { day: "Wed", tasks: 3 },
    { day: "Thu", tasks: 5 },
    { day: "Fri", tasks: 6 },
    { day: "Sat", tasks: 2 },
    { day: "Sun", tasks: 1 },
  ];

  /* ---------------- RECENT TASKS ---------------- */

  const recentTasks = [...tasks].slice(0, 5);

  return (
    <div className="space-y-10">
      {/* ================= STAT CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-500">
          <p className="text-sm opacity-80">Total Projects</p>
          <h2 className="text-3xl font-bold">{totalProjects}</h2>
        </div>

        <div className="p-6 rounded-xl text-white bg-gradient-to-r from-purple-500 to-pink-500">
          <p className="text-sm opacity-80">Total Tasks</p>
          <h2 className="text-3xl font-bold">{totalTasks}</h2>
        </div>

        <div className="p-6 rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-500">
          <p className="text-sm opacity-80">Completed Tasks</p>
          <h2 className="text-3xl font-bold">{done}</h2>
        </div>
      </div>

      {/* ================= STATUS + PIE ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Task Status Overview</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Completion Ratio</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={completionData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {completionData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= WEEKLY TREND ================= */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Weekly Task Creation Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ================= PROJECT + TEAM ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Tasks per Project</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tasksPerProject}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Team Productivity</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= RECENT TASKS ================= */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Recent Activity</h3>

        <div className="space-y-3">
          {recentTasks.map((task: any) => (
            <div
              key={task.id}
              className="flex justify-between border p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{task.title}</p>

                <p className="text-xs text-gray-500">
                  {task.project?.name || "No Project"}
                </p>
              </div>

              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
