import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ApprovalsPage = () => {
  return (
    <div className="px-2 sm:px-4 mt-17 md:px-6 lg:px-10">
      {/* Bandeau Pro Feature */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center bg-blue-100 text-blue-500 mt-10 py-3 px-3 rounded-md">
        <h2 className="font-bold my-auto">STANDARD feature</h2>
        <Button className="bg-blue-500 text-white my-2 sm:my-0 sm:ml-3" variant="secondary">
          Upgrade
        </Button>
      </div>

      {/* Bloc principal */}
      <div className="bg-white w-full mt-6 rounded-md shadow-sm p-4 md:p-6 lg:p-8">
        {/* Partie activité + GPS */}
        <div className="mb-8">
          <h3 className="text-sm md:text-md font-medium text-gray-600 mb-3">Approval</h3>
          <h1 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
            Formally approve timesheets
          </h1>

          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-black rounded-full mt-1.5 mr-3"></div>
              <span>Submit timesheets for approval</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-black rounded-full mt-1.5 mr-3"></div>
              <span>Remind people to submit timesheets</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-black rounded-full mt-1.5 mr-3"></div>
              <span>Allow managers to approve (or reject) timesheets</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-black rounded-full mt-1.5 mr-3"></div>
              <span>Prevent changes to approved timesheets</span>
            </li>
          </ul>

          <div className="mt-4">
            <Link href={"#"}>
              <h2 className="text-base md:text-lg font-semibold text-blue-500 hover:underline">
                How approval works
              </h2>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="w-full flex">
          <Image
            width={700}
            height={700}
            alt="activity-image"
            src="/img25.png"
            className="w-full max-w-3xl h-auto rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ApprovalsPage;
