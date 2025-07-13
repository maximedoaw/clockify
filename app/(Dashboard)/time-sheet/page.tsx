"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Plus, Copy, FileText, LayoutGrid, List, X, Clock, User, FolderOpen, Trash2, Check } from "lucide-react"
import { useState } from "react"

export default function TimesheetPage() {
  const [selectedProject, setSelectedProject] = useState("")
  const [workHours, setWorkHours] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: ""
  })
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState("")
  const [timeInput, setTimeInput] = useState({ hours: "", minutes: "", seconds: "" })
  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    template: ""
  })
  const [createdProjects, setCreatedProjects] = useState<Array<{
    id: string,
    name: string,
    client: string,
    template: string,
    workHours: {
      monday: string,
      tuesday: string,
      wednesday: string,
      thursday: string,
      friday: string,
      saturday: string,
      sunday: string
    }
  }>>([])

  const clients = [
    { id: "1", name: "Client A" },
    { id: "2", name: "Client B" },
    { id: "3", name: "Client C" },
    { id: "4", name: "Client D" },
  ]

  const templates = [
    { id: "1", name: "Standard 8h/day" },
    { id: "2", name: "Part-time 4h/day" },
    { id: "3", name: "Overtime 10h/day" },
    { id: "4", name: "Custom" },
  ]

  const days = [
    { key: "monday", label: "Mon", short: "Mo" },
    { key: "tuesday", label: "Tue", short: "Tu" },
    { key: "wednesday", label: "Wed", short: "We" },
    { key: "thursday", label: "Thu", short: "Th" },
    { key: "friday", label: "Fri", short: "Fr" },
    { key: "saturday", label: "Sat", short: "Sa" },
    { key: "sunday", label: "Sun", short: "Su" },
  ]

  const handleWorkHoursChange = (day: string, value: string) => {
    setWorkHours(prev => ({
      ...prev,
      [day]: value
    }))
  }

  const clearWorkHours = (day: string) => {
    setWorkHours(prev => ({
      ...prev,
      [day]: ""
    }))
  }

  const openTimeModal = (day: string) => {
    setSelectedDay(day)
    const currentTime = workHours[day as keyof typeof workHours]
    if (currentTime) {
      // Parse existing time format "Xh Ym Zs" to individual values
      const match = currentTime.match(/(\d+)h\s*(\d+)m\s*(\d+)s/)
      if (match) {
        setTimeInput({ hours: match[1], minutes: match[2], seconds: match[3] })
      } else {
        setTimeInput({ hours: "", minutes: "", seconds: "" })
      }
    } else {
      setTimeInput({ hours: "", minutes: "", seconds: "" })
    }
    setIsTimeModalOpen(true)
  }

  const saveTime = () => {
    const timeString = `${timeInput.hours || 0}h ${timeInput.minutes || 0}m ${timeInput.seconds || 0}s`
    handleWorkHoursChange(selectedDay, timeString)
    setIsTimeModalOpen(false)
  }

  const handleCreateProject = () => {
    const newProjectData = {
      id: Date.now().toString(),
      name: newProject.name,
      client: newProject.client,
      template: newProject.template,
      workHours: {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
      }
    }
    setCreatedProjects(prev => [...prev, newProjectData])
    setIsCreateModalOpen(false)
    setNewProject({ name: "", client: "", template: "" })
  }

  const deleteProject = (projectId: string) => {
    setCreatedProjects(prev => prev.filter(project => project.id !== projectId))
    if (selectedProject === projectId) {
      setSelectedProject("")
    }
  }

  const openProjectTimeModal = (projectId: string, day: string) => {
    const project = createdProjects.find(p => p.id === projectId)
    if (project) {
      setSelectedDay(day)
      const currentTime = project.workHours[day as keyof typeof project.workHours]
      if (currentTime) {
        const match = currentTime.match(/(\d+)h\s*(\d+)m\s*(\d+)s/)
        if (match) {
          setTimeInput({ hours: match[1], minutes: match[2], seconds: match[3] })
        } else {
          setTimeInput({ hours: "", minutes: "", seconds: "" })
        }
      } else {
        setTimeInput({ hours: "", minutes: "", seconds: "" })
      }
      setIsTimeModalOpen(true)
    }
  }

  const saveProjectTime = () => {
    if (selectedProject) {
      const timeString = `${timeInput.hours || 0}h ${timeInput.minutes || 0}m ${timeInput.seconds || 0}s`
      setCreatedProjects(prev => prev.map(project => 
        project.id === selectedProject 
          ? { ...project, workHours: { ...project.workHours, [selectedDay]: timeString } }
          : project
      ))
      setIsTimeModalOpen(false)
    }
  }

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProject(selectedProject === projectId ? "" : projectId)
  }

  const formatTimeDisplay = (day: string) => {
    const time = workHours[day as keyof typeof workHours]
    return time || ""
  }

  const formatProjectTimeDisplay = (project: any, day: string) => {
    const time = project.workHours[day as keyof typeof project.workHours]
    return time || "0h 0m 0s"
  }

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 gap-4 sm:gap-3">
        <h1 className="text-lg sm:text-xl font-medium text-gray-900">Timesheet</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          {/* Teammates Dropdown */}
          <Select defaultValue="teammates">
            <SelectTrigger className="w-full sm:w-[120px] h-8 text-sm border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teammates">Teammates</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded w-full sm:w-auto">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-none border-r border-gray-300">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-none">
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Week Navigation */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-3">This week</span>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Create Project Section */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-medium text-gray-900">Create New Project</h2>
          </div>
          
          {/* Create New Project Button */}
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-3">
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" />
                  Create New Project
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="project-name" className="text-sm font-medium">Project Name *</label>
                  <Input
                    id="project-name"
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter project name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="project-client" className="text-sm font-medium">Client (Optional)</label>
                  <Select value={newProject.client} onValueChange={(value) => setNewProject(prev => ({ ...prev, client: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="project-template" className="text-sm font-medium">Template (Optional)</label>
                  <Select value={newProject.template} onValueChange={(value) => setNewProject(prev => ({ ...prev, template: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProject} disabled={!newProject.name}>
                  Create Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Timesheet Content */}
      <div className="p-4 sm:p-6">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Header Row */}
          <div className="flex bg-gray-50 border-b border-gray-200 overflow-x-auto">
            <div className="flex-shrink-0 py-3 px-2 sm:px-4 text-sm font-medium text-gray-700 w-32 sm:w-48 min-w-[128px] sm:min-w-[192px]">
              Projects
            </div>
            <div className="flex-shrink-0 flex justify-center py-3 px-2 sm:px-3 text-sm font-medium text-gray-700 w-20 sm:w-24 min-w-[80px] sm:min-w-[100px]">
              <div className="text-xs sm:text-sm">Mo, Jul 7</div>
            </div>
            <div className="flex-shrink-0 flex justify-center py-3 px-2 sm:px-3 text-sm font-medium text-gray-700 w-20 sm:w-24 min-w-[80px] sm:min-w-[100px]">
              <div className="text-xs sm:text-sm">Tu, Jul 8</div>
            </div>
            <div className="flex-shrink-0 flex justify-center py-3 px-2 sm:px-3 text-sm font-medium text-gray-700 w-20 sm:w-24 min-w-[80px] sm:min-w-[100px]">
              <div className="text-xs sm:text-sm">We, Jul 9</div>
            </div>
            <div className="flex-shrink-0 flex justify-center py-3 px-2 sm:px-3 text-sm font-medium text-gray-700 w-20 sm:w-24 min-w-[80px] sm:min-w-[100px]">
              <div className="text-xs sm:text-sm">Th, Jul 10</div>
            </div>
            <div className="flex-shrink-0 flex justify-center py-3 px-2 sm:px-3 text-sm font-medium text-gray-700 w-20 sm:w-24 min-w-[80px] sm:min-w-[100px]">
              <div className="text-xs sm:text-sm">Fr, Jul 11</div>
            </div>
            <div className="flex-shrink-0 flex justify-center py-3 px-2 sm:px-3 text-sm font-medium text-gray-700 w-20 sm:w-24 min-w-[80px] sm:min-w-[100px]">
              <div className="text-xs sm:text-sm">Sa, Jul 12</div>
            </div>
            <div className="flex-shrink-0 flex justify-center py-3 px-2 sm:px-3 text-sm font-medium text-gray-700 w-20 sm:w-24 min-w-[80px] sm:min-w-[100px]">
              <div className="text-xs sm:text-sm">Su, Jul 13</div>
            </div>
            <div className="flex justify-center py-3 px-2 sm:px-4 text-sm font-medium text-gray-700 w-16 sm:w-20 flex-shrink-0">
              <div className="text-xs sm:text-sm">Total</div>
            </div>
          </div>

          {/* Scrollable Projects Content */}
          <div className="max-h-96 overflow-y-auto">
            {createdProjects.length > 0 ? (
              <div className="space-y-2 p-4">
                {createdProjects.map((project) => (
                  <div key={project.id} className="flex items-center border-b border-gray-100 py-3">
                    {/* Project Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProjectSelection(project.id)}
                          className={`h-8 w-8 p-0 ${selectedProject === project.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                        >
                          {selectedProject === project.id ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <div className="h-4 w-4 border-2 border-gray-300 rounded" />
                          )}
                        </Button>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{project.name}</h3>
                          <p className="text-sm text-gray-500 truncate">
                            {clients.find(c => c.id === project.client)?.name || "No client"} • 
                            {templates.find(t => t.id === project.template)?.name || "No template"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Work Hours for Each Day */}
                    <div className="flex gap-1 ml-4">
                      {days.map((day) => (
                        <div key={day.key} className="flex flex-col items-center gap-1 min-w-[60px]">
                          <div className="text-xs font-medium text-gray-600">{day.short}</div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openProjectTimeModal(project.id, day.key)}
                            className="w-12 h-6 text-xs border-gray-300 bg-white hover:bg-gray-50 px-1"
                          >
                            {formatProjectTimeDisplay(project, day.key).replace(/\s+/g, '')}
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteProject(project.id)}
                      className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <FolderOpen className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No projects created yet</p>
                  <p className="text-xs mt-1">Create your first project to get started</p>
                </div>
              </div>
            )}
          </div>

        {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-4 border-t border-gray-200">
            <Button variant="outline" className="flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3 bg-white border-gray-300">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
              <span className="hidden sm:inline">Add new row</span>
              <span className="sm:hidden">Add</span>
          </Button>

            <Button variant="outline" className="flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3 bg-white border-gray-300">
              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Copy last week</span>
              <span className="sm:hidden">Copy</span>
          </Button>

            <Button variant="outline" className="flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3 bg-white border-gray-300">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Save as template</span>
              <span className="sm:hidden">Save</span>
          </Button>
        </div>
        </div>
      </div>

      {/* Time Modal */}
      <Dialog open={isTimeModalOpen} onOpenChange={setIsTimeModalOpen}>
        <DialogContent className="sm:max-w-[300px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Set Work Hours - {days.find(d => d.key === selectedDay)?.label}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0"
                min="0"
                max="23"
                value={timeInput.hours}
                onChange={(e) => setTimeInput(prev => ({ ...prev, hours: e.target.value }))}
                className="w-16 h-8 text-xs text-center"
              />
              <span className="text-sm text-gray-500">h</span>
              <Input
                type="number"
                placeholder="0"
                min="0"
                max="59"
                value={timeInput.minutes}
                onChange={(e) => setTimeInput(prev => ({ ...prev, minutes: e.target.value }))}
                className="w-16 h-8 text-xs text-center"
              />
              <span className="text-sm text-gray-500">m</span>
              <Input
                type="number"
                placeholder="0"
                min="0"
                max="59"
                value={timeInput.seconds}
                onChange={(e) => setTimeInput(prev => ({ ...prev, seconds: e.target.value }))}
                className="w-16 h-8 text-xs text-center"
              />
              <span className="text-sm text-gray-500">s</span>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsTimeModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={selectedProject ? saveProjectTime : saveTime}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
