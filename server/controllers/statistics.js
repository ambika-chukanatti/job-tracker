import { Op, fn, col, Sequelize } from "sequelize";
import { Job } from "../models/association.js";

export const getBarChartData = async (req, res) => {
  try {
    const userId = req.user.id;
    const { picker, filter } = req.query;

    let year, month;
    let jobs;

    if (picker === "year") {
      year = filter || new Date().getFullYear();

      jobs = await Job.findAll({
        attributes: [
          [fn("MONTH", col("date_applied")), "month"],
          [fn("COUNT", col("id")), "count"],
        ],
        where: {
          user_id: userId,
          date_applied: {
            [Op.between]: [`${year}-01-01`, `${year}-12-31`],
          },
        },
        group: ["month"],
        order: [[Sequelize.literal("month"), "ASC"]],
      });

      const data = new Array(12).fill(0);
      jobs.forEach(({ dataValues }) => {
        data[dataValues.month - 1] = dataValues.count;
      });

      return res.json(data);
    } 
    
    if (picker === "month") {
      [year, month] = filter.split("-"); // Extract year and month
      const daysInMonth = new Date(year, month, 0).getDate(); // Get correct days in month

      jobs = await Job.findAll({
        attributes: [
          [fn("DAY", col("date_applied")), "day"],
          [fn("COUNT", col("id")), "count"],
        ],
        where: {
          user_id: userId,
          date_applied: {
            [Op.between]: [`${year}-${month}-01`, `${year}-${month}-${daysInMonth}`],
          },
        },
        group: ["day"],
        order: [[Sequelize.literal("day"), "ASC"]],
      });

      const data = new Array(daysInMonth).fill(0);
      jobs.forEach(({ dataValues }) => {
        data[dataValues.day - 1] = dataValues.count;
      });

      return res.json(data);
    }

    res.status(400).json({ error: "Invalid picker value" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch bar chart data" });
  }
};

export const getPieChartData = async (req, res) => {
  try {
    const userId = req.user.id;
    const { picker, filter } = req.query;

    console.log({ picker, filter });

    let dateFilter = {};

    if (picker === "year") {
      dateFilter[Op.between] = [`${filter}-01-01`, `${filter}-12-31`];
    } else if (picker === "month") {
      const [year, month] = filter.split("-");
      const daysInMonth = new Date(year, month, 0).getDate();
      dateFilter[Op.between] = [`${year}-${month}-01`, `${year}-${month}-${daysInMonth}`];
    } else if (picker === "date") {
      dateFilter[Op.eq] = filter;
    }

    const jobs = await Job.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      where: {
        user_id: userId,
        ...(picker && { date_applied: dateFilter }),
      },
      group: ["status"],
    });

    const categories = ["Bookmarked", "Applied", "No Response", "Not Selected", "I Withdrew", "Interviewing", "Negotiating", "Accepted"];
    const data = new Array(categories.length).fill(0);

    jobs.forEach(({ dataValues }) => {
      const index = categories.indexOf(dataValues.status);
      if (index !== -1) {
        data[index] = dataValues.count;
      }
    });

    return res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch pie chart data" });
  }
};
