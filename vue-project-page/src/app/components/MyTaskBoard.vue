<template>
  <div class="card">
    <h2>My Tasks</h2>

    <button @click="loadMyTasks">Refresh</button>

    <div v-if="loading">Loading...</div>

    <div v-if="!tasks.length && !loading">
      You have no tasks assigned
    </div>

    <div v-for="t in tasks" :key="t.id" class="task-card">
      <strong>{{ t.title }}</strong>

      <div style="color: var(--muted); font-size: 13px;">
        Project ID: {{ t.project_id }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TaskApi } from "../../api/taskApi";
import { HostBridge } from "../../bridge/hostBridge";

const tasks = ref<any[]>([]);
const loading = ref(false);

async function loadMyTasks() {
  loading.value = true;

  try {
    const email = HostBridge.getEmail();
    const res = await TaskApi.getByAssignee(email);
    tasks.value = res.data;
  } finally {
    loading.value = false;
  }
}

onMounted(loadMyTasks);
</script>