import React, { useEffect, useState } from "react";
import RedHeader from "../components/RedHeader";
import Chatbot from "../components/Chatbot";
import axios from "axios";
import { FaCircleNotch } from "react-icons/fa";

function Scanner() {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [containerInfo, setContainerInfo] = useState("");

  useEffect(() => {
    // Fetch container data from the Express API using Axios
    axios
      .get("http://localhost:5000/docker/containers")
      .then((response) => {
        setContainers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching container data:", error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const handleContainerChange = (event) => {
    const selectedContainerId = event.target.value;
    const selectedContainer = containers.find(
      (container) => container.id === selectedContainerId
    );
    setSelectedContainer(selectedContainer);

    axios
      .get(
        `http://localhost:5000/docker/scan?containerName=${selectedContainer.name}`
      )
      .then((response) => {
        setContainerInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching container info:", error);
      });
  };

  return (
    <div>
      <RedHeader />
      <div
        className="mx-auto max-w-[960px] max-md:px-5"
        style={{ paddingBottom: "50px" }}
      >
        <header className="content flex items-start px-4 py-1 mt-5 max-w-full text-2xl font-bold tracking-tighter whitespace-nowrap text-neutral-900 w-[960px] max-md:pr-5">
          <h2>Scanner</h2>
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
        </div>
        <div>
          <section className="flex flex-col px-4 mt-4 w-full text-lg font-bold max-w-[960px] text-neutral-900 max-md:max-w-full">
            <h2 className="tracking-tighter whitespace-nowrap text-neutral-900 w-[960px] max-md:pr-5">
              Container Info
            </h2>
            <div className="container-info pl-0 py-4 pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {containerInfo ? (
                  <>
                    <div className="font-medium text-base info-box max-w-full overflow-x-auto whitespace-pre-wrap border border-neutral-300 p-4 rounded">
                      <div>
                        <strong className="font-medium">Is Privileged:</strong>{" "}
                        {String(containerInfo["Is Privileged"])}
                      </div>
                      <br />
                      <div>
                        <strong className="font-medium">
                          Can Be Privileged:
                        </strong>{" "}
                        {String(containerInfo["Can Be Privileged"])}
                      </div>
                    </div>
                    <div className="font-medium text-base max-w-full overflow-x-auto whitespace-pre-wrap border border-neutral-300 p-4 rounded">
                      <div>
                        <strong className="font-medium">
                          Seccomp Profile:
                        </strong>{" "}
                        {containerInfo["Seccomp Profile"]}
                      </div>
                      <div>
                        <strong className="font-medium">
                          AppArmor Profile:
                        </strong>{" "}
                        {containerInfo["AppArmor Profile"]}
                      </div>
                      <div>
                        <strong className="font-medium">
                          World-Writable Files:
                        </strong>{" "}
                        {containerInfo["World-Writable Files"]}
                      </div>
                    </div>
                    <div className="font-medium text-base max-w-full overflow-x-auto whitespace-pre-wrap border border-neutral-300 p-4 rounded">
                      <strong className="font-medium">Open Ports:</strong>
                      <pre>{containerInfo["Open Ports"]}</pre>
                    </div>
                    <div className="font-medium text-base max-w-full overflow-x-auto whitespace-pre-wrap border border-neutral-300 p-4 rounded">
                      <div>
                        <strong className="font-medium">CPU Limits:</strong>{" "}
                        {containerInfo["Resource Limits"]["CPU"]}
                      </div>
                      <div>
                        <strong className="font-medium">Memory Limits:</strong>{" "}
                        {containerInfo["Resource Limits"]["Memory"]}
                      </div>
                    </div>
                    <div className="font-medium text-base max-w-full overflow-x-auto whitespace-pre-wrap border border-neutral-300 p-4 rounded">
                      <strong className="font-medium">
                        Environment Variables:
                      </strong>
                      <pre>{containerInfo["Environment Variables"]}</pre>
                    </div>
                    <div className="font-medium text-base max-w-full overflow-x-auto whitespace-pre-wrap border border-neutral-300 p-4 rounded">
                      <div>
                        <strong className="font-medium">Image:</strong>{" "}
                        {containerInfo["Docker Image Details"]["Image"]}
                      </div>
                      <div>
                        <strong className="font-medium">Image ID:</strong>{" "}
                        {containerInfo["Docker Image Details"]["Image ID"]}
                      </div>
                      <div>
                        <strong className="font-medium">Created At:</strong>{" "}
                        {containerInfo["Docker Image Details"]["Created At"]}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-sm font-normal">
                    No container selected
                  </div>
                )}
              </div>
              {containerInfo && containerInfo["Linux Capabilities"] && (
                <div className="font-medium text-base mt-5 max-w-full overflow-x-auto whitespace-pre-wrap border border-neutral-300 p-4 break-words rounded">
                  <h3>Linux Capabilities</h3>
                  <div className="text-sm">
                    {containerInfo["Linux Capabilities"]
                      .split("\n")
                      .map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      <div>
        <Chatbot />
      </div>
    </div>
  );
}

export default Scanner;
