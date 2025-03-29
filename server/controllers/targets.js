import Target from "../models/target.js";
import User from "../models/user.js";

/**
 * Create a Target (Each User Can Have Only One Target)
 */
export const updateTarget = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { goal, deadline, salary_min, salary_max } = req.body;

    // Find the existing target
    let target = await Target.findOne({ where: { user_id } });

    if (target) {
      // Update existing target
      await target.update({ goal, deadline, salary_min, salary_max });
      return res.json({ message: "Target updated successfully", target });
    } 
    
    // Create new target if it doesn't exist
    target = await Target.create({ user_id, goal, deadline, salary_min, salary_max });
    res.status(201).json({ message: "Target created successfully", target });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Target by User ID
 */
export const getTargetByUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const target = await Target.findOne({ where: { user_id } });

    if (!target) {
      return res.status(404).json({ message: "No target found for this user." });
    }

    res.json(target);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};