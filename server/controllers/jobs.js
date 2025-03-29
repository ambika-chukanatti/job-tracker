import { Job, User, Company } from "../models/association.js";

/**
 * Create a Job
 */
export const createJob = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { company_id, job_title, job_url, company_name, location, salary, job_description, status, notes, resume, deadline, date_applied, follow_up } = req.body;

    const job = await Job.create({
      user_id,
      company_id,
      job_title,
      job_url,
      company_name,
      location,
      salary,
      job_description,
      status,
      notes,
      resume,
      deadline,
      date_applied,
      follow_up
    });

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Jobs by User ID
 */
export const getJobsByUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const jobs = await Job.findAll({
      where: { user_id },
      include: [Company],
    });

    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found for this user." });
    }

    res.json(jobs);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Job by ID
 */
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByPk(id, { include: [User, Company] });

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.json(job);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update Job
 */
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { job_title, job_url, company_name, location, salary, job_description, status, notes, resume, deadline, follow_up } = req.body;

    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    await job.update({ job_title, job_url, company_name, location, salary, job_description, status, notes, resume, deadline, follow_up });

    res.json({ message: "Job updated successfully", job });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete Job
 */
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByPk(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    await job.destroy();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};
