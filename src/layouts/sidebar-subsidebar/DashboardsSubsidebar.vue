<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="inner" data-simplebar>
      <ul>
        <li>
          <RouterLink :to="{ name: 'addMonitor' }">
            <!-- <i aria-hidden="true" class="lnil lnil-home pr-2"></i> -->
            ADD MONITOR
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'addMonitor' }">
            <!-- <i aria-hidden="true" class="lnil lnil-home pr-2"></i> -->
            MY MONITOR
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'addMonitor' }">
            <!-- <i aria-hidden="true" class="lnil lnil-home pr-2"></i> -->
            EVENTS
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'addMonitor' }">
            <!-- <i aria-hidden="true" class="lnil lnil-home pr-2"></i> -->
            SETTINGS
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/layout/_sidebar-panel.scss';

.simplebar-content-wrapper {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.is-dark .sidebar-panel.is-generic .inner ul li a.router-link-exact-active {
  font-size: 18px;
  color: white !important;
  font-family: system-ui;
  letter-spacing: 1px;
}

.is-dark
  .sidebar-panel.is-generic
  .inner
  ul
  li
  a.router-link-exact-active:hover {
  font-size: 18px;
  color: var(--primary) !important;
  font-family: system-ui;
  letter-spacing: 1px;
}
</style>
