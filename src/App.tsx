import { useState, useEffect } from "react";
import ChatApp from "./components/Chat";
import Register from "./components/Register";
import Login from "./components/Login";
// import Chat1 from "./components/Chat1";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("login");

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <ChatApp />
          <div className="flex justify-center">
            <button
              className="bg-yellow-500 text-white p-2 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center mb-4">
            <button
              className={`p-2 m-6 ${
                activeTab === "login" ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded-md`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`p-2 m-6 ${
                activeTab === "register"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } rounded-md`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {activeTab === "login" && (
            <Login onLoginSuccess={handleLoginSuccess} />
          )}
          {activeTab === "register" && (
            <Register onRegisterSuccess={handleRegisterSuccess} />
          )}
        </div>
      )}
    </div>

    // <div>
    //   <Chat1 />
    // </div>
  );
};

export default App;
