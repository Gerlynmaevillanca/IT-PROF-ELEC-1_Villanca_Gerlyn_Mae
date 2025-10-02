import React from 'react';
import { useState } from 'react';
import { askAi } from './Lib/ai';

export default function App() {
  const [promt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const handleInputChange = async (e) => {
    setPrompt(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await askAi(promt);
    setResponse(response);
    setPrompt("");
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-300 p-6">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Charlie AI Generator</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center gap-4">
        <input
          className="w-full border border-purple-200 rounded-full h-12 px-6 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={promt}
          type="text"
          placeholder="Type your prompt here..."
          onChange={handleInputChange}
        />
        <button
          className={`w-full bg-purple-400 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-purple-700 transition duration-150 ${isloading ? "opacity-60 cursor-not-allowed" : ""}`}
          type="submit"
          disabled={isloading}
        >
          {isloading ? "Generating..." : "Submit"}
        </button>
      </form>
      <div className="mt-8 w-full max-w-md bg-white rounded-xl shadow p-6 min-h-[60px] text-gray-800">
        {response}
      </div>
    </div>
  );
}