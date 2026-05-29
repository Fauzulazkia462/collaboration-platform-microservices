<template>
  <div class="card">
    <h2>Projects</h2>

    <button @click="load">Refresh</button>

    <div v-if="loading">Loading...</div>

    <div v-for="p in projects" :key="p.id" class="project-card">
      <div>
        <strong>{{ p.name }}</strong>
        <p style="color: var(--muted); font-size: 13px;">
          {{ p.description }}
        </p>
      </div>

      <div style="display:flex; justify-content:center; gap:8px; margin-top:8px;">
        <button @click="$emit('select-project', p)">
          View Tasks
        </button>

        <button @click="$emit('open-create-task', p)">
          + Task
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ProjectApi } from "../../api/projectApi";
import CreateTaskModal from "./CreateTaskModal.vue";
import { HostBridge } from "../../bridge/hostBridge";

const projects = ref<any[]>([]);
const loading = ref(false);

const showModal = ref(false);
const selectedProject = ref<any>(null);

async function load() {
  loading.value = true;

  const ownerId = HostBridge.getEmail(); // ownerId = email

  const res = await ProjectApi.getAll();
  projects.value = res.data;

  loading.value = false;
}

function openTaskModal(project: any) {
  selectedProject.value = project;
  showModal.value = true;
}

onMounted(load);
</script>