import { useNavigate } from "react-router-dom";

const JobRow = ({ i, job, onEdit, onDelete }) => {
  const navigate = useNavigate()

  return (
    <>
      <tr className="border-b border-gray-300 text-center cursor-pointer" onClick={() => { navigate(`/job/${job?.id}`)}}>
        <td className="p-3 border border-gray-300">{i}</td>
        <td className="p-3 border border-gray-300">{job.job_title}</td>
        <td className="p-3 border border-gray-300">{job.company_name}</td>
        <td className="p-3 border border-gray-300">{job.salary}</td>
        <td className="p-3 border border-gray-300">{job.location}</td>
        <td className={`p-3 border border-gray-300 font-semibold ${job.status === "Accepted" ? "text-green-500" : "text-gray-500"}`}>
          {job.status}
        </td>
        <td className="p-3 border border-gray-300">{job.deadline}</td>
        <td className="p-3 border border-gray-300">{job.date_applied}</td>
        <td className="p-3 border border-gray-300">{job.follow_up}</td>
        <td className="p-3 border border-gray-300 flex justify-center gap-2">
          <button 
            onClick={() => onEdit()} 
            className="px-3 py-2 mr-2 rounded-md cursor-pointer border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 shadow-sm"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete()} 
            className="px-3 py-2 rounded-md cursor-pointer text-white bg-gray-800 hover:bg-gray-700 transition-all duration-200 shadow-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default JobRow;
