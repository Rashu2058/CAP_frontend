import { useState } from "react";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("receptionistAnalytics");
  const [reportType, setReportType] = useState("Management report");
  const [date, setDate] = useState("2021-10-12");

  {/* Tab Data*/}
  const tabs = [
    { id: "receptionistAnalytics", label: "Receptionist analytics" },
    { id: "financial", label: "Financial" },
    { id: "guestLedger", label: "Guest ledger" },
    { id: "dailyList", label: "Daily list" },
    { id: "statistics", label: "Statistics" },
  ];

  {/* Render content based on the selected tab*/}
  const renderTabContent = () => {
    switch (activeTab) {
      case "managerAnalytics":
        return (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option>Management report</option>
              <option>Performance report</option>
              <option>Revenue report</option>
            </select>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        );
      
{/* Similarly, you can add content for other tabs*/}
      default:
        return <div className="mt-4">Content for {activeTab}</div>;
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h3 className="text-2xl text-gray-900 font-bold mb-4 font-sans">Report</h3>

{/* Tab Navigation */}
      <div className="flex justify-start space-x-4 border-b mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 ${
              activeTab === tab.id
                ? "border-b-4 border-gray-600 text-gray-700 font-bold"
                : "text-gray-700 hover:text-gray-400"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

{/* Tab Content */}
      <div className="mt-6 bg-white p-4 shadow rounded-md">
        {renderTabContent()}
      </div>
    </div>
  );
}
