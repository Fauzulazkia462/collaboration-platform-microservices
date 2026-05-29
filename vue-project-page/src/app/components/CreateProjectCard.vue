<template>
  <div class="card">
    <h2>Create Project</h2>

    <input v-model="name" placeholder="Project name" />
    <input v-model="description" placeholder="Description" />

    <button
      :disabled="!name || !description"
      @click="submit"
    >
      Create Project
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ProjectApi } from "../../api/projectApi";
import { HostBridge } from "../../bridge/hostBridge";

const name = ref("");
const description = ref("");

async function create() {
  await ProjectApi.create({
    name: name.value,
    description: description.value,
    ownerId: HostBridge.getEmail()
  });

  name.value = "";
  description.value = "";
}
</script>