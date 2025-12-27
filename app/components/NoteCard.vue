<script setup lang="ts">
import type { Note } from '~/pages/index.vue'

interface Props {
  note: Note
  editNote: (newNote: string) => void
  removeNote: () => void
}
const props = defineProps<Props>()

const isEditing = ref<boolean>(false)
const showHistory = ref<boolean>(false)
const editingNote = ref<string>(props.note.note)

const date = new Date(props.note.createdAt)

const toggleHistory = () => {
  showHistory.value = !showHistory.value
}
</script>

<template>
  <div class="bg-gray-200 rounded px-4 py-2">
    <div class="flex justify-between">
      <div v-show="!isEditing" class="flex gap-2">
        <p class="px-2">
          {{ note.note }}
        </p>
        <v-btn
          class="cursor-pointer"
          @click="
            () => {
              isEditing = true
            }
          "
        >
          <Icon name="material-symbols:edit-outline" />
        </v-btn>
      </div>
      <div v-show="isEditing">
        <input
          v-model="editingNote"
          type="text"
          placeholder="edit here"
          class="px-2 field-sizing-content min-w-12.5 border rounded"
          ref="editingNoteInput"
        />
        <v-btn
          class="cursor-pointer"
          @click="
            () => {
              editNote(editingNote)
              isEditing = false
            }
          "
        >
          <Icon name="material-symbols:check" /> </v-btn
        ><v-btn
          class="cursor-pointer"
          @click="
            () => {
              editingNote = note.note
              isEditing = false
            }
          "
        >
          <Icon name="material-symbols:close" />
        </v-btn>
      </div>

      <div>
        <v-btn
          v-show="!showHistory"
          @click="toggleHistory"
          class="cursor-pointer"
          ><Icon name="material-symbols:keyboard-arrow-down" color="red-500"
        /></v-btn>
        <v-btn
          v-show="showHistory"
          @click="toggleHistory"
          class="cursor-pointer"
          ><Icon name="material-symbols:keyboard-arrow-up" color="red-500"
        /></v-btn>
        <v-btn @click="removeNote" class="cursor-pointer"
          ><Icon name="material-symbols:close" color="red-500"
        /></v-btn>
      </div>
    </div>
    <div :class="[showHistory ? 'p-2' : 'hidden']">
      <p>ผู้เขียน: {{ note.author }}</p>
      <p>
        เขียนเมื่อ: {{ date.toLocaleTimeString() }} วันที่
        {{ date.toLocaleDateString() }}
      </p>
    </div>
  </div>
</template>
