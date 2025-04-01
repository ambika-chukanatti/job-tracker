import { useState } from "react";

const GoalEditModal = ({ goal, onSave, onClose, isOpen }) => {
  if (!isOpen) return null;

  const newGoal = {
    goal: "",
    deadline: "",
    salary_min: 0,
    salary_max: 0,
  };

  const [formData, setFormData] = useState(goal ? goal : newGoal);

  const handleGoalChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white w-[500px] p-8 rounded-lg shadow-2xl transform scale-100 transition-transform duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Next Career Goal
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Target Title</label>
            <input
              type="text"
              name="goal"
              value={formData?.goal}
              onChange={handleGoalChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter job title"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Target Date</label>
            <input
              type="date"
              name="deadline"
              value={formData?.deadline}
              onChange={handleGoalChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium text-gray-700">Min Salary ($)</label>
              <input
                type="number"
                name="salary_min"
                value={formData?.salary_min}
                onChange={handleGoalChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block font-medium text-gray-700">Max Salary ($)</label>
              <input
                type="number"
                name="salary_max"
                value={formData?.salary_max}
                onChange={handleGoalChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8 space-x-4">
            <button
              className="px-4 py-2 mr-4 rounded cursor-pointer bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition-all"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded cursor-pointer bg-blue-500 text-white font-medium hover:bg-blue-700 transition-all"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalEditModal;
