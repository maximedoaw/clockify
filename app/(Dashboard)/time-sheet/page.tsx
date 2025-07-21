"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, ChevronDown, Copy, Save, Download, Menu, Search, Star, ChevronUp, Edit } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Check } from "lucide-react";

const COLORS = [
  { name: "green", class: "bg-green-500" },
  { name: "blue", class: "bg-blue-500" },
  { name: "red", class: "bg-red-500" },
  { name: "purple", class: "bg-purple-500" },
  { name: "yellow", class: "bg-yellow-400" },
  { name: "orange", class: "bg-orange-500" },
  { name: "pink", class: "bg-pink-400" },
  { name: "teal", class: "bg-teal-500" },
  { name: "gray", class: "bg-gray-500" },
];

function ColorPicker({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${COLORS.find(c => c.name === value)?.class || "bg-gray-200"} border-gray-300`}
          aria-label="Choose color"
        >
          {value && <Check className="w-4 h-4 text-white" />}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <div className="grid grid-cols-3 gap-2">
          {COLORS.map((color) => (
            <button
              key={color.name}
              type="button"
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${color.class} ${value === color.name ? "ring-2 ring-blue-500" : "border-gray-300"}`}
              onClick={() => onChange(color.name)}
              aria-label={color.name}
            >
              {value === color.name && <Check className="w-4 h-4 text-white" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function TimesheetPage() {
  const [selectedWeek, setSelectedWeek] = useState("This week")
  // const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("green");

  const weekDays = [
    { label: "Project", value: "project" },
    { label: "Mo 30.09", value: "mon", time: "00:00:00" },
    { label: "Tu 01.10", value: "tue", time: "00:00:00" },
    { label: "We 02.10", value: "wed", time: "00:00:00" },
    { label: "Th 03.10", value: "thu", time: "00:00:00" },
    { label: "Fr 04.10", value: "fri", time: "00:00:00" },
    { label: "Sa 05.10", value: "sat", time: "00:00:00" },
    { label: "Su 06.10", value: "sun", time: "00:00:00" },
    { label: "Total", value: "total", time: "00:00:00" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800">Timesheet</h1>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 bg-transparent">
              Teammates
              <ChevronDown className="w-4 h-4" />
            </Button>

            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="This week">This week</SelectItem>
                <SelectItem value="Last week">Last week</SelectItem>
                <SelectItem value="Next week">Next week</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" size="sm" className="sm:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {/* Week Navigation */}
        <div className="bg-blue-100 rounded-lg mb-4 overflow-x-auto lg:overflow-x-visible xl:overflow-x-visible">
          <div className="grid grid-cols-10 w-[900px] sm:w-[1100px] md:w-[1300px] lg:w-full min-w-[900px] sm:min-w-[1100px] md:min-w-[1300px] lg:min-w-0">
            <div className="col-span-1 flex items-center justify-center px-3 py-3 w-full min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-0 max-w-xs text-blue-600 font-medium text-center text-sm sm:text-base md:text-lg lg:text-lg">
              Projects
            </div>
            {weekDays.slice(1).map((day, index) => (
              <div
                key={day.value}
                className={`col-span-1 flex items-center justify-center px-3 py-3 w-full min-w-[80px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-0 max-w-xs text-sm sm:text-base md:text-lg lg:text-lg ${
                  index === weekDays.length - 2
                    ? "bg-blue-200 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <div className="truncate break-words w-full">{day.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Selection Row - Responsive */}
        {/* Version mobile/tablette : liste verticale déroulante, enroulable */}
        <div className="bg-white rounded-lg border border-gray-200 mb-4 block lg:hidden">
          <div className="flex flex-col gap-2 p-4">
            <div className="mb-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center w-full min-w-0 cursor-pointer border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-blue-500 bg-white mr-2">
                      <Plus className="w-4 h-4 text-blue-500" />
                    </span>
                    <span className="text-blue-600 font-medium hover:underline truncate break-words w-full">Select Project</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-0" align="start" sideOffset={5}>
                  <div className="p-4 border-b">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search Project or Client" className="pl-10 bg-gray-50 border-gray-200" />
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Accordion type="single" collapsible defaultValue="projects" className="flex-1">
                        <AccordionItem value="projects" className="border-0">
                          <div className="flex items-center justify-between">
                            <AccordionTrigger className="p-0 hover:underline text-sm text-gray-600 font-medium flex items-center gap-2 flex-shrink-0">
                              <span>2 Projects</span>
                            </AccordionTrigger>
                            <button type="button" className="ml-2 p-1 rounded hover:bg-gray-100">
                              <Edit className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                          <AccordionContent className="p-0">
                            <div className="space-y-3 mt-3">
                              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                  <span className="text-gray-700">clockify</span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                                  <span className="mr-1">Create Task</span>
                                  <Star className="w-4 h-4 hover:bg-amber-300 cursor-pointer duration-100" />
                                </Button>
                              </div>
                              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                  <span className="text-gray-700">Max steel</span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                                  <span className="mr-1">Create Task</span>
                                  <Star className="w-4 h-4 hover:bg-amber-300 cursor-pointer duration-100" />
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    <div className="mt-6 pt-4 border-t">
                      <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Create new Project
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-gray-600 font-normal">Create new Project</DialogTitle>
                          </DialogHeader>

                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Input placeholder="Enter Project name" className="bg-gray-50 border-gray-200" />
                              </div>
                              <div>
                                <Select>
                                  <SelectTrigger className="bg-gray-50 border-gray-200">
                                    <SelectValue placeholder="Select client" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="client1">Client 1</SelectItem>
                                    <SelectItem value="client2">Client 2</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center gap-3">
                                <ColorPicker value={selectedColor} onChange={setSelectedColor} />
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="public"
                                    defaultChecked
                                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                  />
                                  <Label htmlFor="public" className="text-blue-500 font-medium">
                                    Public
                                  </Label>
                                </div>
                              </div>

                              <div>
                                <Select>
                                  <SelectTrigger className="bg-gray-50 border-gray-200">
                                    <SelectValue placeholder="No template" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="template1">Template 1</SelectItem>
                                    <SelectItem value="template2">Template 2</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-3 pt-4">
                            <Button
                              variant="ghost"
                              onClick={() => setIsCreateProjectOpen(false)}
                              className="text-gray-500"
                            >
                              Cancel
                            </Button>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">CREATE</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Accordion type="single" collapsible defaultValue="" className="flex-1">
              <AccordionItem value="days" className="border-0">
                <AccordionTrigger className="px-0 py-2 text-gray-700 font-medium text-base bg-gray-100 rounded-lg">
                  Afficher les jours et heures
                </AccordionTrigger>
                <AccordionContent className="px-0 pt-2 pb-0">
                  <div className="flex flex-col gap-2">
                    {weekDays.slice(1).map((day, index) => (
                      <div key={day.value} className="flex flex-col gap-1">
                        <label className="text-gray-700 text-sm font-medium">{day.label}</label>
                        <input
                          type="text"
                          value={day.time}
                          readOnly
                          className="w-full text-center bg-transparent text-gray-600 text-base cursor-not-allowed border border-gray-200 rounded-lg py-2"
                          title="Select project/task first"
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Version desktop : grid horizontal */}
        <div className="bg-white rounded-lg border border-gray-200 mb-4 overflow-x-auto hidden lg:block">
          <div className="grid grid-cols-10 w-full min-w-0">
            <div className="col-span-1 flex items-center px-3 py-3 w-full min-w-0 max-w-xs border-r border-gray-200 cursor-pointer hover:bg-gray-50">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center w-full min-w-0">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-blue-500 bg-white mr-2">
                      <Plus className="w-4 h-4 text-blue-500" />
                    </span>
                    <span className="text-blue-600 font-medium hover:underline truncate break-words w-full">Select Project</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-0" align="start" sideOffset={5}>
                  <div className="p-4 border-b">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search Project or Client" className="pl-10 bg-gray-50 border-gray-200" />
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Accordion type="single" collapsible defaultValue="projects" className="flex-1">
                        <AccordionItem value="projects" className="border-0">
                          <div className="flex items-center justify-between">
                            <AccordionTrigger className="p-0 hover:underline text-sm text-gray-600 font-medium flex items-center gap-2 flex-shrink-0">
                              <span>2 Projects</span>
                            </AccordionTrigger>
                            <button type="button" className="ml-2 p-1 rounded hover:bg-gray-100">
                              <Edit className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                          <AccordionContent className="p-0">
                            <div className="space-y-3 mt-3">
                              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                  <span className="text-gray-700">clockify</span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                                  <span className="mr-1">Create Task</span>
                                  <Star className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                  <span className="text-gray-700">Max steel</span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                                  <span className="mr-1">Create Task</span>
                                  <Star className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    <div className="mt-6 pt-4 border-t">
                      <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Create new Project
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-gray-600 font-normal">Create new Project</DialogTitle>
                          </DialogHeader>

                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Input placeholder="Enter Project name" className="bg-gray-50 border-gray-200" />
                              </div>
                              <div>
                                <Select>
                                  <SelectTrigger className="bg-gray-50 border-gray-200">
                                    <SelectValue placeholder="Select client" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="client1">Client 1</SelectItem>
                                    <SelectItem value="client2">Client 2</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center gap-3">
                                <ColorPicker value={selectedColor} onChange={setSelectedColor} />
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="public"
                                    defaultChecked
                                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                  />
                                  <Label htmlFor="public" className="text-blue-500 font-medium">
                                    Public
                                  </Label>
                                </div>
                              </div>

                              <div>
                                <Select>
                                  <SelectTrigger className="bg-gray-50 border-gray-200">
                                    <SelectValue placeholder="No template" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="template1">Template 1</SelectItem>
                                    <SelectItem value="template2">Template 2</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-3 pt-4">
                            <Button
                              variant="ghost"
                              onClick={() => setIsCreateProjectOpen(false)}
                              className="text-gray-500"
                            >
                              Cancel
                            </Button>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">CREATE</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {weekDays.slice(1).map((day, index) => (
              <div
                key={day.value}
                className={`col-span-1 flex items-center justify-center px-3 py-3 w-full min-w-0 max-w-xs border-r border-gray-200 last:border-r-0 text-base lg:text-lg ${
                  day.value === "total" ? "bg-gray-50 font-semibold" : ""
                }`}
              >
                <input
                  type="text"
                  value={day.time}
                  readOnly
                  className="w-full text-center bg-transparent text-gray-600 text-base lg:text-lg cursor-not-allowed truncate break-words"
                  title="Select project/task first"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Total Row */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 mb-6 overflow-x-auto lg:overflow-x-visible xl:overflow-x-visible">
          <div className="grid grid-cols-10 w-[900px] sm:w-[1100px] md:w-[1300px] lg:w-full min-w-[900px] sm:min-w-[1100px] md:min-w-[1300px] lg:min-w-0">
            <div className="col-span-1 flex items-center px-3 py-3 w-full min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-0 max-w-xs border-r border-blue-200">
              <span className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg lg:text-lg truncate break-words w-full">Total</span>
            </div>
            {weekDays.slice(1).map((day) => (
              <div
                key={day.value}
                className={`col-span-1 flex items-center justify-center px-3 py-3 w-full min-w-[80px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-0 max-w-xs border-r border-blue-200 last:border-r-0 text-sm sm:text-base md:text-lg lg:text-lg ${
                  day.value === "total" ? "bg-blue-100 font-bold" : ""
                }`}
              >
                <span className="text-gray-700 font-medium truncate break-words w-full">{day.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Plus className="w-4 h-4" />
            Add new row
          </Button>

          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Copy className="w-4 h-4" />
            Copy last week
            <ChevronDown className="w-4 h-4" />
          </Button>

          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Save className="w-4 h-4" />
            Save as template
          </Button>
        </div>
      </main>
    </div>
  )
}
