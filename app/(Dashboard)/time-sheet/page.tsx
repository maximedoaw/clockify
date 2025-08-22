'use client'

import type React from 'react'
import { useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, ChevronDown, Copy, Save, Menu, Search, Star, Edit, ChevronLeft, ChevronRight, X, CheckIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  addDays,
  format,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
} from 'date-fns'
import { TimesheetToastProvider, useTimesheetToast } from './toast-context'
import { Toaster } from './toaster'

// Static color mapping to avoid dynamic Tailwind classes
const COLORS = [
  { name: 'green', class: 'bg-green-500' },
  { name: 'blue', class: 'bg-blue-500' },
  { name: 'red', class: 'bg-red-500' },
  { name: 'purple', class: 'bg-purple-500' },
  { name: 'yellow', class: 'bg-yellow-400' },
  { name: 'orange', class: 'bg-orange-500' },
  { name: 'pink', class: 'bg-pink-400' },
  { name: 'teal', class: 'bg-teal-500' },
  { name: 'gray', class: 'bg-gray-500' },
] as const

function getBgClass(color?: string) {
  if (!color) return 'bg-gray-200'
  return COLORS.find((c) => c.name === color)?.class || 'bg-gray-200'
}

function ColorPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
            getBgClass(value) || 'bg-gray-200'
          } border-gray-300`}
          aria-label="Choose color"
        >
          {value && <CheckIcon className="w-4 h-4 text-white" />}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <div className="grid grid-cols-3 gap-2">
          {COLORS.map((color) => (
            <button
              key={color.name}
              type="button"
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${color.class} ${
                value === color.name ? 'ring-2 ring-blue-500' : 'border-gray-300'
              }`}
              onClick={() => onChange(color.name)}
              aria-label={color.name}
            >
              {value === color.name && (
                <CheckIcon className="w-4 h-4 text-white" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

const WEEK_OPTS = { weekStartsOn: 1 as const } // Monday

function formatWeekRangeLong(date: Date) {
  const start = startOfWeek(date, WEEK_OPTS)
  const end = endOfWeek(date, WEEK_OPTS)
  return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd, yyyy')}`
}

function formatWeekRangeShort(date: Date) {
  const start = startOfWeek(date, WEEK_OPTS)
  const end = endOfWeek(date, WEEK_OPTS)
  return `${format(start, 'MMM d')}–${format(end, 'd')}`
}

function getWeekKey(date: Date) {
  return format(startOfWeek(date, WEEK_OPTS), 'yyyy-MM-dd')
}

type RowType = {
  id: number
  type: 'project' | 'task'
  name?: string
  projectName?: string
  color?: string
}
type TemplateRow = Omit<RowType, 'id'>
type Template = {
  id: string
  name: string
  includeTimes: boolean
  rows: TemplateRow[]
  times?: Array<{ [day: string]: string }>
}

// A compact, scrollable day-of-week bar for mobile.
function WeekDaysBar({ currentWeek }: { currentWeek: Date }) {
  const start = startOfWeek(currentWeek, WEEK_OPTS)
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = addDays(start, i)
    const wd = format(d, 'EEE') // Mon, Tue...
    const dd = format(d, 'dd.MM')
    return { key: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'][i], label: `${wd.slice(0, 2)} ${dd}` }
  })

  return (
    <div className="lg:hidden relative -mx-3 sm:-mx-4 px-3 sm:px-4">
      <div className="overflow-x-auto">
        <div className="flex gap-2 py-2">
          <div className="shrink-0 rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-medium">
            {'Projects'}
          </div>
          {days.map((d) => (
            <div
              key={d.key}
              className="shrink-0 rounded-full bg-blue-50 text-gray-700 px-3 py-1 text-xs"
            >
              {d.label}
            </div>
          ))}
          <div className="shrink-0 rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
            {'Total'}
          </div>
        </div>
      </div>
    </div>
  )
}

function TimesheetPageInner() {
  const { show } = useTimesheetToast()

  const [currentWeek, setCurrentWeek] = useState(new Date())
  const currentWeekKey = getWeekKey(currentWeek)
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [rows, setRows] = useState<RowType[]>([{ id: 1, type: 'project' }])
  const [selectedColor, setSelectedColor] = useState('green')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedProjectForTask, setSelectedProjectForTask] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // mobile dropdown
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({}) // desktop row menus

  // Favorites for star toggle
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})
  const toggleFavorite = (projectName: string) =>
    setFavorites((prev) => ({ ...prev, [projectName]: !prev[projectName] }))

  // Templates state
  const [templates, setTemplates] = useState<Template[]>([])
  const [isSaveTemplateOpen, setIsSaveTemplateOpen] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [saveTimeAlso, setSaveTimeAlso] = useState(false)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [isApplyTemplateOpen, setIsApplyTemplateOpen] = useState(false)
  const [applyMode, setApplyMode] = useState<'replace' | 'skip' | 'add'>('replace')
  const [justApplied, setJustApplied] = useState(false)
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')

  // TIMES PER WEEK
  const [timesByWeek, setTimesByWeek] = useState<
    Record<string, { [rowId: number]: { [day: string]: string } }>
  >({})

  const rowTimes = timesByWeek[currentWeekKey] || {}

  // Debounce timers per cell
  const timersRef = useRef<Record<string, number>>({})

  // Robust time parsing
  function parseTimeInput(input: string): number {
    let s = (input || '').trim().toLowerCase()
    if (!s) return 0
    s = s.replace(',', '.').replace(/\s+/g, ' ').trim()

    // HH:MM[:SS]
    const colon = /^(\d{1,3}):(\d{1,2})(?::(\d{1,2}))?$/
    const m1 = s.match(colon)
    if (m1) {
      const h = Math.max(0, parseInt(m1[1] || '0', 10))
      const m = Math.min(59, Math.max(0, parseInt(m1[2] || '0', 10)))
      const sec = Math.min(59, Math.max(0, parseInt(m1[3] || '0', 10)))
      return h * 3600 + m * 60 + sec
    }

    // Combos with units
    let total = 0
    const unitRe = /(\d+(?:\.\d+)?)\s*(h|m|s)/g
    let anyUnit = false
    let m2: RegExpExecArray | null
    while ((m2 = unitRe.exec(s)) !== null) {
      anyUnit = true
      const val = parseFloat(m2[1])
      const unit = m2[2]
      if (unit === 'h') total += val * 3600
      if (unit === 'm') total += val * 60
      if (unit === 's') total += val
    }
    if (anyUnit) return Math.round(total)

    // Decimal number => hours
    if (/^\d+(\.\d+)?$/.test(s)) {
      const hours = parseFloat(s)
      return Math.round(hours * 3600)
    }

    return 0
  }

  function formatSeconds(sec: number): string {
    const s = Math.max(0, Math.floor(sec))
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const r = s % 60
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${r.toString().padStart(2, '0')}`
  }

  const handleTimeInputChange = (rowId: number, day: string, value: string) => {
    setTimesByWeek((prev) => ({
      ...prev,
      [currentWeekKey]: {
        ...(prev[currentWeekKey] || {}),
        [rowId]: {
          ...(prev[currentWeekKey]?.[rowId] || {}),
          [day]: value,
        },
      },
    }))

    scheduleNormalize(rowId, day, 600)
  }

  function scheduleNormalize(rowId: number, day: string, delay = 600) {
    const key = `${rowId}:${day}`
    if (timersRef.current[key]) {
      window.clearTimeout(timersRef.current[key])
    }
    const id = window.setTimeout(() => {
      normalizeTime(rowId, day)
      delete timersRef.current[key]
    }, delay)
    timersRef.current[key] = id
  }

  const normalizeTime = (rowId: number, day: string) => {
    const value = rowTimes[rowId]?.[day] || ''
    const seconds = parseTimeInput(value)
    setTimesByWeek((prev) => ({
      ...prev,
      [currentWeekKey]: {
        ...(prev[currentWeekKey] || {}),
        [rowId]: {
          ...(prev[currentWeekKey]?.[rowId] || {}),
          [day]: seconds ? formatSeconds(seconds) : '',
        },
      },
    }))
  }

  const handleTimeInputKeyDown = (
    rowId: number,
    day: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      normalizeTime(rowId, day)
    }
  }

  function getRowTotal(rowId: number): string {
    const times = rowTimes[rowId] || {}
    const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    let totalSec = 0
    dayKeys.forEach((d) => {
      totalSec += parseTimeInput(times[d] || '')
    })
    return formatSeconds(totalSec)
  }

  // Week/day columns (Monday start)
  const weekDays = useMemo(() => {
    const start = startOfWeek(currentWeek, WEEK_OPTS)
    return [
      { label: 'Project', value: 'project' },
      { label: `Mo ${format(addDays(start, 0), 'dd.MM')}`, value: 'mon' },
      { label: `Tu ${format(addDays(start, 1), 'dd.MM')}`, value: 'tue' },
      { label: `We ${format(addDays(start, 2), 'dd.MM')}`, value: 'wed' },
      { label: `Th ${format(addDays(start, 3), 'dd.MM')}`, value: 'thu' },
      { label: `Fr ${format(addDays(start, 4), 'dd.MM')}`, value: 'fri' },
      { label: `Sa ${format(addDays(start, 5), 'dd.MM')}`, value: 'sat' },
      { label: `Su ${format(addDays(start, 6), 'dd.MM')}`, value: 'sun' },
      { label: 'Total', value: 'total' },
    ]
  }, [currentWeekKey])

  const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
  const dayLabelMap = Object.fromEntries(
    weekDays.slice(1, 8).map((d) => [d.value, d.label] as [string, string])
  )

  // Example projects
  const projects = [
    { name: 'clockify', color: 'purple' },
    { name: 'Max steel', color: 'blue' },
  ]

  const handlePreviousWeek = () => setCurrentWeek(subWeeks(currentWeek, 1))
  const handleNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1))

  const handleAddRow = () => {
    const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1
    setRows([...rows, { id: nextId, type: 'project' }])
    show({ title: 'New row added', variant: 'success' })
  }

  const handleRemoveRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id))
    // remove times for this row across all weeks
    setTimesByWeek((prev) => {
      const copy: typeof prev = { ...prev }
      Object.keys(copy).forEach((wk) => {
        if (copy[wk]?.[id]) {
          const { [id]: _omit, ...rest } = copy[wk]
          copy[wk] = rest
        }
      })
      return copy
    })
    show({ title: 'Row removed', variant: 'warning' })
  }

  const handleWeekSelect = (date: Date | undefined) => {
    if (date) {
      setCurrentWeek(date)
      setIsCalendarOpen(false)
    }
  }

  // Desktop row menu open/close
  const setMenuOpen = (rowId: number, open: boolean) => {
    setOpenMenus((prev) => ({ ...prev, [rowId]: open }))
  }

  const hasTrailingEmptyRow = (arr: RowType[] = rows) => {
    if (!arr.length) return false
    const last = arr[arr.length - 1]
    return last.type === 'project' && !last.name
  }

  const insertAboveTrailingEmpty = (newRow: RowType) => {
    if (hasTrailingEmptyRow()) {
      const tail = rows[rows.length - 1]
      setRows([...rows.slice(0, -1), newRow, tail])
    } else {
      const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1
      setRows([...rows, newRow, { id: nextId + 1, type: 'project' }])
    }
  }

  // Desktop: select project directly in current row
  const handleSelectProjectForRow = (
    rowId: number,
    project: { name: string; color: string }
  ) => {
    let updated = rows.map((r) =>
      r.id === rowId
        ? { ...r, type: 'project', name: project.name, color: project.color }
        : r
    )
    if (!hasTrailingEmptyRow(updated as any)) {
      const nextId = Math.max(...updated.map((r) => r.id)) + 1
      updated = [...updated, { id: nextId, type: 'project' }]
    }
    setRows(updated as any)
    setMenuOpen(rowId, false)
    show({ title: `Selected: ${project.name}`, variant: 'success' })
  }

  // Mobile: select project and close menu
  const handleSelectProjectMobile = (project: { name: string; color: string }) => {
    const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1
    const newRow: RowType = {
      id: nextId,
      type: 'project',
      name: project.name,
      color: project.color,
    }
    insertAboveTrailingEmpty(newRow)
    setIsDropdownOpen(false)
    show({ title: `Selected: ${project.name}`, variant: 'success' })
  }

  // Tasks
  const [taskName, setTaskName] = useState('')
  const handleCreateTask = (projectName: string, fromRowId?: number) => {
    setSelectedProjectForTask(projectName)
    setIsCreateTaskOpen(true)
    if (typeof fromRowId === 'number') setMenuOpen(fromRowId, false)
    setIsDropdownOpen(false)
  }

  const handleTaskSubmit = () => {
    if (taskName && selectedProjectForTask) {
      const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1
      const color = projects.find((p) => p.name === selectedProjectForTask)?.color
      const newTaskRow: RowType = {
        id: nextId,
        type: 'task',
        name: taskName,
        projectName: selectedProjectForTask,
        color,
      }
      insertAboveTrailingEmpty(newTaskRow)
      setTaskName('')
      setIsCreateTaskOpen(false)
      show({ title: 'Task created', description: selectedProjectForTask || undefined, variant: 'success' })
    }
  }

  // Totals (current week)
  const totals = useMemo(() => {
    const acc: Record<string, number> = {
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0,
      total: 0,
    }
    rows.forEach((row) => {
      const times = rowTimes[row.id] || {}
      dayKeys.forEach((d) => {
        acc[d] += parseTimeInput(times[d] || '')
      })
    })
    acc.total = dayKeys.reduce((sum, d) => sum + acc[d], 0)
    const out: Record<string, string> = {}
    Object.keys(acc).forEach((k) => {
      out[k] = formatSeconds(acc[k])
    })
    return out
  }, [rows, rowTimes])

  // Build template from current week
  const buildTemplateFromState = (): Template => {
    const definedRows = rows.filter((r) => r.name)
    const tmplRows: TemplateRow[] = definedRows.map(({ id, ...rest }) => rest)
    const tmplTimes = definedRows.map((r) => ({ ...(rowTimes[r.id] || {}) }))
    return {
      id: `${Date.now()}`,
      name: templateName || `Template ${templates.length + 1}`,
      includeTimes: saveTimeAlso,
      rows: tmplRows,
      times: saveTimeAlso ? tmplTimes : undefined,
    }
  }

  const handleTemplateSave = () => {
    const t = buildTemplateFromState()
    setTemplates((prev) => [...prev, t])
    setSelectedTemplateId(t.id)
    setIsSaveTemplateOpen(false)
    setTemplateName('')
    setSaveTimeAlso(false)
    show({ title: 'Template saved', variant: 'success' })
  }

  const updateTemplate = () => {
    if (!editingTemplateId || !editingName.trim()) return
    setTemplates((prev) =>
      prev.map((template) =>
        template.id === editingTemplateId
          ? { ...template, name: editingName.trim() }
          : template
      )
    )
    setEditingTemplateId(null)
    setEditingName('')
    show({ title: 'Template mis à jour', variant: 'success' })
  }

  const deleteTemplate = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce template ?')) {
      setTemplates((prev) => prev.filter((t) => t.id !== id))
      if (selectedTemplateId === id) setSelectedTemplateId(null)
      show({ title: 'Template supprimé', variant: 'warning' })
    }
  }

  const applyFromList = (id: string) => {
    setSelectedTemplateId(id)
    setIsApplyTemplateOpen(true)
  }

  const startEditTemplate = (id: string) => {
    const t = templates.find((x) => x.id === id)
    if (t) {
      setEditingTemplateId(id)
      setEditingName(t.name)
    }
  }

  // Apply template to current week
  const applyTemplate = (template: Template) => {
    let updatedRows = [...rows]
    const currentTimes: { [rowId: number]: { [day: string]: string } } = {
      ...rowTimes,
    }

    const ensureRow = (tRow: TemplateRow): number => {
      const idx = updatedRows.findIndex(
        (r) =>
          r.type === tRow.type &&
          (r.name || '') === (tRow.name || '') &&
          (r.projectName || '') === (tRow.projectName || '')
      )
      if (idx !== -1) return updatedRows[idx].id

      const nextId = updatedRows.length
        ? Math.max(...updatedRows.map((r) => r.id)) + 1
        : 1
      const newRow: RowType = {
        id: nextId,
        type: tRow.type,
        name: tRow.name,
        projectName: tRow.projectName,
        color: tRow.color,
      }

      if (hasTrailingEmptyRow(updatedRows)) {
        const tail = updatedRows[updatedRows.length - 1]
        updatedRows = [...updatedRows.slice(0, -1), newRow, tail]
      } else {
        updatedRows = [...updatedRows, newRow]
      }
      return newRow.id
    }

    const dks: Array<string> = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    template.rows.forEach((tRow, i) => {
      const rowId = ensureRow(tRow)
      if (!template.includeTimes || !template.times) return
      const tmplTimes = template.times[i] || {}
      const existing = currentTimes[rowId] || {}
      const next: { [day: string]: string } = { ...existing }

      dks.forEach((d) => {
        const tmplVal = tmplTimes[d] || ''
        if (!tmplVal) return
        const cur = existing[d] || ''

        if (applyMode === 'replace') next[d] = tmplVal
        if (applyMode === 'skip') next[d] = cur ? cur : tmplVal
        if (applyMode === 'add') {
          const sum = parseTimeInput(cur) + parseTimeInput(tmplVal)
          next[d] = sum ? formatSeconds(sum) : cur
        }
      })

      currentTimes[rowId] = next
    })

    if (!hasTrailingEmptyRow(updatedRows)) {
      const nextId = updatedRows.length
        ? Math.max(...updatedRows.map((r) => r.id)) + 1
        : 1
      updatedRows = [...updatedRows, { id: nextId, type: 'project' }]
    }

    setRows(updatedRows)
    setTimesByWeek((prev) => ({
      ...prev,
      [currentWeekKey]: currentTimes,
    }))
    setIsApplyTemplateOpen(false)
    setJustApplied(true)
    window.setTimeout(() => setJustApplied(false), 2000)
    show({ title: 'Template applied', variant: 'success' })
  }

  // Copy last week -> current week
  const handleCopyLastWeek = () => {
    const prevWeek = subWeeks(currentWeek, 1)
    const prevKey = getWeekKey(prevWeek)
    const from = timesByWeek[prevKey]
    if (!from) {
      show({
        title: 'Aucune donnée',
        description: 'Aucune donnée la semaine précédente.',
        variant: 'warning',
      })
      return
    }
    const cloned: { [rowId: number]: { [day: string]: string } } = {}
    Object.keys(from).forEach((rowIdStr) => {
      const rowId = Number(rowIdStr)
      cloned[rowId] = { ...from[rowId] }
    })
    setTimesByWeek((prev) => ({
      ...prev,
      [currentWeekKey]: cloned,
    }))
    show({
      title: 'Copié',
      description: 'Horaires copiés depuis la semaine précédente.',
      variant: 'success',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-15">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-3 py-3 sm:px-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-gray-800 sm:text-xl md:text-2xl">
            {'Timesheet'}
          </h1>

          {/* Controls group */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
            {/* Teammates */}
            <div className="hidden sm:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    {'Teammates'}
                    <ChevronDown className="ml-1 h-4 w-4 sm:ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="focus:bg-transparent">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search teammates..." className="w-full pl-10" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <span className="text-sm text-muted-foreground">{'Show'}</span>
                    <Select>
                      <SelectTrigger className="h-8 w-[120px]">
                        <SelectValue placeholder="Active" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                            {'Active'}
                          </div>
                        </SelectItem>
                        <SelectItem value="inactive">
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-gray-500" />
                            {'Inactive'}
                          </div>
                        </SelectItem>
                        <SelectItem value="email">
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                            {'maximedoaw204'}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem disabled>
                    {'Activity Bar'}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>{'Panel'}</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Week navigation + date range */}
            <div className="flex items-center gap-1 sm:gap-2 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePreviousWeek}
                className="h-9 w-9 text-gray-500 hover:text-gray-700"
                aria-label="Previous week"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-[150px] sm:w-48 justify-center text-left font-normal"
                  >
                    <span className="sm:hidden">{formatWeekRangeShort(currentWeek)}</span>
                    <span className="hidden sm:inline">{formatWeekRangeLong(currentWeek)}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={currentWeek}
                    onSelect={handleWeekSelect}
                    initialFocus
                    showOutsideDays={false}
                    className="border-0"
                  />
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextWeek}
                className="h-9 w-9 text-gray-500 hover:text-gray-700"
                aria-label="Next week"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile menu icon placeholder */}
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile week days bar */}
        <WeekDaysBar currentWeek={currentWeek} />
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl p-3 sm:p-4">
        {/* Desktop week header */}
        <div className="mb-3 hidden overflow-x-auto rounded-lg bg-blue-100 lg:block">
          <div className="grid w-full min-w-[720px] grid-cols-10">
            <div className="col-span-1 flex w-full items-center justify-center px-3 py-3 text-center text-sm font-medium text-blue-600">
              {'Projects'}
            </div>
            {weekDays.slice(1).map((day, index) => (
              <div
                key={day.value}
                className={`col-span-1 flex w-full items-center justify-center px-3 py-3 text-base ${
                  index === weekDays.length - 2 ? 'bg-blue-200 font-semibold' : 'text-gray-700'
                }`}
              >
                <div className="w-full truncate">{day.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 lg:hidden">
          {rows
            .filter((row) => row.name || row.type === 'task')
            .map((row) => (
              <MobileRowCard
                key={row.id}
                row={row}
                rowTimes={rowTimes}
                dayKeys={dayKeys}
                dayLabelMap={dayLabelMap}
                handleRemoveRow={handleRemoveRow}
                handleTimeInputChange={handleTimeInputChange}
                handleTimeInputKeyDown={handleTimeInputKeyDown}
                normalizeTime={normalizeTime}
                getRowTotal={getRowTotal}
              />
            ))}

          {/* Project selector (mobile) */}
          <div className="relative">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-3 py-3">
                  <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-blue-500 bg-white">
                    <Plus className="h-4 w-4 text-blue-500" />
                  </span>
                  <span className="w-full break-words font-medium text-blue-600">
                    {'Select Project'}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-50 w-80 p-0" align="start" sideOffset={5}>
                <div className="border-b p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search Project or Client" className="bg-gray-50 pl-10" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="mt-3 space-y-3">
                    {projects.map((project) => (
                      <div
                        key={project.name}
                        className="flex items-center justify-between rounded p-2 hover:bg-gray-50"
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectProjectMobile(project)}
                          className="flex items-center gap-3 text-left focus:outline-none"
                        >
                          <div className={`h-3 w-3 rounded-full ${getBgClass(project.color)}`} />
                          <span className="text-gray-700">{project.name}</span>
                        </button>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-500 hover:text-blue-600 hover:underline"
                            onClick={() => handleCreateTask(project.name)}
                          >
                            <span className="mr-1">{'Create Task'}</span>
                            <Star
                              className={
                                favorites[project.name]
                                  ? 'h-4 w-4 text-yellow-400 fill-yellow-400'
                                  : 'h-4 w-4 text-gray-400'
                              }
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(project.name)
                              }}
                              aria-pressed={!!favorites[project.name]}
                              aria-label="Toggle favorite"
                            />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile totals */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 overflow-x-auto">             
            <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 md:grid-cols-4 min-w-max">               
              {dayKeys.map((d) => (                 
                <div key={d} className="flex items-center justify-between whitespace-nowrap">                   
                  <span className="text-xs text-gray-600">{dayLabelMap[d]}</span>                   
                  <span className="text-sm font-medium text-gray-800">                     
                    {totals[d] || '00:00:00'}                   
                  </span>                 
                </div>               
              ))}               
              <div className="col-span-2 mt-1 flex items-center justify-between border-t border-blue-200 pt-2 sm:col-span-3 md:col-span-4 whitespace-nowrap">                 
                <span className="text-sm font-semibold text-gray-800">{'Total'}</span>                 
                <span className="text-base font-bold text-gray-900">{totals.total}</span>               
              </div>             
            </div>           
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden overflow-x-auto rounded-lg border border-gray-200 bg-white lg:block">
        {rows.map((row) => (
  <div className="relative grid w-full min-w-0 grid-cols-10 hover:bg-gray-50/50 transition-colors" key={row.id}>
    <div className="col-span-1 flex w-full items-center border-r border-gray-200 px-4 py-3">
      {row.type === 'project' && !row.name ? (
        <DropdownMenu
          open={!!openMenus[row.id]}
          onOpenChange={(v) => setMenuOpen(row.id, v)}
        >
          <DropdownMenuTrigger asChild>
            <div className="flex w-full items-center gap-3 cursor-pointer">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-blue-500 bg-white flex-shrink-0">
                <Plus className="h-3 w-3 text-blue-500" />
              </span>
              <span className="text-sm font-medium text-blue-600 hover:underline whitespace-nowrap max-w-[100px] truncate" title='Select project'>
                Select Project
              </span>

            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 w-96 p-0" align="start" sideOffset={8}>
            <div className="border-b p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search Project or Client"
                  className="bg-gray-50 pl-10 h-10 text-sm"
                />
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="projects"
                  className="flex-1"
                >
                  <AccordionItem value="projects" className="border-0">
                    <div className="flex items-center justify-between mb-3">
                      <AccordionTrigger className="flex items-center gap-2 p-0 text-sm font-medium text-gray-600 hover:underline">
                        <span className="whitespace-nowrap">2 Projects</span>
                      </AccordionTrigger>
                      <button
                        type="button"
                        className="ml-2 rounded p-1.5 hover:bg-gray-100 transition-colors"
                        aria-label="Edit"
                      >
                        <Edit className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                    <AccordionContent className="p-0">
                      <div className="space-y-2">
                        {projects.map((project) => (
                          <div
                            key={project.name}
                            className="flex items-center justify-between rounded-md p-2.5 hover:bg-gray-50 transition-colors group"
                          >
                            <button
                              type="button"
                              onClick={() => handleSelectProjectForRow(row.id, project)}
                              className="flex items-center gap-3 text-left focus:outline-none flex-1 min-w-0"
                            >
                              <div
                                className={`h-3 w-3 rounded-full flex-shrink-0 ${getBgClass(project.color)}`}
                              />
                              <span className="text-sm text-gray-700 font-medium truncate">
                                {project.name}
                              </span>
                            </button>
                            <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                              <span className="text-xs text-gray-400 whitespace-nowrap">Create Task</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(project.name)
                                }}
                                className="p-0.5 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Star
                                  className={
                                    favorites[project.name]
                                      ? 'h-4 w-4 text-yellow-400 fill-yellow-400'
                                      : 'h-4 w-4 text-gray-300 hover:text-gray-400'
                                  }
                                />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="border-t pt-4">
                <Dialog
                  open={isCreateProjectOpen}
                  onOpenChange={setIsCreateProjectOpen}
                >
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader className="pb-4">
                      <DialogTitle className="font-normal text-gray-600 text-lg">
                        Create new Project
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Enter Project name"
                          className="border-gray-200 bg-gray-50 h-10"
                        />
                        <Select>
                          <SelectTrigger className="border-gray-200 bg-gray-50 h-10">
                            <SelectValue placeholder="Select client" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="client1">Client 1</SelectItem>
                            <SelectItem value="client2">Client 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <ColorPicker value={selectedColor} onChange={setSelectedColor} />
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="public"
                              defaultChecked
                              className="data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                            />
                            <Label htmlFor="public" className="font-medium text-blue-500 text-sm whitespace-nowrap">
                              Public
                            </Label>
                          </div>
                        </div>
                        <Select>
                          <SelectTrigger className="border-gray-200 bg-gray-50 h-10">
                            <SelectValue placeholder="No template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="template1">Template 1</SelectItem>
                            <SelectItem value="template2">Template 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateProjectOpen(false)}
                        className="px-4"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() =>
                          show({ title: 'Project created', variant: 'success' })
                        }
                        className="px-4"
                      >
                        CREATE
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex w-full items-center gap-3">
          <div className={`h-3 w-3 rounded-full flex-shrink-0 ${getBgClass(row.color)}`} />
          <span className="text-sm font-medium text-gray-700 truncate">
            {row.type === 'task'
              ? `${row.projectName}: ${row.name}`
              : row.name}
          </span>
        </div>
      )}
    </div>

    {weekDays.slice(1).map((day) => (
      <div
        key={day.value}
        className={`col-span-1 flex w-full items-center justify-center border-r border-gray-200 px-2 py-3 last:border-r-0 ${
          day.value === 'total' ? 'bg-gray-50 font-semibold' : ''
        }`}
      >
        {day.value !== 'total' ? (
          <input
            type="text"
            value={rowTimes[row.id]?.[day.value] || ''}
            onChange={(e) =>
              handleTimeInputChange(row.id, day.value, e.target.value)
            }
            onKeyDown={(e) => handleTimeInputKeyDown(row.id, day.value, e)}
            onBlur={() => normalizeTime(row.id, day.value)}
            className={`w-full rounded border border-gray-200 bg-white py-1.5 px-2 text-center text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors ${
              row.type === 'project' && !row.name
                ? 'cursor-not-allowed opacity-60'
                : 'hover:border-gray-300'
            }`}
            placeholder="0:00"
            title="Entrer les heures"
            readOnly={row.type === 'project' && !row.name}
          />
        ) : (
          <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
            {getRowTotal(row.id)}
          </span>
        )}
      </div>
    ))}

    {/* Croix de suppression parfaitement centrée */}
    <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center">
      <button
        onClick={() => handleRemoveRow(row.id)}
        className="flex items-center justify-center w-6 h-6 rounded text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
        aria-label="Remove row"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  </div>
))}
          <div className="grid w-full min-w-0 grid-cols-10">{' '}</div>
        </div>

        {/* Desktop totals */}
        <div className="mt-4 hidden overflow-x-auto rounded-lg border border-blue-200 bg-blue-50 lg:block">
          <div className="grid w-full min-w-[720px] grid-cols-10">
            <div className="col-span-1 flex w-full items-center border-r border-blue-200 px-3 py-3">
              <span className="w-full truncate text-sm font-semibold text-gray-800">
                {'Total'}
              </span>
            </div>
            {weekDays.slice(1).map((day) => (
              <div
                key={day.value}
                className={`col-span-1 flex w-full items-center justify-center border-r border-blue-200 px-3 py-3 last:border-r-0 text-sm ${
                  day.value === 'total' ? 'bg-blue-100 font-bold' : ''
                }`}
              >
                <span className="w-full truncate font-medium text-gray-700">
                  {day.value === 'total' ? totals.total : totals[day.value] || '00:00:00'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
          <Button variant="outline" className="bg-transparent" size="sm" onClick={handleAddRow}>
            <Plus className="mr-2 h-4 w-4" />
            {'Add new row'}
          </Button>
          <Button
            variant="outline"
            className="bg-transparent"
            size="sm"
            onClick={handleCopyLastWeek}
          >
            <Copy className="mr-2 h-4 w-4" />
            {'Copy last week'}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="bg-transparent"
            size="sm"
            onClick={() => setIsSaveTemplateOpen(true)}
          >
            <Save className="mr-2 h-4 w-4" />
            {'Save as template'}
          </Button>
        </div>

        {/* Templates Panel */}
        <section className="mt-4 rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">{'Templates'}</span>
              {justApplied && (
                <span className="inline-flex items-center text-sm text-green-600">
                  <CheckIcon className="mr-1 h-4 w-4" /> {'Applied'}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={selectedTemplateId || undefined}
                onValueChange={(v) => setSelectedTemplateId(v)}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsApplyTemplateOpen(true)}
                disabled={!selectedTemplateId}
              >
                {'Apply'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsSaveTemplateOpen(true)}>
                <Save className="mr-2 h-4 w-4" />
                {'Save as template'}
              </Button>
            </div>
          </div>

          <div className="mt-3">
            {templates.length === 0 ? (
              <div className="text-sm text-gray-500">
                {'No templates yet. Save the current setup as a template.'}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {templates.map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-2">
                    <div className="min-w-0 flex-1">
                      {editingTemplateId === t.id ? (
                        <div className="flex w-full items-center gap-2">
                          <Input
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="flex-1"
                            onKeyDown={(e) => e.key === 'Enter' && updateTemplate()}
                          />
                          <Button
                            size="sm"
                            onClick={updateTemplate}
                            disabled={!editingName.trim()}
                          >
                            <CheckIcon className="mr-1 h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingTemplateId(null)
                              setEditingName('')
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-gray-700">{t.name}</span>
                      )}
                    </div>
                    {editingTemplateId !== t.id && (
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => applyFromList(t.id)}>
                          {'Apply'}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => startEditTemplate(t.id)}
                          aria-label="Edit template"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteTemplate(t.id)}
                          aria-label="Delete template"
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Create Template Dialog */}
      <Dialog open={isSaveTemplateOpen} onOpenChange={setIsSaveTemplateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{'Create template'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Template name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="saveTimeAlso"
                checked={saveTimeAlso}
                onCheckedChange={(v) => setSaveTimeAlso(!!v)}
              />
              <Label htmlFor="saveTimeAlso">{'Save time also'}</Label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsSaveTemplateOpen(false)}>
              {'Cancel'}
            </Button>
            <Button onClick={handleTemplateSave} disabled={!templateName.trim()}>
              {'SAVE'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Apply Template Dialog */}
      <Dialog open={isApplyTemplateOpen} onOpenChange={setIsApplyTemplateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{'Applying template'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {'What to do with cells that already have time?'}
            </p>
            <RadioGroup
              value={applyMode}
              onValueChange={(v) => setApplyMode(v as any)}
              className="space-y-3"
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="replace" id="replace" />
                <Label htmlFor="replace" className="cursor-pointer">
                  <div className="font-medium">{'Replace'}</div>
                  <div className="text-sm text-gray-600">
                    {'Template will overwrite cells where time exists.'}
                  </div>
                </Label>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="skip" id="skip" />
                <Label htmlFor="skip" className="cursor-pointer">
                  <div className="font-medium">{'Skip'}</div>
                  <div className="text-sm text-gray-600">
                    {'Template will ignore cells where time exists.'}
                  </div>
                </Label>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="add" id="add" />
                <Label htmlFor="add" className="cursor-pointer">
                  <div className="font-medium">{'Add'}</div>
                  <div className="text-sm text-gray-600">
                    {'Time from template will be added on top of the existing time.'}
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsApplyTemplateOpen(false)}>
              {'Cancel'}
            </Button>
            <Button
              onClick={() => {
                const tmpl = templates.find((t) => t.id === selectedTemplateId || '')
                if (tmpl) applyTemplate(tmpl)
              }}
              disabled={!selectedTemplateId}
            >
              {'APPLY'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Extracted client-only MobileRowCard with explicit props
function MobileRowCard({
  row,
  rowTimes,
  dayKeys,
  dayLabelMap,
  handleRemoveRow,
  handleTimeInputChange,
  handleTimeInputKeyDown,
  normalizeTime,
  getRowTotal,
}: {
  row: RowType
  rowTimes: Record<number, { [day: string]: string }>
  dayKeys: ReadonlyArray<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>
  dayLabelMap: Record<string, string>
  handleRemoveRow: (id: number) => void
  handleTimeInputChange: (rowId: number, day: string, value: string) => void
  handleTimeInputKeyDown: (rowId: number, day: string, e: React.KeyboardEvent<HTMLInputElement>) => void
  normalizeTime: (rowId: number, day: string) => void
  getRowTotal: (rowId: number) => string
}) {
  if (!row.name && row.type === 'project') return null
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className={`h-4 w-4 rounded-full ${getBgClass(row.color)}`} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-800">
              {row.type === 'task'
                ? `${row.projectName}: ${row.name}`
                : row.name}
            </p>
            <p className="text-xs text-gray-500">Total: {getRowTotal(row.id)}</p>
          </div>
        </div>
        <button
          onClick={() => handleRemoveRow(row.id)}
          className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Remove row"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {dayKeys.map((dKey) => (
          <div key={dKey} className="flex flex-col">
            <label className="text-xs font-medium text-gray-600">
              {dayLabelMap[dKey]}
            </label>
            <input
              type="text"
              value={rowTimes[row.id]?.[dKey] || ''}
              onChange={(e) => handleTimeInputChange(row.id, dKey, e.target.value)}
              onKeyDown={(e) => handleTimeInputKeyDown(row.id, dKey, e)}
              onBlur={() => normalizeTime(row.id, dKey)}
              className="mt-1 w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-sm text-gray-700 placeholder:text-gray-400"
              placeholder="hh:mm[:ss], 1.5h, 90m"
              title="Saisir les heures"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TimesheetPage() {
  return (
    <TimesheetToastProvider>
      <TimesheetPageInner />
      <Toaster position="bottom-right" />
    </TimesheetToastProvider>
  )
}

