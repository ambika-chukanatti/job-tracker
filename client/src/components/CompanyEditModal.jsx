import { useState, useEffect } from "react";

const CompanyEditModal = ({ ci, company, isOpen, onClose, onSave, isEdit }) => {
  const newCompany = {
    company_name: "",
    industry: "",
    company_size: "",
    company_type: "",
    location: "",
    website: "",
    year_founded: 0
  };

  const [formData, setFormData] = useState(isEdit && company ? company : newCompany);

  useEffect(() => {
    setFormData(isEdit && company ? company : newCompany);
  }, [isEdit, company]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, company.id, ci);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white py-6 h-10/12 overflow-y-auto px-8 rounded-lg shadow-xl w-[600px]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isEdit ? "Edit" : "Add New"} Company
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {Object.keys(newCompany).map((key) => (
              <div key={key}>
                <label className="block font-semibold text-gray-400">
                  {key.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                </label>
                <input
                  type={key === "year_founded" || key === "company_size" ? "number" : "text"}
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <div className="flex gap-4">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded hover:bg-blue-700 transition-all duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyEditModal;