// src/components/ProfileDropdown.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ProfileDropdown() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here, for example, clearing tokens or session
    console.log("Logging out...");
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div className="bg-gray-800 text-white p-2 rounded-md shadow-lg absolute right-0 mt-2 w-48">
      <div className="cursor-pointer py-2 px-4 hover:bg-gray-700" onClick={() => navigate("/profile")}>
        {t("profile")}
      </div>
      <div className="cursor-pointer py-2 px-4 hover:bg-gray-700" onClick={handleLogout}>
        {t("logout")}
      </div>
    </div>
  );
}

export default ProfileDropdown;
