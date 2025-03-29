import { useState } from 'react';
import { CompanyEditModal } from "../components";

const CompanyDetailsModal = ({ ci, company, isOpen, onClose, onDelete, onSave }) => {
  if (!isOpen || !company) return null;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white py-6 px-8 rounded-lg shadow-xl w-[600px]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {company.company_name}
        </h2>

        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <tbody>
            <tr className="border-b">
              <td className="p-3 font-semibold border-r border-gray-300 bg-gray-100">Industry</td>
              <td className="p-3">{company.industry}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold border-r border-gray-300 bg-gray-100">Size</td>
              <td className="p-3">{company.company_size} employees</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold border-r border-gray-300 bg-gray-100">Type</td>
              <td className="p-3">{company.company_type}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold border-r border-gray-300 bg-gray-100">Location</td>
              <td className="p-3">{company.location}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold border-r border-gray-300 bg-gray-100">Website</td>
              <td className="p-3">
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {company.website}
                </a>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold border-r border-gray-300 bg-gray-100">Founded</td>
              <td className="p-3">{company.year_founded}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="px-5 py-2 cursor-pointer bg-gray-200 rounded hover:bg-gray-300 transition-200">
            Close
          </button>
          <div className="flex gap-2">
            <button onClick={() => setIsEditModalOpen(true)} className="px-5 py-2 cursor-pointer bg-gray-200 rounded hover:bg-gray-300 transition-200">
              Edit
            </button>
            <button onClick={() => onDelete(company.id, ci)} className="px-5 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 transition-200">
              Delete
            </button>
          </div>
        </div>
      </div>

      <CompanyEditModal
        ci={ci}
        company={company}
        isOpen={isEditModalOpen}
        isEdit={true}
        onClose={() => setIsEditModalOpen(false)}
        onSave={onSave}
      />
    </div>
  );
};

export default CompanyDetailsModal;
