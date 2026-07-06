<template>
  <div
    class="flex h-screen flex-col justify-between border-e border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900"
  >
    <div class="p-4">
      <span
        class="grid h-12 w-32 place-content-center rounded-lg bg-gray-100 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400"
      >
        Logo
      </span>
      <ul class="mt-4 space-y-1">
        <li>
          <p
            class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
          >
            General
          </p>
        </li>
        <!-- Dashboard ----------------------------------------- -->
        <li>
          <router-link
            to="/"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Dashboard
          </router-link>
        </li>
        <!-- Test Parent ----------------------------------------- -->
        <li>
          <router-link
            to="/parent"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Test Parent
          </router-link>
        </li>
        <!-- Profile ----------------------------------------- -->
        <li>
          <router-link
            to="/profile"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Profile
          </router-link>
        </li>
        <!-- Educations ----------------------------------------- -->
        <li>
          <router-link
            to="/education"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Education
          </router-link>
        </li>
        <!-- Skills ----------------------------------------- -->
        <li>
          <router-link
            to="/skill"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Skills
          </router-link>
        </li>
        <!-- Projects ----------------------------------------- -->
        <li>
          <details class="group [&amp;_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Projects

              <span
                class="shrink-0 transition duration-300 group-open:-rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </summary>

            <ul class="mt-2 space-y-1 px-4">
              <!-- Projects > Works ----------------------------------------- -->
              <li>
                <router-link
                  to="/work"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  Works
                </router-link>
              </li>
              <!-- Projects > Feature ----------------------------------------- -->
              <li>
                <router-link
                  to="/feature"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  Key Feature
                </router-link>
              </li>
              <!-- Projects > Technology ----------------------------------------- -->
              <li>
                <router-link
                  to="/technology"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  Technology
                </router-link>
              </li>
              <!-- Projects > Technology_tool ----------------------------------------- -->
              <li>
                <router-link
                  to="/tool"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  Technology Tools
                </router-link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>

    <div
      class="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-gray-800"
    >
      <a
        href="#"
        class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50 hover:transition-colors dark:bg-gray-900 dark:hover:bg-gray-800"
      >
        <img
          alt=""
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&amp;fit=crop&amp;q=80&amp;w=1160"
          class="size-10 rounded-full object-cover"
        />

        <p class="text-xs text-gray-900 dark:text-white">
          <strong class="block font-medium">Eric Frusciante</strong>

          <span> eric@frusciante.com </span>
        </p>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
