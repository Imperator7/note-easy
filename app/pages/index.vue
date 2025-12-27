<script setup lang="ts">
import { ref } from 'vue'
import NoteCard from '~/components/NoteCard.vue'

export interface Note {
  id: string
  author: string
  note: string
  createdAt: number
  category: string
}

let id = 0

const newNote = ref<string>('')

const notes = ref<Note[]>([
  {
    id: (id++).toString(),
    author: 'A',
    note: 'วันนี้หิวจัง',
    createdAt: Date.now(),
    category: 'งาน',
  },
  {
    id: (id++).toString(),
    author: 'A',
    note: 'วันนี้หิวจัง',
    createdAt: Date.now(),
    category: 'งาน',
  },
  {
    id: (id++).toString(),
    author: 'A',
    note: 'วันนี้หิวจัง',
    createdAt: Date.now(),
    category: 'งาน',
  },
])

const addNote = () => {
  notes.value.push({
    id: (id++).toString(),
    author: 'A',
    note: newNote.value,
    createdAt: Date.now(),
    category: 'งาน',
  })

  newNote.value = ''
}

const editNoteById = (id: string, newNote: string) => {
  notes.value = notes.value.map((note) =>
    note.id === id
      ? {
          ...note,
          note: newNote,
        }
      : note
  )
}

const removeNote = (noteId: string) => {
  notes.value = notes.value.filter((n) => noteId !== n.id)
}
</script>

<template>
  <div class="w-[clamp(400px, 50%, 600px)] p-4 flex flex-col gap-4">
    <h2 class="text-xl font-bold">Notes</h2>
    <div class="flex gap-4">
      <input
        type="text"
        v-model="newNote"
        class="border p-2 rounded"
        placeholder="Type here..."
      />
      <div class="flex gap-2 items-baseline">
        <button
          class="p-2 bg-green-400 rounded cursor-pointer"
          @click="addNote"
        >
          <Icon name="material-symbols:check-rounded" size="20" />
        </button>
        <button
          class="p-2 bg-red-400 rounded cursor-pointer"
          @click="() => (newNote = '')"
        >
          <Icon name="material-symbols-light:close-rounded" size="20" />
        </button>
      </div>
    </div>
    <ul class="flex flex-col gap-2">
      <li v-for="note in notes">
        <NoteCard
          :note="note"
          :remove-note="() => removeNote(note.id)"
          :edit-note="(newNote: string) => editNoteById( note.id, newNote)"
        />
      </li>
    </ul>
  </div>
</template>
