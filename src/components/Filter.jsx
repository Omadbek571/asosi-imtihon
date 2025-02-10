import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

function Filter() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Pending");

    const statuses = ["Draft", "Pending", "Paid"];

    const toggleDropdown = () => setIsOpen(!isOpen);
    const selectStatus = (status) => {
        setSelectedStatus(status);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex items-center  gap-2 text-gray-900 font-bold"
            >
                Filter <span className="hidden md:block">by status </span>{isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
            </button>
            {isOpen && (
                <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                    {statuses.map((status) => (
                        <label
                            key={status}
                            className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
                            onClick={() => selectStatus(status)}
                        >
                            <input
                                type="checkbox"
                                checked={selectedStatus == status}
                                readOnly
                                className="w-4 h-4 text-purple-500 border-purple-500 rounded focus:ring-purple-400"
                            />
                            <span className="text-gray-800">{status}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Filter;
