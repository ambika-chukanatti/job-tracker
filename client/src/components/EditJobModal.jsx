import { useState, useEffect } from "react";

const EditJobModal = ({ ji, job, isOpen, onClose, onSave, companies, isEdit }) => {
  const newJob = {
    job_title: "",
    job_url: "",
    company_name: "",
    location: "",
    salary: 0,
    job_description: "",
    status: "",
    notes: "",
    resume: "",
    deadline: null,
    date_applied: null,
    follow_up: null,
    company_id: 0,

  };

  const [formData, setFormData] = useState(isEdit && job ? job : newJob);

  useEffect(() => {
    setFormData(isEdit && job ? job : newJob);
  }, [isEdit, job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = () => {
    onSave(formData, formData.id, ji);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center animate-fadeIn">
      <div className="bg-white p-6 rounded-lg h-11/12 overflow-y-auto shadow-lg w-[850px] transition-all">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isEdit ? "Edit" : "Add New"} Job
        </h2>

        {/* Single-row fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-400">Job Title</label>
            <input
              type="text"
              name="job_title"
              value={formData.job_title || ""}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Enter Job Title"
            />
          </div>

          <div>
            <label className="block text-gray-400">Job URL</label>
            <input
              type="text"
              name="job_url"
              value={formData.job_url || ""}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Enter Job URL"
            />
          </div>

          <div>
            <label className="block text-gray-400">Company Name</label>
            <select
              name="company_name"
              value={formData.company_name || ""}
              onChange={e => {
                const selectedIndex = e.target.selectedIndex;
                const selectedOption = e.target.options[selectedIndex];

                setFormData({
                  ...formData,
                  company_name: e.target.value,
                  company_id: selectedOption.getAttribute("data-id"),
                });
              }}
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.company_name} data-id={company.id}>
                  {company.company_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-400">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
              placeholder="Enter Location"
            />
          </div>

          <div>
            <label className="block text-gray-400">Job Description</label>
            <textarea
              name="job_description"
              value={formData.job_description || ""}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full h-30"
              placeholder="Enter Job Description"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-400">Salary</label>
            <input
              type="text"
              name="salary"
              value={formData.salary || ""}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
              placeholder="Enter Max Salary"
            />
          </div>
          <div>
            <label className="block text-gray-400">Resume Upload</label>
            <input
              type="file"
              name="resume"
              onChange={handleFileChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-gray-400">Status</label>
            <select
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full bg-white"
            >
              <option value="">Select Status</option>
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

          <div>
            <label className="block text-gray-400">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline || ""}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-gray-400">Applied Date</label>
            <input
              type="date"
              name="date_applied"
              value={formData.date_applied || ""}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-gray-400">Follow-Up Date</label>
            <input
              type="date"
              name="follow_up"
              value={formData.follow_up || ""}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-400">Notes</label>
          <textarea
            name="notes"
            value={formData.notes || ""}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full h-20"
            placeholder="Enter Notes"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded hover:bg-blue-700 transition-all duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJobModal;
