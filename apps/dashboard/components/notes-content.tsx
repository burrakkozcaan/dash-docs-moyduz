"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { NoteCard } from "@/components/notes/NoteCard"
import { NotesTable } from "@/components/notes/NotesTable"
import { NotePreviewModal } from "@/components/notes/NotePreviewModal"
import { CreateNoteModal } from "@/components/notes/CreateNoteModal"
import { UploadAudioModal } from "@/components/notes/UploadAudioModal"
import { MOCK_NOTES, CURRENT_USER, type Note } from "@/lib/data/notes"
import { DEFAULT_VIEW_OPTIONS, type FilterChip, type ViewOptions } from "@/lib/view-options"

export function NotesContent() {
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES)
  const [viewOptions, setViewOptions] = useState<ViewOptions>(DEFAULT_VIEW_OPTIONS)
  const [filters, setFilters] = useState<FilterChip[]>([])

  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const removeFilter = (key: string, value: string) => {
    setFilters((prev) => prev.filter((f) => !(f.key === key && f.value === value)))
  }

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note)
    setIsPreviewOpen(true)
  }

  const handleCreateNote = (title: string, content: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title,
      content,
      noteType: "general",
      status: "completed",
      addedDate: new Date(),
      addedBy: CURRENT_USER,
    }
    setNotes((prev) => [newNote, ...prev])
  }

  const handleFileSelect = (fileName: string) => {
    const newNote: Note = {
      id: `note-audio-${Date.now()}`,
      title: fileName.replace(/\.[^/.]+$/, ""),
      noteType: "audio",
      status: "processing",
      addedDate: new Date(),
      addedBy: CURRENT_USER,
    }
    setNotes((prev) => [newNote, ...prev])
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId))
  }

  const openCreate = () => setIsCreateOpen(true)
  const openUpload = () => {
    setIsCreateOpen(false)
    setIsUploadOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col min-w-0">
      <DashboardHeader
        title="Notlar"
        filters={filters}
        onRemoveFilter={removeFilter}
        onFiltersChange={setFilters}
        viewOptions={viewOptions}
        onViewOptionsChange={setViewOptions}
        addLabel="Yeni Not"
        onAdd={openCreate}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Grid view of note cards */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">
            Son notlar
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {notes.slice(0, 6).map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => handleNoteClick(note)}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        </div>

        {/* Table view */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">
            Tüm notlar
          </h2>
          <NotesTable
            notes={notes}
            onAddNote={openCreate}
            onDeleteNote={handleDeleteNote}
            onNoteClick={handleNoteClick}
          />
        </div>
      </div>

      <NotePreviewModal
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        note={selectedNote}
      />

      <CreateNoteModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        currentUser={CURRENT_USER}
        onCreateNote={handleCreateNote}
        onUploadAudio={openUpload}
      />

      <UploadAudioModal
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onFileSelect={handleFileSelect}
      />
    </div>
  )
}
