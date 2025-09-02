"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  ChevronDown,
  Star,
  MoreHorizontal,
  Plus,
  Check,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Project {
  id: number;
  name: string;
  client: string;
  tracked: string;
  amount: string;
  progress: string;
  access: "Public" | "Private";
  color: string;
  starred: boolean;
}

interface Filters {
  active: string;
  client: string;
  access: string;
  billing: string;
}

interface FilterOption {
  label: string;
  value: string;
}

interface FilterOptions {
  active: FilterOption[];
  client: FilterOption[];
  access: FilterOption[];
  billing: FilterOption[];
}

interface NewProject {
  name: string;
  client: string;
  isPublic: boolean;
  color: string;
  template: string;
}

type ColorGrid = string[][];

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isColorSelectOpen, setIsColorSelectOpen] = useState<boolean>(false);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<string | null>(
    null
  );
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    active: "Active",
    client: "Client",
    access: "Access",
    billing: "Billing",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newProject, setNewProject] = useState<NewProject>({
    name: "",
    client: "",
    isPublic: true,
    color: "#10B981", // Default teal color
    template: "",
  });

  const colorOptions: ColorGrid = [
    ["#EC4899", "#A855F7", "#6366F1"], // Pink, Purple, Indigo
    ["#3B82F6", "#06B6D4", "#10B981"], // Blue, Cyan, Emerald (selected)
    ["#84CC16", "#F97316", "#8B5CF6"], // Lime, Orange, Violet
  ];

  const filterOptions: FilterOptions = {
    active: [
      { label: "Active", value: "active" },
      { label: "Archived", value: "archived" },
      { label: "All", value: "All" },
    ],
    client: [
      { label: "All Clients", value: "all" },
      { label: "Client A", value: "client-a" },
      { label: "Client B", value: "client-b" },
      { label: "Client C", value: "client-c" },
      { label: "Acme Corp", value: "acme-corp" },
      { label: "Tech Solutions", value: "tech-solutions" },
    ],
    access: [
      { label: "All Access", value: "all" },
      { label: "Public", value: "public" },
      { label: "Private", value: "private" },
      { label: "Team", value: "team" },
    ],
    billing: [
      { label: "Billable", value: "billable" },
      { label: "Non billable", value: "non-billable" },
    ],
  };

  const handleCreateProject = (): void => {
    if (!newProject.name.trim()) return;

    const project: Project = {
      id: Date.now(),
      name: newProject.name,
      client: newProject.client || "–",
      tracked: "0,00h",
      amount: "0,00 USD",
      progress: "–",
      access: newProject.isPublic ? "Public" : "Private",
      color: newProject.color,
      starred: false,
    };

    setProjects((prevProjects) => [...prevProjects, project]);
    setIsModalOpen(false);
    setNewProject({
      name: "",
      client: "",
      isPublic: true,
      color: "#10B981",
      template: "",
    });
  };

  const toggleStar = (projectId: number): void => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, starred: !project.starred }
          : project
      )
    );
  };

  const handleColorSelect = (color: string): void => {
    setNewProject((prev) => ({ ...prev, color }));
    setIsColorSelectOpen(false);
  };

  const handleInputChange = (
    field: keyof NewProject,
    value: string | boolean
  ): void => {
    setNewProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleFilterChange = (
    filterType: keyof Filters,
    option: FilterOption
  ): void => {
    setFilters((prev) => ({ ...prev, [filterType]: option.label }));
    setOpenFilterDropdown(null);
  };

  const toggleFilterDropdown = (filterType: string): void => {
    setOpenFilterDropdown(
      openFilterDropdown === filterType ? null : filterType
    );
  };

  const filteredProjects: Project[] = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ColorSelector: React.FC = () => (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsColorSelectOpen(!isColorSelectOpen)}
        className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white"
        aria-label="Select project color"
      >
        <div
          className="w-6 h-6 rounded border border-gray-300"
          style={{ backgroundColor: newProject.color }}
        />
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isColorSelectOpen && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* Color Grid 3x3 */}
          <div className="space-y-2 mb-4">
            {colorOptions.map((row: string[], rowIndex: number) => (
              <div key={rowIndex} className="flex gap-2">
                {row.map((color: string, colIndex: number) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className={`w-8 h-8 rounded border-2 transition-all hover:scale-110 ${
                      newProject.color === color
                        ? "border-gray-600 ring-2 ring-blue-500 ring-offset-1"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  >
                    {newProject.color === color && (
                      <Check className="w-4 h-4 text-white m-auto" />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Custom Color Option */}
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Custom</span>
              <button
                type="button"
                className="w-8 h-8 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                aria-label="Add custom color"
              >
                <Plus className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("[data-color-selector]") &&
        !target.closest("[data-filter-dropdown]")
      ) {
        setIsColorSelectOpen(false);
        setOpenFilterDropdown(null);
      }
    };

    if (isColorSelectOpen || openFilterDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isColorSelectOpen, openFilterDropdown]);

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            CREATE NEW PROJECT
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              FILTER
            </span>

            {Object.entries(filters).map(([key, value]: [string, string]) => (
              <div key={key} className="relative" data-filter-dropdown>
                <button
                  type="button"
                  onClick={() => toggleFilterDropdown(key)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <span className="capitalize">{value}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openFilterDropdown === key ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFilterDropdown === key && (
                  <div className="absolute top-full left-0 mt-2 min-w-[280px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {key === "client" ? (
                      // Menu spécial pour les clients
                      <div className="py-2">
                        {/* Section 1: Input de recherche */}
                        <div className="px-4 pb-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              placeholder="Search clients..."
                              className="h-8 pl-10"
                            />
                          </div>
                        </div>

                        {/* Section 2: Bannière avec Show/Active */}
                        <div className="px-4 py-2 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Show</span>
                            <Select
                              defaultValue="active"
                              onOpenChange={setIsSelectOpen}
                            >
                              <SelectTrigger className="w-auto h-auto p-0 border-none bg-transparent shadow-none text-sm text-gray-700 hover:text-gray-900">
                                <div className="flex items-center gap-1">
                                  <SelectValue />
                                  {isSelectOpen ? (
                                    <ChevronUp className="w-3 h-3" />
                                  ) : (
                                    <ChevronDown className="w-3 h-3" />
                                  )}
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">
                                  Inactive
                                </SelectItem>
                                <SelectItem value="all">All</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Section 3: Message "No client yet" */}
                        <div className="px-4 py-6 border-t border-gray-100">
                          <div className="flex justify-center items-center">
                            <p className="text-sm text-gray-500">
                              No client yet
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : key === "access" ? (
                      // Menu spécial pour access
                      <div className="py-2">
                        {/* Section 1: Input de recherche */}
                        <div className="px-4 pb-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              placeholder="Search access..."
                              className="h-8 pl-10"
                            />
                          </div>
                        </div>

                        {/* Section 2: Bannière avec Show/Active */}
                        <div className="px-4 py-2 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Show</span>
                            <Select
                              defaultValue="active"
                              onOpenChange={setIsSelectOpen}
                            >
                              <SelectTrigger className="w-auto h-auto p-0 border-none bg-transparent shadow-none text-sm text-gray-700 hover:text-gray-900">
                                <div className="flex items-center gap-1">
                                  <SelectValue />
                                  {isSelectOpen ? (
                                    <ChevronUp className="w-3 h-3" />
                                  ) : (
                                    <ChevronDown className="w-3 h-3" />
                                  )}
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">
                                  Inactive
                                </SelectItem>
                                <SelectItem value="all">All</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Section 3: Select all checkbox */}
                        <div className="px-4 py-3 border-t border-gray-100">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="select-all"
                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <label
                              htmlFor="select-all"
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              Select all
                            </label>
                          </div>
                        </div>

                        {/* Section 4: USERS bannière */}
                        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            USERS
                          </span>
                        </div>

                        {/* Section 5: User email checkbox */}
                        <div className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="user-email"
                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <label
                              htmlFor="user-email"
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              user@example.com
                            </label>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Menu normal pour les autres filtres
                      <div className="py-2">
                        {filterOptions[key as keyof FilterOptions].map(
                          (option: FilterOption) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                handleFilterChange(key as keyof Filters, option)
                              }
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                value === option.label
                                  ? "text-blue-600 bg-blue-50 font-medium"
                                  : "text-gray-700"
                              }`}
                            >
                              {option.label}
                              {value === option.label && (
                                <Check className="w-4 h-4 float-right mt-0.5 text-blue-600" />
                              )}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Find by name"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              APPLY FILTER
            </button>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="px-4 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-medium text-gray-900">Projects</h2>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Export
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        aria-label="Select all projects"
                      />
                      NAME
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      CLIENT
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      TRACKED
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      AMOUNT
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      PROGRESS
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACCESS
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <MoreHorizontal className="w-4 h-4" />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <Plus className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="text-gray-500 font-medium">
                          {projects.length === 0
                            ? "No projects yet"
                            : "No projects found"}
                        </div>
                        <div className="text-sm text-gray-400 max-w-sm">
                          {projects.length === 0
                            ? "Create your first project to get started and begin tracking your work."
                            : "Try adjusting your search criteria to find what you're looking for."}
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project: Project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            aria-label={`Select project ${project.name}`}
                          />
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: project.color }}
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {project.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.client}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {project.tracked}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {project.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.progress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900 font-medium">
                          {project.access}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => toggleStar(project.id)}
                            className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${
                              project.starred
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                            aria-label={
                              project.starred
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                          >
                            <Star
                              className="w-4 h-4"
                              fill={project.starred ? "currentColor" : "none"}
                            />
                          </button>
                          <button
                            type="button"
                            className="p-2 rounded-md hover:bg-gray-100 text-gray-400 transition-colors"
                            aria-label="More options"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div
              className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-labelledby="modal-title"
              aria-modal="true"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3
                  id="modal-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  Create new Project
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e: React.FormEvent) => {
                  e.preventDefault();
                  handleCreateProject();
                }}
                className="p-6 space-y-6"
              >
                {/* Project Name */}
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Enter Project name"
                    value={newProject.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("name", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                    aria-label="Project name"
                  />
                </div>

                {/* Client and Template Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      value={newProject.client}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleInputChange("client", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-colors"
                      aria-label="Select client"
                    >
                      <option value="">Select client (optional)</option>
                      <option value="Client A">Client A</option>
                      <option value="Client B">Client B</option>
                      <option value="Client C">Client C</option>
                      <option value="Acme Corp">Acme Corp</option>
                      <option value="Tech Solutions">Tech Solutions</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={newProject.template}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleInputChange("template", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-colors"
                      aria-label="Select template"
                    >
                      <option value="">No template (optional)</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Design Project">Design Project</option>
                      <option value="Marketing Campaign">
                        Marketing Campaign
                      </option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                {/* Color Selection and Public Toggle */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div data-color-selector>
                    <ColorSelector />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="public"
                      checked={newProject.isPublic}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("isPublic", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor="public"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Public
                    </label>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newProject.name.trim()}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                  >
                    CREATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
