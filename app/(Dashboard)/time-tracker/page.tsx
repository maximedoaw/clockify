"use client"

import React, { useState, useRef, useEffect } from 'react';
import ToastCustom from '../../../components/toast-custom';
import { Play, Square, Tag, DollarSign, Calendar, ChevronLeft, ChevronRight, MoreHorizontal, Plus, Trash2, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import ProjectList from './components/project-list';
import ProjectCreateModal from './components/project-createModal';

const TimeTrackerDetailed = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState('00:00:00');
  const [task, setTask] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number>(0);

  // Toast custom via composant séparé
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'default' | null }>({ message: '', type: null });
  const [showToast, setShowToast] = useState(false);
  const showCustomToast = (message: string, type: 'success' | 'info' | 'default') => {
    setToast({ message, type });
    setShowToast(true);
  };
  const handleToastClose = () => setShowToast(false);

  // Gestion des projets
  const [projects, setProjects] = useState<{name: string, client?: string, start?: string, end?: string}[]>([
    { name: "Projet Alpha", client: "Client A", start: "09:00", end: "17:00" },
    { name: "Projet Beta", start: "08:00", end: "16:00" }
  ]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectClient, setNewProjectClient] = useState("");
  const [deleteIndex, setDeleteIndex] = useState<number|null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProjectStart, setNewProjectStart] = useState("09:00");
  const [newProjectEnd, setNewProjectEnd] = useState("17:00");
  const [duplicateFrom, setDuplicateFrom] = useState<null | number>(null);

  const handleOpenAdd = () => {
    setNewProjectName("");
    setNewProjectClient("");
    setOpenAddModal(true);
  };
  const handleAddProject = () => {
    if (newProjectName.trim()) {
      setProjects([
        ...projects,
        {
          name: newProjectName.trim(),
          client: newProjectClient.trim() || undefined,
          start: newProjectStart,
          end: newProjectEnd,
        },
      ]);
      setOpenAddModal(false);
      showCustomToast('Projet ajouté avec succès.', 'success');
    }
  };
  const handleDeleteProject = (idx: number) => {
    setDeleteIndex(idx);
    setOpenDialog(true);
  };
  const confirmDelete = () => {
    if (deleteIndex !== null) {
      setProjects(projects.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
      setOpenDialog(false);
      showCustomToast('Projet supprimé avec succès.', 'success');
    }
  };
  const cancelDelete = () => {
    setDeleteIndex(null);
    setOpenDialog(false);
  };
  const handleProjectTimeChange = (idx: number, field: 'start' | 'end', value: string) => {
    setProjects(projects => projects.map((p, i) => {
      if (i !== idx) return p;
      const other = field === 'start' ? p.end : p.start;
      if (other) {
        const [sh, sm] = (field === 'start' ? value : other).split(":").map(Number);
        const [eh, em] = (field === 'end' ? value : other).split(":").map(Number);
        const start = sh * 60 + sm;
        const end = eh * 60 + em;
        if (end <= start) {
          showCustomToast('La fin doit être après le début.', 'info');
          return p;
        }
      }
      return { ...p, [field]: value };
    }));
  };
  const handleNewProjectTime = (field: 'start' | 'end', value: string) => {
    const other = field === 'start' ? newProjectEnd : newProjectStart;
    const [sh, sm] = (field === 'start' ? value : other).split(":").map(Number);
    const [eh, em] = (field === 'end' ? value : other).split(":").map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
    if (end <= start) {
      showCustomToast('La fin doit être après le début.', 'info');
      return;
    }
    if (field === 'start') setNewProjectStart(value);
    else setNewProjectEnd(value);
  };

  // Fonction pour formater le temps en hh:mm:ss
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    setTime(formatTime(seconds));
  }, [seconds]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const proj = projects[selectedProjectIdx];
          const max = getWorkDuration(proj);
          if (max > 0 && prev + 1 >= max) {
            setIsRunning(false);
            showCustomToast('Temps de travail terminé pour ce projet.', 'info');
            return max;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, projects, selectedProjectIdx]);

  const toggleTimer = () => {
    setIsRunning((prev) => {
      const newRunning = !prev;
      if (newRunning) {
        showCustomToast('Le timer est lancé !', 'success');
      } else {
        showCustomToast('Le timer est en pause.', 'info');
      }
      return newRunning;
    });
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    showCustomToast('Le timer a été réinitialisé.', 'default');
  };

  // Calcul du temps de travail en secondes pour le projet sélectionné
  const getWorkDuration = (proj: {start?: string, end?: string}) => {
    if (!proj.start || !proj.end) return 0;
    const [sh, sm] = proj.start.split(":").map(Number);
    const [eh, em] = proj.end.split(":").map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
    return end > start ? (end - start) * 60 : 0;
  };

  // Génération des horaires (toutes les 30min de 06:00 à 22:00)
  const hours = Array.from({length: 33}, (_, i) => {
    const h = Math.floor((6*60 + i*30)/60).toString().padStart(2, '0');
    const m = ((i*30)%60).toString().padStart(2, '0');
    return `${h}:${m}`;
  });

  const handleDuplicateProject = (idx: number) => {
    // Ouvre le modal de création pré-rempli avec le projet à dupliquer
    const p = projects[idx];
    setNewProjectName(p.name + ' (copie)');
    setNewProjectClient(p.client || '');
    setNewProjectStart(p.start || '09:00');
    setNewProjectEnd(p.end || '17:00');
    setDuplicateFrom(idx);
    setOpenAddModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4">
      {/* Timer Section - Responsive flex wrap for mobile */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          {/* Task Input - full width on mobile, shrink on desktop */}
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder="What are you working on?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            />
          </div>

          {/* Project Selector - stack on mobile, inline on desktop */}
          <div className="flex items-center gap-2">
            <Select value={selectedProjectIdx.toString()} onValueChange={v => setSelectedProjectIdx(Number(v))}>
              <SelectTrigger className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-40">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <SelectValue placeholder="Projet" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((proj, idx) => (
                  <SelectItem key={proj.name + idx} value={idx.toString()}>{proj.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags & Billable - icons, wrap on small screens */}
          <div className="flex gap-2">
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Tag className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <DollarSign className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Timer Display and Button - always at la fin, wrap on mobile */}
          <div className="flex items-center gap-3 min-w-[150px] justify-end">
            <div className="text-2xl font-mono font-semibold text-gray-900">
              {time}
            </div>
            <Button
              onClick={toggleTimer}
              className={`px-6 py-3 text-sm font-semibold ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            >
              {isRunning ? 'STOP' : 'START'}
            </Button>
            {isRunning ? (
              <Button
                onClick={resetTimer}
                className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 text-sm font-semibold"
                type="button"
              >
                Réinitialiser
              </Button>
            ) : null}
          </div>
        </div>
        {/* Dialog de confirmation suppression */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
            </DialogHeader>
            <div>Êtes-vous sûr de vouloir supprimer ce projet&nbsp;?</div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={cancelDelete}>Annuler</Button>
              </DialogClose>
              <Button variant="destructive" onClick={confirmDelete}>Supprimer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* This Week Section - responsive padding and font sizes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">This week</h2>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-sm text-gray-500">Week total:</span>
              <span className="text-base sm:text-lg font-mono font-semibold text-gray-900">00:00:03</span>
            </div>
          </div>
        </div>

        {/* Projets - même design que time entry */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600">Projets</h3>
          <Button onClick={handleOpenAdd} className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
            <Plus className="w-4 h-4" /> Créer un projet
          </Button>
        </div>
        <ProjectList
          projects={projects}
          onDelete={handleDeleteProject}
          onDuplicate={handleDuplicateProject}
          onTimeChange={handleProjectTimeChange}
          hours={hours}
          selectedProjectIdx={selectedProjectIdx}
          onSelectProject={setSelectedProjectIdx}
        />
        {/* Dialog de confirmation suppression */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
            </DialogHeader>
            <div>Êtes-vous sûr de vouloir supprimer ce projet&nbsp;?</div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={cancelDelete}>Annuler</Button>
              </DialogClose>
              <Button variant="destructive" onClick={confirmDelete}>Supprimer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Modal d'ajout de projet */}
        <ProjectCreateModal
          open={openAddModal}
          onOpenChange={setOpenAddModal}
          onCreate={(name, client, start, end) => {
            handleNewProjectTime('start', start);
            handleNewProjectTime('end', end);
            setProjects([
              ...projects,
              { name, client: client || undefined, start, end },
            ]);
            setOpenAddModal(false);
            setDuplicateFrom(null);
            showCustomToast('Projet ajouté avec succès.', 'success');
          }}
          hours={hours}
          name={newProjectName}
          setName={setNewProjectName}
          client={newProjectClient}
          setClient={setNewProjectClient}
          start={newProjectStart}
          setStart={setNewProjectStart}
          end={newProjectEnd}
          setEnd={setNewProjectEnd}
          onUpgrade={() => showCustomToast('Fonctionnalité d’upgrade à venir.', 'info')}
        />
      </div>
      <ToastCustom
        open={showToast}
        onClose={handleToastClose}
        message={toast.message}
        type={toast.type}
      />
    </div>
  );
};

export default TimeTrackerDetailed;
