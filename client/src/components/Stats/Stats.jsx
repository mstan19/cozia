import React from "react";
import { Link } from "react-router-dom";

const Stats = () => {

    return (
        <div className="container mt-12">
            <div className="grid grid-cols-1 gap-4 mb-6 lg:grid-cols-3">
                <div className="w-1/2 px-4 py-5 bg-white rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 truncate">
                        Total Profit
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                        $12,000
                    </div>
                </div>
                <div className="w-1/2 px-4 py-5 bg-white rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 truncate">
                        Total Products
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                        5
                    </div>
                </div>
                <div className="w-1/2 px-4 py-5 bg-white rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 truncate">
                        Total Orders
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                        20k
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;