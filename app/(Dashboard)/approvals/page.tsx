"use client"

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import React, { useState } from "react";

type ModalType = "approve" | "remind" | null;
type TabType = "pending" | "unsubmitted" | "archive";

const ApprovalsPage = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [activeTab, setActiveTab] = useState<TabType>("pending");

  const handleApproveAll = () => {
    setModalType("approve");
  };

  const handleRemindToApprove = () => {
    setModalType("remind");
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleConfirmApprove = () => {
    console.log("Approving all timesheets...");
    setModalType(null);
  };

  const handleSendReminder = () => {
    console.log("Sending reminders...");
    setModalType(null);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "pending":
        return (
          <div className="space-y-6">
            {/* Week 1 */}
            <div className="border border-gray-200 rounded-sm">
              <div className="bg-gray-100 text-sm px-5 py-3 font-medium">
                Sep 22, 2025 - Sep 28, 2025
              </div>
              <div className="grid grid-cols-4 text-xs uppercase text-gray-400 px-5 py-3 border-b border-gray-200">
                <div>User</div>
                <div className="text-right">Team Manager</div>
                <div className="text-right">Time</div>
                <div className="text-right">Time Off</div>
              </div>
              <div className="grid grid-cols-4 px-5 py-3 text-sm border-t border-gray-200">
                <div>[SAMPLE] Amy Smith</div>
                <div className="text-right">[SAMPLE] James Anderson</div>
                <div className="text-right">09:00:00</div>
                <div className="text-right">0,00h</div>
              </div>
            </div>

            {/* Week 2 */}
            <div className="border border-gray-200 rounded-sm">
              <div className="bg-gray-100 text-sm px-5 py-3 font-medium">
                Jun 9, 2025 - Jun 15, 2025
              </div>
              <div className="grid grid-cols-4 text-xs uppercase text-gray-400 px-5 py-3 border-b border-gray-200">
                <div>User</div>
                <div className="text-right">Team Manager</div>
                <div className="text-right">Time</div>
                <div className="text-right">Time Off</div>
              </div>
              <div className="grid grid-cols-4 px-5 py-3 text-sm border-t border-gray-200">
                <div>[SAMPLE] Amy Smith</div>
                <div className="text-right">[SAMPLE] James Anderson</div>
                <div className="text-right">04:00:00</div>
                <div className="text-right">0,00h</div>
              </div>
            </div>
          </div>
        );
      case "unsubmitted":
        return (
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-sm">
              <div className="bg-gray-100 text-sm px-5 py-3 font-medium">
                Unsubmitted Timesheets
              </div>
              <div className="grid grid-cols-4 text-xs uppercase text-gray-400 px-5 py-3 border-b border-gray-200">
                <div>User</div>
                <div className="text-right">Team Manager</div>
                <div className="text-right">Status</div>
                <div className="text-right">Last Activity</div>
              </div>
              <div className="grid grid-cols-4 px-5 py-3 text-sm border-t border-gray-200">
                <div>[SAMPLE] John Doe</div>
                <div className="text-right">[SAMPLE] James Anderson</div>
                <div className="text-right">Not Submitted</div>
                <div className="text-right">2 days ago</div>
              </div>
            </div>
          </div>
        );
      case "archive":
        return (
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-sm">
              <div className="bg-gray-100 text-sm px-5 py-3 font-medium">
                Archived Timesheets
              </div>
              <div className="grid grid-cols-4 text-xs uppercase text-gray-400 px-5 py-3 border-b border-gray-200">
                <div>User</div>
                <div className="text-right">Team Manager</div>
                <div className="text-right">Time</div>
                <div className="text-right">Date Approved</div>
              </div>
              <div className="grid grid-cols-4 px-5 py-3 text-sm border-t border-gray-200">
                <div>[SAMPLE] Jane Wilson</div>
                <div className="text-right">[SAMPLE] James Anderson</div>
                <div className="text-right">40:00:00</div>
                <div className="text-right">Jan 15, 2025</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div>
        <div className="mt-18 mb-6">
          <h1 className="text-2xl text-gray-600 font-700 ml-5">Approvals</h1>
        </div>
        <div className="flex flex-col">
          {/* Tabs */}
          <div className="flex space-x-2 border-b">
            <button 
              onClick={() => setActiveTab("pending")}
              className={`px-8 py-3 text-sm font-semibold border border-b-0 ${
                activeTab === "pending" 
                  ? "border-gray-300 bg-white text-gray-800" 
                  : "border-gray-200 bg-gray-100 text-gray-500"
              }`}
            >
              PENDING
            </button>
            <button 
              onClick={() => setActiveTab("unsubmitted")}
              className={`px-8 py-3 text-sm font-semibold border border-b-0 ${
                activeTab === "unsubmitted" 
                  ? "border-gray-300 bg-white text-gray-800" 
                  : "border-gray-200 bg-gray-100 text-gray-500"
              }`}
            >
              UNSUBMITTED
            </button>
            <button 
              onClick={() => setActiveTab("archive")}
              className={`px-8 py-3 text-sm font-semibold border border-b-0 ${
                activeTab === "archive" 
                  ? "border-gray-300 bg-white text-gray-800" 
                  : "border-gray-200 bg-gray-100 text-gray-500"
              }`}
            >
              ARCHIVE
            </button>
          </div>

          {/* Content */}
          <div className="p-5 bg-white text-gray-700 border-t-0">
            {/* Filters + Actions */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex space-x-3">
                <Select>
                  <SelectTrigger className="w-[150px] h-9 text-sm border border-gray-300">
                    <SelectValue placeholder="Sort by: Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date" className="text-sm">Sort by: Date</SelectItem>
                    <SelectItem value="name" className="text-sm">Sort by: Name</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[120px] h-9 text-sm border border-gray-300">
                    <SelectValue placeholder="Team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team1" className="text-sm">Team 1</SelectItem>
                    <SelectItem value="team2" className="text-sm">Team 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3">
                {/* Bouton REMIND TO APPROVE */}
                <button
                  onClick={handleRemindToApprove}
                  className="h-9 px-5 text-sm cursor-pointer font-medium border border-blue-500 text-blue-500 bg-white hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1 flex items-center justify-center"
                >
                  REMIND TO APPROVE
                </button>

                {/* Bouton APPROVE ALL */}
                <button
                  onClick={handleApproveAll}
                  className="h-9 px-5 text-sm cursor-pointer font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1 flex items-center justify-center"
                >
                  APPROVE ALL
                </button>
              </div>
            </div>

            {/* Dynamic Content based on active tab */}
            {getTabContent()}
          </div>
        </div>
      </div>

      {/* Modal avec Dialog shadcn/ui */}
      <Dialog open={modalType !== null} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[500px] p-0 gap-0 border-none shadow-lg">
          {/* Header personnalisé */}
          <DialogHeader className="px-6 py-5 border-b border-gray-200 space-y-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-normal text-gray-700">
                {modalType === "approve" 
                  ? "Approve all" 
                  : "Remind to approve time and expenses"}
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="px-6 py-6">
            <DialogDescription className="text-[15px] text-black font-700 leading-relaxed">
              {modalType === "approve" 
                ? "Once everything is approved, time will be locked and no one will be able to edit it anymore."
                : "Ready to send email reminders to team managers who haven't yet approved their team's pending timesheets?"}
            </DialogDescription>
          </div>

          {/* Footer personnalisé */}
          <DialogFooter className="px-6 py-5 border-t border-gray-200 sm:justify-end space-x-3">
            <button
              onClick={handleCloseModal}
              className="px-6 py-2 text-sm font-medium text-[#00a8e1] hover:text-[#0096ca] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={modalType === "approve" ? handleConfirmApprove : handleSendReminder}
              className="px-6 py-2 text-sm font-semibold bg-[#00a8e1] hover:bg-[#0096ca] text-white transition-colors tracking-wide"
            >
              {modalType === "approve" ? "APPROVE ALL" : "SEND"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApprovalsPage;