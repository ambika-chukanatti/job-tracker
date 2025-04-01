import { useState, useEffect } from "react";
import { CompanyCard, CompanyDetailsModal, CompanyEditModal } from "../components";
const api_url = "http://localhost:3000/api"
const token = sessionStorage.getItem("token")

const Companies = ({ location }) => {
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [ci, setCi] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const getCompanies = async() => {
    try{
        const response = await fetch(`${api_url}/company`, {
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

        setCompanies(data)
    }catch(err){
        console.error(err)
    }
  }

  useEffect(()=>{
    getCompanies()
  },[])

  const handleSave = async(formData, id, ci) => {
    const url = isEdit ? `${api_url}/company/${id}` : `${api_url}/company`
    const method = isEdit ? "PUT" : "POST"
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
      
      if(isEdit){
        const updatedCompanies = [...companies];
        updatedCompanies[ci] = data.company;
        setCompanies(updatedCompanies);
      }else{
        setCompanies([...companies, data.company]);
      }

      setIsDetailsModalOpen(false)
    }catch(err){
        console.error(err)
    }
  }

  const handleDelete = async(id, ci) => {
    try{
      const response = await fetch(`${api_url}/company/${id}`, {
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

      const updatedCompanies = [...companies];
      updatedCompanies.pop(ci,1);
      setCompanies(updatedCompanies);
      setIsDetailsModalOpen(false)
    }catch(err){
        console.error(err)
    }
  }

  const filteredCompanies = companies.filter((company) =>
    company.company_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col items-center mx-auto p-6 mx-16">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-10">Companies</h1>

      {/* Search & Add Company - Centered */}
      <div className="w-full flex justify-center items-center gap-4 mb-6">
        {/* Search Input - Centered */}
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 w-1/2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        />

        {/* Add Company Button - Next to Search */}
        <button
          onClick={() => {
            setIsEdit(false)
            setIsEditModalOpen(true);
          }}
          className="px-5 py-3 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition-200"
        >
          + Add Company
        </button>
      </div>

      {/* Companies Grid */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12">
        {filteredCompanies.map((company, i) => (
          <CompanyCard
            key={company.id}
            company={company}
            onOpen={() => {
              setCi(i);
              setIsEdit(true);
              setSelectedCompany(company);
              setIsDetailsModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* Company Modal */}
      <CompanyDetailsModal
        ci={ci}
        company={selectedCompany}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />

      <CompanyEditModal
        company={selectedCompany}
        isEdit={false}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Companies;
