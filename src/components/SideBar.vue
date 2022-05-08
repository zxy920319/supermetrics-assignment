<template>
  <div>
    <div
      class="h-screen fixed top-0 md:left-0 -left-64 overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300"
    >
      <div class="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
        <a
          href="https://careers.supermetrics.com/jobs/1625178-lead-web-engineer-marketing-team"
          target="_blank"
          rel="noreferrer"
          class="mt-2 text-center w-full inline-block"
        >
          <span class="text-gray-900 text-lg font-serif font-bold leading-normal mt-0 mb-2">Supermetrics Dashboard</span>
        </a>
        <div class="flex flex-col">
          <hr class="my-4 min-w-full" />

          <ul class="flex-col min-w-full flex list-none">
            <li class="rounded-lg mb-4">
              <router-link
                to="/dashboard"
                class="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                active-class="bg-gradient-to-tr from-blue-500 to-blue-700 text-white shadow-md"
              >
                <FontAwesomeIcon icon="house-user" />
                Dashboard
              </router-link>
            </li>
            <li class="rounded-lg mb-4">
              <router-link
                to="/analysis"
                class="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                active-class="bg-gradient-to-tr from-blue-500 to-blue-700 text-white shadow-md"
              >
                <FontAwesomeIcon icon="pie-chart" />
                Feel Smart
              </router-link>
            </li>
          </ul>

          <ul class="flex-col min-w-full flex list-none absolute bottom-0">
            <li class="bg-gradient-to-tr from-blue-500 to-blue-700 px-4 rounded-lg mb-2">
              <a
                href="https://github.com/zxy920319/supermetrics-assignment"
                target="_blank"
                rel="noreferrer"
                class="flex items-center gap-4 text-sm font-light py-3 text-white"
              >
                <FontAwesomeIcon :icon="['fab', 'github']" />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
