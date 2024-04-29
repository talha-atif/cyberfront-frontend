import React, { useState, useEffect } from "react";
import axios from "axios";
import RedHeader from "../components/RedHeader";
import Chatbot from "../components/Chatbot";
import { FaCircleNotch, FaCrown } from "react-icons/fa";

function RecommendedActions({ suggestions }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getSuggestions = () => {
    setShowSuggestions(true);
  };

  return (
    <div>
      <section className="flex gap-4 p-4 mt-6 bg-white rounded-xl border border-solid border-zinc-200 max-md:flex-wrap max-md:max-w-full justify-between">
        <div className="flex flex-col text-base max-md:max-w-full">
          <h3 className="font-bold text-neutral-900 max-md:max-w-full">
            Get Suggestions
          </h3>
          <p className="mt-1 leading-[150%] text-slate-500 max-md:max-w-full">
            Click to get recommended actions or attack strategies for you to
            consider
          </p>
        </div>
        <button
          className="flex flex-col justify-center px-4 py-2 my-auto text-sm font-medium leading-5 text-white rounded-xl bg-red-800"
          onClick={getSuggestions}
        >
          Get Suggestions
        </button>
      </section>
      {showSuggestions && (
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="text-lg font-bold tracking-tight text-neutral-900">
            Attack Possibility
          </h2>
          {suggestions ? (
            <div className="flex justify-between gap-5 px-4 py-1 w-full bg-white max-w-[960px] max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-4 max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col justify-center items-start p-4 bg-gray-100 rounded-lg max-md:pr-5 text-red-800">
                  <FaCrown />
                </div>
                <div className="flex flex-col justify-center my-auto leading-[150%] max-md:max-w-full">
                  <div className="text-base font-medium text-neutral-900 max-md:max-w-full">
                    {suggestions}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-4">
              <FaCircleNotch className="animate-spin h-8 w-8 text-primary-500" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AttackSuggestions() {
  const [containers, setContainers] = useState([]);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState("");

  useEffect(() => {
    // Fetch container data from the Express API using Axios
    axios
      .get("http://localhost:5000/docker/containers")
      .then((response) => {
        setContainers(response.data);
        setLoading(false); // Set loading to false after data received
      })
      .catch((error) => {
        console.error("Error fetching container data:", error);
        setLoading(false); // Set loading to false even on error
      });
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const handleContainerChange = (event) => {
    const selectedContainerId = event.target.value;
    const selectedContainer = containers.find(
      (container) => container.id === selectedContainerId
    );
    setSelectedContainer(selectedContainer);
  };

  useEffect(() => {
    if (selectedContainer) {
      // Fetch suggestions based on selected container
      axios
        .get(
          `http://localhost:5000/docker/suggestions?containerName=${selectedContainer.name}&imageName=${selectedContainer.image}&containerID=${selectedContainer.id}`
        )
        .then((response) => {
          setSuggestions(response.data.suggestions);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    }
  }, [selectedContainer]);

  return (
    <div>
      <RedHeader />
      <div
        className="mx-auto max-w-[960px] max-md:px-5"
        style={{ paddingBottom: "50px" }}
      >
        <header className="content flex items-start px-4 py-2 my-4 max-w-full text-2xl font-bold tracking-tighter whitespace-nowrap text-neutral-900 w-[960px] max-md:pr-5">
          <h2>Attack-AI</h2>
        </header>
        <div className="flex flex-col items-start px-4 py-1 mb-3">
          {loading ? (
            <div className="flex justify-center items-center">
              <FaCircleNotch className="animate-spin h-8 w-8 text-primary-500 text-gray-400" />
            </div>
          ) : (
            <select
              id="container"
              name="container"
              className="w-2/4 p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedContainer ? selectedContainer.id : ""}
              onChange={handleContainerChange}
            >
              <option value="" disabled>
                Select a container
              </option>
              {containers.map((container) => (
                <option key={container.id} value={container.id}>
                  {`Name: ${container.name} - Image: ${container.image}`}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="px-4 py-2 mt-2 max-md:max-w-full">
          <h2 className="text-lg font-bold tracking-tight text-neutral-900 max-md:max-w-full">
            Recommended Actions
          </h2>
          <RecommendedActions suggestions={suggestions} />
        </div>
        <div>
          <Chatbot />
        </div>
      </div>
    </div>
  );
}

export default AttackSuggestions;
