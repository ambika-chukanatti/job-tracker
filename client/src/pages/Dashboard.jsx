import React, { useEffect, useState } from "react";
import { JobRow, EditJobModal } from "../components";
const api_url = "http://localhost:3000/api"
const token = sessionStorage.getItem("token")

const Dashboard = ({ location }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("dateSaved");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isEditJob, setIsEditJob] = useState(true); 
  const [jobs, setJobs] = useState([])
  const [companies, setCompanies] = useState([])
  const [ji, setJi] = useState(null);

  const getJobs = async() => {
    try{
        const response = await fetch(`${api_url}/job`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error(data.message || "Failed to verify user");
        }

        setJobs(data)
    }catch(err){
        console.error(err)
    }
  }

  useEffect(()=>{
    getJobs()
  },[location])

  const statusOptions = ["Bookmarked", "Applied", "No Response", "Not Selected", "I Withdrew", "Interviewing", "Negotiating", "Accepted"];

  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const filteredJobs = jobs.filter(job =>
    (filterStatus === "All" || job.status.toLowerCase() === filterStatus.toLowerCase()) &&
    (job.job_title.toLowerCase().includes(search.toLowerCase()) ||
     job.company_name.toLowerCase().includes(search.toLowerCase()) ||
     job.location.toLowerCase().includes(search.toLowerCase()) ||
     String(job.salary).includes(search.toLowerCase()) ||
     job.status.toLowerCase().includes(search.toLowerCase()) ||
     String(job.deadline).toLowerCase().includes(search.toLowerCase()) ||
     String(job.date_applied).toLowerCase().includes(search.toLowerCase()) ||
     String(job.follow_up).toLowerCase().includes(search.toLowerCase()))
  );
  
  const sortedJobs = sortBy
    ? [...filteredJobs].sort((a, b) => {
        const valA = a[sortBy] || "";
        const valB = b[sortBy] || "";
        return valA.localeCompare(valB);
      })
    : filteredJobs;  

  const handleEdit = (job, ji) => {
    setJi(ji)
    setSelectedJob(job);
    setIsEditJob(true);
    setEditModalOpen(true);
  }

  const handleAddNewJob = () => {
    setIsEditJob(false)
    setEditModalOpen(true);
  }

  const handleSave = async(formData, id, ji) => {
    const url = isEditJob ? `${api_url}/job/${id}` : `${api_url}/job`
    const method = isEditJob ? "PUT" : "POST"
    try{
      const response = await fetch(url, {
          method: method,
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          },
          body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
          throw new Error(data.message || "Failed to verify user");
      }

      console.log(data)
      
      if(isEditJob){
        const updatedJobs = [...jobs];
        updatedJobs[ji] = data.job;
        setJobs(updatedJobs);
      }else{
        setJobs([...jobs, data.job])
      }

    }catch(err){
        console.error(err)
    }
  }

  const handleDelete = async(id, ji) => {
    try{
      const response = await fetch(`${api_url}/job/${id}`, {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          }
      });
  
      const data = await response.json();
  
      if (!response.ok) {
          throw new Error(data.message || "Failed to verify user");
      }

      console.log(data)
      
      const updatedJobs = [...jobs];
      updatedJobs.pop(ji,1)
      setJobs(updatedJobs);

    }catch(err){
        console.error(err)
    }
  }

  return (
    <div className="px-8 py-6 bg-white shadow-md rounded-lg">
      {/* Status Tracker */}
      <div className="flex justify-between mb-4">
        {statusOptions.map(status => (
          <div key={status} className="p-3 bg-[#003049] rounded text-center flex-1 mx-1">
            <p className="text-xl font-bold">{statusCounts[status] || 0}</p>
            <p className="">{status}</p>
          </div>
        ))}
      </div>

      {/* Search & Controls */}
      <div className="flex justify-between mb-8 mt-16">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search jobs..."
            className="border-2 border-gray-300 p-2 rounded w-3/4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end">
          <div className="flex items-center space-x-2 mr-4">
            <span className="text-gray-400 font-medium">Sort by:</span>
            <select className="border-2 border-gray-300 p-2 rounded cursor-pointer bg-gray-800 text-white" onChange={(e) => setSortBy(e.target.value)}>
              <option value="">All</option>
              <option value="deadline">Deadline</option>
              <option value="date_applied">Date Applied</option>
              <option value="follow_up">Follow Up</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 font-medium">Filter:</span>
            <select className="border-2 border-gray-300 p-2 rounded cursor-pointer bg-gray-800 text-white" onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All</option>
              <option value="Bookmarked">Bookmarked</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Negotiating">Negotiating</option>
              <option value="Accepted">Accepted</option>
              <option value="I Withdrew">I Withdrew</option>
              <option value="Not Selected">Not Selected</option>
              <option value="No Response">No Response</option>
            </select>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded ml-4 cursor-pointer" onClick={handleAddNewJob}>+ Add New Job</button>
        </div>
      </div>

      {/* Jobs Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border border-gray-300 text-center">
            <th className="p-3 border-2 border-gray-300">Sr No</th>
            <th className="p-3 border-2 border-gray-300">Job Position</th>
            <th className="p-3 border-2 border-gray-300">Company</th>
            <th className="p-3 border-2 border-gray-300">Max. Salary</th>
            <th className="p-3 border-2 border-gray-300">Location</th>
            <th className="p-3 border-2 border-gray-300">Status</th>
            <th className="p-3 border-2 border-gray-300">Deadline</th>
            <th className="p-3 border-2 border-gray-300">Date Applied</th>
            <th className="p-3 border-2 border-gray-300">Follow Up</th>
            <th className="p-3 border-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody className>
          {sortedJobs.map((job, i) => (
            <JobRow i={i+1} job={job} onEdit={() => handleEdit(job, i)} onDelete={() => handleDelete(job.id, i)} />
          ))}
        </tbody>
      </table>

      <EditJobModal 
        ji={ji}
        job={selectedJob} 
        companies={companies}
        isEdit={isEditJob}
        isOpen={isEditModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default Dashboard;