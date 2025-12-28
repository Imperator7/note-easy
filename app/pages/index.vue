<script setup lang="ts">
const { user, loggedIn } = useUserSession()
const newNote = ref<string>('')

const { fetchNotes, createNote } = useNote()

const addNote = () => {
  createNote({
    note: newNote.value,
    author: user.value?.name,
    category: 'work',
  })

  newNote.value = ''
}

onMounted(() => {
  fetchNotes()
})
</script>

<template>
  <div class="w-[clamp(400px, 50%, 600px)] p-4 flex flex-col gap-4">
    <h2 class="text-xl font-bold">Notes</h2>
    <div v-show="loggedIn" class="flex gap-4">
      <input
        type="text"
        v-model="newNote"
        class="border p-2 rounded"
        placeholder="Type here..."
      />
      <div class="flex gap-2 items-center">
        <button
          class="p-2 bg-green-400 rounded cursor-pointer flex items-center"
          @click="addNote"
        >
          <Icon name="material-symbols:check-rounded" size="20" />
        </button>
        <button
          class="p-2 bg-red-400 rounded cursor-pointer flex items-center"
          @click="() => (newNote = '')"
        >
          <Icon name="material-symbols-light:close-rounded" size="20" />
        </button>
      </div>
    </div>
    <NoteList />
  </div>
</template>
