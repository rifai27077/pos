import React from "react";

const ActionButtons = ({ onEdit, onDelete }) => {
    return (
        <div className="flex space-x-2">
            <button
                className="px-3 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
                onClick={onEdit}
            >
                Edit
            </button>
            <button
                className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    );
};

export default ActionButtons;
