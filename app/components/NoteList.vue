<script setup lang="ts">
interface NoteListProps {}

const props = defineProps<NoteListProps>()

const { notes } = useNote()
console.log(notes)
</script>

<template>
  <ul v-if="notes.length !== 0" class="flex flex-col gap-2">
    <li v-for="note in notes">
      <NoteCard :note="note" />
    </li>
  </ul>
  <p v-else>No note for now</p>
</template>
