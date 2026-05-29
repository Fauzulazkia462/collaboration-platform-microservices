<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h3>Create Task</h3>
      <p style="color: var(--muted); font-size: 13px;">
        Project: {{ project.name }}
      </p>

      <input v-model="title" placeholder="Task title" />
      <input v-model="assignedTo" placeholder="Assignee email" />

      <div style="display:flex; gap:8px; justify-content:flex-end;">
        <button @click="$emit('close')">Cancel</button>
        <button @click="create">Create</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TaskApi } from "../../api/taskApi";

const props = defineProps<{ project: any }>();
const emit = defineEmits(["close", "created"]);

const title = ref("");
const assignedTo = ref("");

async function create() {
  await TaskApi.create({
    projectId: props.project.id,
    title: title.value,
    assignedTo: assignedTo.value
  });

  emit("created");
  emit("close");
}
</script>