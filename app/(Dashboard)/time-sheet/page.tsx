"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Plus, Copy, FileText, LayoutGrid, List, X, Clock, User, FolderOpen, Trash2, Check } from "lucide-react"
import { useState, useRef } from "react"
import { format, addDays, startOfWeek, addWeeks, isThisWeek } from "date-fns"

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

  // Nouvelle structure pour gérer les lignes dynamiques du timesheet
  const [rows, setRows] = useState<Array<{
    id: string,
    projectId: string | null,
    projectName: string,
    client: string,
    template: string,
    workHours: { [key: string]: string }
  }>>([])
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [rowToEdit, setRowToEdit] = useState<string | null>(null)
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectClient, setNewProjectClient] = useState("")
  const [newProjectTemplate, setNewProjectTemplate] = useState("")
  const [timeModalOpen, setTimeModalOpen] = useState(false)
  const [editingRowId, setEditingRowId] = useState<string | null>(null)
  const [editingDay, setEditingDay] = useState<string>("")
  const [timeInput, setTimeInput] = useState({ hours: "", minutes: "", seconds: "" })

  const [weekOffset, setWeekOffset] = useState(0)

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

  // Fonction utilitaire pour obtenir les dates de la semaine courante (lundi à dimanche) avec offset
  const getWeekDates = (offset = 0) => {
    const today = new Date()
    const start = startOfWeek(addWeeks(today, offset), { weekStartsOn: 1 })
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }
  const weekDates = getWeekDates(weekOffset)

  // Label dynamique pour la semaine
  const getWeekLabel = () => {
    if (weekOffset === 0) return "This week"
    if (weekOffset === -1) return "Last week"
    if (weekOffset === 1) return "Next week"
    // Affiche la plage de dates (ex: 8–14 juil)
    const start = weekDates[0]
    const end = weekDates[6]
    return `${format(start, "d MMM")} – ${format(end, "d MMM")}`
  }

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
    // Ajouter une ligne dans le timesheet avec ce projet sélectionné
    setRows(prev => [
      ...prev,
      {
        id: newProjectData.id + "-row",
        projectId: newProjectData.id,
        projectName: newProjectData.name,
        client: newProjectData.client,
        template: newProjectData.template,
        workHours: { ...newProjectData.workHours }
      }
    ])
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

  // Ajout d'une nouvelle ligne
  const handleAddRow = () => {
    setRows(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        projectId: null,
        projectName: "",
        client: "",
        template: "",
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
    ])
  }

  // Suppression d'une ligne
  const handleDeleteRow = (rowId: string) => {
    setRows(prev => prev.filter(row => row.id !== rowId))
  }

  // Sélection d'un projet existant
  const handleSelectProject = (rowId: string, projectId: string) => {
    const project = createdProjects.find(p => p.id === projectId)
    if (project) {
      setRows(prev => prev.map(row =>
        row.id === rowId
          ? {
              ...row,
              projectId: project.id,
              projectName: project.name,
              client: project.client,
              template: project.template,
              workHours: { ...project.workHours }
            }
          : row
      ))
    }
  }

  // Création d'un nouveau projet depuis la ligne
  const handleCreateProjectFromRow = (rowId: string) => {
    if (!newProjectName) return
    const newId = Date.now().toString()
    const newProj = {
      id: newId,
      name: newProjectName,
      client: newProjectClient,
      template: newProjectTemplate,
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
    setCreatedProjects(prev => [...prev, newProj])
    setRows(prev => prev.map(row =>
      row.id === rowId
        ? {
            ...row,
            projectId: newId,
            projectName: newProjectName,
            client: newProjectClient,
            template: newProjectTemplate
          }
        : row
    ))
    setProjectModalOpen(false)
    setNewProjectName("")
    setNewProjectClient("")
    setNewProjectTemplate("")
    setRowToEdit(null)
  }

  // Saisie des horaires pour chaque jour
  const openTimeModalForRow = (rowId: string, day: string) => {
    setEditingRowId(rowId)
    setEditingDay(day)
    const row = rows.find(r => r.id === rowId)
    if (row) {
      const currentTime = row.workHours[day]
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
    }
    setTimeModalOpen(true)
  }

  const saveTimeForRow = () => {
    if (!editingRowId) return
    setRows(prev => prev.map(row =>
      row.id === editingRowId
        ? {
            ...row,
            workHours: {
              ...row.workHours,
              [editingDay]: `${timeInput.hours || 0}h ${timeInput.minutes || 0}m ${timeInput.seconds || 0}s`
            }
          }
        : row
    ))
    setTimeModalOpen(false)
    setEditingRowId(null)
    setEditingDay("")
  }

  // Sélection du template
  const handleSelectTemplate = (rowId: string, templateId: string) => {
    setRows(prev => prev.map(row =>
      row.id === rowId
        ? { ...row, template: templateId }
        : row
    ))
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
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent" onClick={() => setWeekOffset(weekOffset - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-3">{getWeekLabel()}</span>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent" onClick={() => setWeekOffset(weekOffset + 1)}>
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
        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="w-48 min-w-[192px] py-3 px-2 sm:px-4 text-left text-sm font-medium text-gray-700 align-bottom">Projet</th>
                {days.map((day, idx) => (
                  <th key={day.key} className="w-20 min-w-[80px] py-1 px-2 sm:px-3 text-center text-sm font-medium text-gray-700 align-bottom">
                    <div className="text-xs sm:text-sm font-semibold">{day.short}</div>
                    <div className="text-[11px] text-gray-500 font-normal">
                      {format(weekDates[idx], "d MMM", { locale: undefined })}
                    </div>
                  </th>
                ))}
                <th className="w-32 min-w-[100px] py-3 px-2 sm:px-3 text-center text-sm font-medium text-gray-700 align-bottom">Template</th>
                <th className="w-16 min-w-[64px] py-3 px-2 sm:px-3 text-center text-sm font-medium text-gray-700 align-bottom">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  {/* Projet selection/creation */}
                  <td className="py-2 px-2 sm:px-4 align-middle">
                    <div className="flex items-center gap-2">
                      <Select value={row.projectId || ""} onValueChange={val => handleSelectProject(row.id, val)}>
                        <SelectTrigger className="w-full min-w-[120px]">
                          <SelectValue placeholder="Sélectionner projet" />
                        </SelectTrigger>
                        <SelectContent>
                          {createdProjects.map(proj => (
                            <SelectItem key={proj.id} value={proj.id}>{proj.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" onClick={() => { setProjectModalOpen(true); setRowToEdit(row.id) }} className="h-8 w-8 p-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 truncate mt-1">
                      {row.projectName || "Aucun projet sélectionné"}
                    </div>
                  </td>
                  {/* Horaires par jour */}
                  {days.map(day => (
                    <td key={day.key} className="py-2 px-1 text-center align-middle">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openTimeModalForRow(row.id, day.key)}
                        className="w-16 h-7 text-xs border-gray-300 bg-white hover:bg-gray-50 px-1"
                      >
                        {(row.workHours[day.key] || "0h 0m 0s").replace(/\s+/g, "")}
                      </Button>
                    </td>
                  ))}
                  {/* Template */}
                  <td className="py-2 px-2 text-center align-middle">
                    <Select value={row.template} onValueChange={val => handleSelectTemplate(row.id, val)}>
                      <SelectTrigger className="w-full min-w-[80px]">
                        <SelectValue placeholder="Template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map(tpl => (
                          <SelectItem key={tpl.id} value={tpl.id}>{tpl.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  {/* Actions */}
                  <td className="py-2 px-2 text-center align-middle">
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteRow(row.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
          {/* Bouton Add new row */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-4 border-t border-gray-200">
            <Button variant="outline" className="flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3 bg-white border-gray-300" onClick={handleAddRow}>
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
              <span className="hidden sm:inline">Add new row</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Modal création projet depuis ligne */}
      <Dialog open={projectModalOpen} onOpenChange={setProjectModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Créer un nouveau projet
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="project-name" className="text-sm font-medium">Nom du projet *</label>
              <Input
                id="project-name"
                value={newProjectName}
                onChange={e => setNewProjectName(e.target.value)}
                placeholder="Entrer le nom du projet"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="project-client" className="text-sm font-medium">Client (optionnel)</label>
              <Select value={newProjectClient} onValueChange={setNewProjectClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="project-template" className="text-sm font-medium">Template (optionnel)</label>
              <Select value={newProjectTemplate} onValueChange={setNewProjectTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map(template => (
                    <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setProjectModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => rowToEdit && handleCreateProjectFromRow(rowToEdit)} disabled={!newProjectName}>
              Créer le projet
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal pour saisir les horaires */}
      <Dialog open={timeModalOpen} onOpenChange={setTimeModalOpen}>
        <DialogContent className="sm:max-w-[300px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Saisir les horaires - {days.find(d => d.key === editingDay)?.label}
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
                onChange={e => setTimeInput(prev => ({ ...prev, hours: e.target.value }))}
                className="w-16 h-8 text-xs text-center"
              />
              <span className="text-sm text-gray-500">h</span>
              <Input
                type="number"
                placeholder="0"
                min="0"
                max="59"
                value={timeInput.minutes}
                onChange={e => setTimeInput(prev => ({ ...prev, minutes: e.target.value }))}
                className="w-16 h-8 text-xs text-center"
              />
              <span className="text-sm text-gray-500">m</span>
              <Input
                type="number"
                placeholder="0"
                min="0"
                max="59"
                value={timeInput.seconds}
                onChange={e => setTimeInput(prev => ({ ...prev, seconds: e.target.value }))}
                className="w-16 h-8 text-xs text-center"
              />
              <span className="text-sm text-gray-500">s</span>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setTimeModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={saveTimeForRow}>
              Enregistrer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
