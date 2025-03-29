const CompanyCard = ({ company, onOpen }) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg border border-gray-300 flex flex-col items-center shadow-lg hover:shadow-xl transition w-full mx-auto cursor-pointer"
      onClick={() => onOpen(company)}
    >
      {/* Company Name */}
      <h2 className="text-xl font-bold text-gray-300 mb-4">{company.company_name}</h2>
      
      {/* Table for Company Information */}
      <table className="w-full table-auto text-left text-gray-700">
        <tbody>
          <tr className="border-b border-gray-300 py-3">
            <td className="font-medium text-gray-600 text-lg py-3">Industry:</td>
            <td className="text-lg py-3">{company.industry}</td>
          </tr>
          <tr className="border-b border-gray-300 py-3">
            <td className="font-medium text-gray-600 text-lg py-3">Location:</td>
            <td className="text-lg py-3">{company.location}</td>
          </tr>
          <tr className="border-b border-gray-300 py-3">
            <td className="font-medium text-gray-600 text-lg py-3">Company Type:</td>
            <td className="text-lg py-3">{company.company_type}</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-600 text-lg py-3">Founded:</td>
            <td className="text-lg py-3">{company.year_founded}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompanyCard;