import { FolderKanban } from "lucide-react";

export default function ProjectCard({ project }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex items-center gap-2 mb-3">
        <FolderKanban size={18} className="text-blue-500" />

        <h3 className="font-semibold text-lg">{project.name}</h3>
      </div>

      <p className="text-gray-600 text-sm">{project.description}</p>
    </div>
  );
}
