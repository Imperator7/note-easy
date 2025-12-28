<script setup lang="ts">
interface Props {
  note: Note
}
const props = defineProps<Props>()

const isEditing = ref<boolean>(false)
const showHistory = ref<boolean>(false)
const editingNote = ref<string>(props.note.note)

const { removeNoteById, editNoteById } = useNote()

const editNote = (newNote?: string, category?: string) => {
  editNoteById({ id: props.note.id, note: newNote, category: category })
}

const removeNote = () => {
  removeNoteById({ id: props.note.id })
}

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
      <div v-show="isEditing" class="flex gap-2">
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
              editNote(editingNote, undefined)
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

      <div class="flex gap-2">
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
        <v-btn @click="removeNote()" class="cursor-pointer"
          ><Icon name="material-symbols:close" color="red-500"
        /></v-btn>
      </div>
    </div>
    <div
      :class="
        [[showHistory ? 'p-2' : 'hidden'], 'bg-white m-2 p-2 rounded'].join(' ')
      "
    >
      <p>ผู้เขียน: {{ note.author }}</p>
      <p>
        เขียนเมื่อ:
        {{ new Date(note.createdAt).toLocaleTimeString() }} วันที่
        {{ new Date(note.createdAt).toLocaleDateString() }}
      </p>
    </div>
  </div>
</template>
