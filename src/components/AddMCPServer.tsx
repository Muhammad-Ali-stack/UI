import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { AuthState } from "../types/auth";

interface AddMCPServerProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M4.5 10.5l3 3L15.5 5.5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AddMCPServer: React.FC<AddMCPServerProps> = ({
  authState,
  setAuthState,
}) => {
  const [step, setStep] = useState<number>(1);

  const [serverName, setServerName] = useState("");
  const [env, setEnv] = useState("");
  const [active, setActive] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar authState={authState} setAuthState={setAuthState} />
      <div className="flex">
        <Sidebar authState={authState} setAuthState={setAuthState} />
        <div className="flex-1 ml-64 pt-16 px-8">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Add MCP Server
          </h1>

          {/* Stepper */}
          <div className="flex items-center justify-center mb-12">
            {/* Circle 1 */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full font-bold shadow-md transition-all duration-300 ${
                step > 1
                  ? "bg-[#1D4ED8] text-white"
                  : "bg-white text-[#1D4ED8] border-2 border-[#1D4ED8]"
              }`}
            >
              {step > 1 ? (
                <CheckIcon className="w-5 h-5 text-white" />
              ) : (
                "1"
              )}
            </div>

            {/* Line */}
            <div className="w-40 mx-4 bg-gray-200 h-1 rounded overflow-hidden">
              <div
                className="h-full bg-[#1D4ED8] transform origin-left transition-transform duration-500"
                style={{ transform: step > 1 ? "scaleX(1)" : "scaleX(0)" }}
              />
            </div>

            {/* Circle 2 */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full font-bold shadow-md transition-all duration-300 ${
                step === 2
                  ? "bg-white text-[#1D4ED8] border-2 border-[#1D4ED8]"
                  : "bg-gray-100 text-[#1D4ED8]"
              }`}
            >
              2
            </div>
          </div>

          {/* ===== Step 1 Form ===== */}
          {step === 1 && (
            <div className="max-w-lg mx-auto">
              <div className="mb-6">
                <label className="block text-[#1D4ED8] font-semibold mb-2">
                  MCP Server Name
                </label>
                <input
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  type="text"
                  placeholder="Enter server name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1D4ED8] outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-[#1D4ED8] font-semibold mb-2">
                  CJ ENV
                </label>
                <select
                  value={env}
                  onChange={(e) => setEnv(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1D4ED8] outline-none"
                >
                  <option value="">Select Environment</option>
                  <option value="dev">Dev</option>
                  <option value="qa">QA</option>
                  <option value="prod">Prod</option>
                </select>
              </div>

              <div className="flex items-center mb-6">
                <input
                  id="active"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  type="checkbox"
                  className="h-5 w-5 text-[#1D4ED8] focus:ring-[#1D4ED8] rounded"
                />
                <label
                  htmlFor="active"
                  className="ml-3 text-[#1D4ED8] font-medium"
                >
                  Active
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setServerName("");
                    setEnv("");
                    setActive(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2 rounded-xl bg-[#1D4ED8] text-white hover:bg-blue-800"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* ===== Step 2 Form ===== */}
          {step === 2 && (
            <div className="max-w-lg mx-auto">
              <div className="mb-6 flex justify-between items-start gap-4">
                <div className="flex-1">
                  <label className="block text-[#1D4ED8] font-semibold mb-2">
                    Group Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter group name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1D4ED8] outline-none"
                  />
                </div>
                <div className="text-[#1D4ED8] font-medium">Members: 0</div>
              </div>

              <div className="mb-6">
                <label className="block text-[#1D4ED8] font-semibold mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Enter user name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1D4ED8] outline-none"
                />
              </div>

              <div className="flex gap-3 mb-6">
                <button className="px-4 py-2 rounded-lg bg-[#1D4ED8] text-white hover:bg-blue-800">
                  + Add Group
                </button>
                <button className="px-4 py-2 rounded-lg bg-[#1D4ED8] text-white hover:bg-blue-800">
                  + Add Users
                </button>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Back
                </button>
                <button className="px-5 py-2 rounded-xl bg-[#1D4ED8] text-white hover:bg-blue-800">
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMCPServer;