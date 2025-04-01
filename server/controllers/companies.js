import Company from "../models/company.js";
import User from "../models/user.js";

/**
 * Create a Company
 */
export const createCompany = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { company_name, industry, company_size, company_type, location, website, year_founded } = req.body;

    const company = await Company.create({
      user_id,
      company_name,
      industry,
      company_size,
      company_type,
      location,
      website,
      year_founded
    });

    res.status(201).json({ message: "Company created successfully", company });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Companies by User ID
 */
export const getCompaniesByUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const companies = await Company.findAll({ where: { user_id } });

    if (!companies.length) {
      return res.status(404).json({ message: "No companies found for this user." });
    }

    res.json(companies);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Company by ID
 */
export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id, { include: [User] });

    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    res.json(company);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update Company
 */
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { company_name, industry, company_size, company_type, location, website, year_founded } = req.body;

    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    await company.update({ company_name, industry, company_size, company_type, location, website, year_founded });

    res.json({ message: "Company updated successfully", company });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete Company
 */
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    await company.destroy();
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};
