import React, { useState, useEffect, useRef } from "react";
import RedHeader from "../components/BlueHeader";
import Chatbot from "../components/Chatbot";
import axios from "axios";
import {
  FaHammer,
  FaLockOpen,
  FaHashtag,
  FaCircleNotch,
  FaCrown,
  FaTerminal,
  FaTimes,
} from "react-icons/fa";

function DefendTool({ icon, title, defence, description, selectedContainer }) {
  const [terminalCommands, setTerminalCommands] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const terminalRef = useRef(null);

  const handleDefence = () => {
    if (selectedContainer) {
      const backendURL = `http://localhost:5000/docker/defence?defenceName=${defence}&containerName=${selectedContainer.name}&imageName=${selectedContainer.image}`;
      axios
        .get(backendURL)
        .then((response) => {
          // Handle success, sending the response to the terminal

          let newText = response.data;
          // Update the terminalCommands state with the plain text
          setTerminalCommands([newText]);
          setShowTerminal(true); // Show the terminal
        })
        .catch((error) => {
          // Handle error
          console.error("Error initiating defence:", error);
        });
    } else {
      // Handle the case where no container is selected
      console.error("No container selected for defence");
      alert("Please select a container to defence");
    }
  };

  const handleCloseTerminal = () => {
    setShowTerminal(false);
  };

  useEffect(() => {
    if (showTerminal && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [showTerminal]);

  return (
    <div>
      <div className="flex justify-between gap-5 px-4 py-1 w-full bg-white max-w-[960px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-4 max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col justify-center items-start p-4 bg-gray-100 rounded-lg max-md:pr-5">
            {icon}
          </div>
          <div className="flex flex-col justify-center my-auto leading-[150%] max-md:max-w-full">
            <div className="text-base font-medium text-neutral-900 max-md:max-w-full">
              {title}
            </div>
            <div className="text-sm text-slate-500 max-md:max-w-full">
              {description}
            </div>
          </div>
        </div>
        <button
          className="flex flex-col justify-center px-4 py-1.5 my-auto text-sm font-medium leading-5 whitespace-nowrap bg-gray-100 rounded-xl text-neutral-900 max-md:px-5 hover:bg-blue-950 hover:text-white"
          onClick={handleDefence}
        >
          Run
        </button>
      </div>
      <div>
        {showTerminal && (
          <div
            className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 py-0 transition-transform duration-1000 transform translate-y-0 overflow-scroll h-2/5 z-index: 9999 resize-y rotate-180"
            ref={terminalRef}
          >
            <div className="rotate-180">
              <div className="px-8 py-2">
                {terminalCommands.map((text, index) => (
                  <div key={index} className="mb-2">
                    <div>{text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rotate-180 sticky bottom-0 pb-1 ">
              <div className="flex justify-between items-center pl-8 pr-0 py-2 sticky top-0 bg-gray-800 border-b border-gray-400 border-solid">
                <div className="flex items-center border-2 rounded-md">
                  <FaTerminal className="h-6 w-6 mx-1" />
                </div>
                <button
                  className="hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-full p-2"
                  onClick={handleCloseTerminal}
                >
                  <FaTimes className="h-6 w-6 pt-0" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Defend() {
  const [containers, setContainers] = useState([]);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [loading, setLoading] = useState(true);

  const defenceOptions = [
    {
      defence: "Privilege-Escalation",
      name: "Privilege Escalation",
      description: "Prevent attackers from gaining elevated privileges.",
      icon: <FaCrown className="text-blue-900" />,
    },
    {
      defence: "DoS",
      name: "DoS",
      description:
        "Prevent attackers from launching a Denial of Service attack.",
      icon: <FaHammer className="text-blue-900" />, // Add icon and styles
    },
    {
      defence: "Privilege-Escalation",
      name: "Protect Hashes",
      description: "Prevent attackers from gaining access to hashed passwords.",
      icon: <FaHashtag className="text-blue-900" />, // Add icon and styles
    },
    {
      defence: "Privilege-Escalation",
      name: "Protect Namespaces",
      description: "Prevent attackers from accessing other namespaces.",
      icon: <FaLockOpen className="text-blue-900" />, // Add icon and styles
    },
  ];

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

  return (
    <div>
      <RedHeader />
      <div
        className="mx-auto max-w-[960px] max-md:px-5"
        style={{ paddingBottom: "50px" }}
      >
        <header className="content flex items-start px-4 py-1 mt-5 max-w-full text-2xl font-bold tracking-tighter whitespace-nowrap text-neutral-900 w-[960px] max-md:pr-5">
          <h2>Defend</h2>
        </header>
        <div className="flex flex-col items-start p-4">
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
          <div className="flex flex-col align-center py-8 mt-1 w-full bg-white max-md:max-w-full">
            {defenceOptions.map((tool, index) => (
              <DefendTool
                key={index}
                icon={tool.icon}
                title={tool.name}
                defence={tool.defence}
                description={tool.description}
                selectedContainer={selectedContainer}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <Chatbot />
      </div>
    </div>
  );
}

export default Defend;
