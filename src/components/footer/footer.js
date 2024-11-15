import React from "react";
import {
  ImFacebook2,
  ImInstagram,
  ImTwitter,
  ImYoutube,
} from "react-icons/im";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 mb-6">
        <ImFacebook2 className="text-xl hover:text-blue-500 cursor-pointer" />
        <ImInstagram className="text-xl hover:text-pink-500 cursor-pointer" />
        <ImTwitter className="text-xl hover:text-blue-400 cursor-pointer" />
        <ImYoutube className="text-xl hover:text-red-500 cursor-pointer" />
      </div>

      {/* Footer Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
        <div>
          <a href="#" className="hover:text-gray-400 block mb-2">
            Audio and Subtitle
          </a>
          <a href="#" className="hover:text-gray-400 block mb-2">
            Media Center
          </a>
          <a href="#" className="hover:text-gray-400 block">
            Privacy
          </a>
        </div>
        <div>
          <a href="#" className="hover:text-gray-400 block mb-2">
            Audio Description
          </a>
          <a href="#" className="hover:text-gray-400 block mb-2">
            Investor Relations
          </a>
          <a href="#" className="hover:text-gray-400 block">
            Legal Notices
          </a>
        </div>
        <div>
          <a href="#" className="hover:text-gray-400 block mb-2">
            Help Center
          </a>
          <a href="#" className="hover:text-gray-400 block mb-2">
            Jobs
          </a>
          <a href="#" className="hover:text-gray-400 block">
            Cookie Preferences
          </a>
        </div>
        <div>
          <a href="#" className="hover:text-gray-400 block mb-2">
            Corporate Information
          </a>
          <a href="#" className="hover:text-gray-400 block mb-2">
            Gift Cards
          </a>
          <a href="#" className="hover:text-gray-400 block">
            Terms of Use
          </a>
        </div>
      </div>

      {/* Contact and Service Code */}
      <div className="mt-8 text-center">
        <a href="#" className="hover:text-gray-400">
          Contact us
        </a>
        <div className="mt-4">
          <button className="px-4 py-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-md">
            Service Code
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
