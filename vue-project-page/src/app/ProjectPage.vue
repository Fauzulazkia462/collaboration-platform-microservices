<template>
  <div class="container">
    <div class="grid">
      <ProjectList
        @select-project="selectedProject = $event"
        @open-create-task="openTaskModal"
      />

      <TaskBoard :project="selectedProject" />
      <MyTaskBoard />
    </div>

    <div class="bottom">
      <CreateProjectCard />
    </div>

    <CreateTaskModal
      v-if="showModal"
      :project="selectedProject"
      @close="showModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { HostBridge } from "../bridge/hostBridge";

import ProjectList from "./components/ProjectList.vue";
import TaskBoard from "./components/TaskBoard.vue";
import MyTaskBoard from "./components/MyTaskBoard.vue";
import CreateProjectCard from "./components/CreateProjectCard.vue";
import CreateTaskModal from "./components/CreateTaskModal.vue";

const email = computed(() => HostBridge.getEmail());

const selectedProject = ref<any>(null);
const showModal = ref(false);

function openTaskModal(project: any) {
  selectedProject.value = project;
  showModal.value = true;
}
</script>

<style scoped>
.header {
  margin-bottom: 16px;
}

.muted {
  color: var(--muted);
  font-size: 13px;
}

.bottom {
  margin-top: 16px;
}
</style>