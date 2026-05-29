<template>
  <div class="card">
    <h2>Project Tasks</h2>

    <div v-if="loading">Loading...</div>

    <div v-if="!tasks.length && !loading">
      No tasks found for this project
    </div>

    <div v-for="t in tasks" :key="t.id" class="task-card">
      <strong>{{ t.title }}</strong>
      <div style="color: var(--muted); font-size: 13px;">
        Assigned: {{ t.assigned_to }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { TaskApi } from "../../api/taskApi";

const props = defineProps<{ project: any }>();

const tasks = ref<any[]>([]);
const loading = ref(false);

async function loadProjectTasks(projectId: number) {
  loading.value = true;

  try {
    const res = await TaskApi.getByProject(projectId);
    tasks.value = res.data;
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.project?.id,
  (id) => {
    if (id) loadProjectTasks(id);
    else tasks.value = [];
  },
  { immediate: true }
);
</script>