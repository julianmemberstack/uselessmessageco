<script lang="ts">
    import { Bell, Home, Search, Settings, ChevronDown, Plus, Bookmark, MoreHorizontal, MessageSquare, Clock } from 'lucide-svelte';
  
    let searchQuery = '';
    let notificationCount = 24;
  
    const menuItems = [
      { icon: Home, label: 'Home', active: true },
      { icon: Settings, label: 'Coaching' },
      { icon: Settings, label: 'Goals' },
      { icon: Settings, label: 'Settings' },
    ];
  
    const workspaces = [
      { name: 'Bagas Anardi', avatar: '/placeholder.svg?height=40&width=40' },
      { name: 'Darlian Ramadhani', avatar: '/placeholder.svg?height=40&width=40' },
      { name: 'Fardhan Wari', avatar: '/placeholder.svg?height=40&width=40' },
    ];
  
    const agendaItems = [
      {
        user: { name: 'Onky S', avatar: '/placeholder.svg?height=40&width=40' },
        date: '12 SEPT',
        title: 'New Video Items',
        time: '10:00 AM',
        comments: 3,
        attachments: 1,
      },
      {
        user: { name: 'Erica K', avatar: '/placeholder.svg?height=40&width=40' },
        date: '12 SEPT',
        title: 'Finalize Q3 Budget Report',
        time: '02:00 PM',
        comments: 3,
        attachments: 1,
        subtasks: [
          'Cross-check figures with the finance team',
          'Prepare a summary for the executive team.',
        ],
      },
      {
        user: { name: 'Viola D', avatar: '/placeholder.svg?height=40&width=40' },
        date: '12 SEPT',
        title: 'Finalize Q3 Budget Report',
        time: '10:00 AM',
        comments: 3,
        attachments: 1,
        description: 'Review the draft and make necessary adjustments',
        file: 'campaigns.csv',
      },
    ];
  </script>
  
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r">
      <div class="p-4">
        <div class="flex items-center space-x-2 mb-6">
          <div class="bg-indigo-600 text-white p-2 rounded">
            <Settings class="w-6 h-6" />
          </div>
          <span class="text-xl font-bold">PERSON</span>
        </div>
        <div class="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            bind:value={searchQuery}
            class="w-full pl-10 pr-4 py-2 border rounded-md"
          />
          <Search class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div class="flex items-center mb-6">
          <Bell class="w-6 h-6 mr-2" />
          <span>Notification</span>
          <span class="ml-auto bg-gray-200 rounded-full px-2 py-1 text-xs">{notificationCount}</span>
        </div>
        <nav>
          {#each menuItems as item}
            <a
              href="/"
              class="flex items-center space-x-2 py-2 px-4 rounded-md {item.active ? 'bg-gray-100' : 'hover:bg-gray-100'}"
            >
              <svelte:component this={item.icon} class="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          {/each}
        </nav>
      </div>
      <div class="p-4 border-t">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-gray-500">1:1 WORKSPACES</span>
          <ChevronDown class="w-4 h-4 text-gray-500" />
        </div>
        {#each workspaces as workspace}
          <div class="flex items-center space-x-2 py-2">
            <img src={workspace.avatar} alt={workspace.name} class="w-8 h-8 rounded-full" />
            <span>{workspace.name}</span>
          </div>
        {/each}
      </div>
    </aside>
  
    <!-- Main content -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-8">
        <h1 class="text-3xl font-bold mb-6">Home</h1>
        <div class="flex space-x-4 mb-6">
          <button class="font-semibold pb-2 border-b-2 border-indigo-600">Today's Schedule</button>
          <button class="text-gray-500 hover:text-gray-700">Profile</button>
          <button class="text-gray-500 hover:text-gray-700">Team Action</button>
        </div>
        <div class="bg-indigo-600 text-white p-6 rounded-lg mb-6">
          <div class="flex items-center space-x-4">
            <img src="/placeholder.svg?height=60&width=60" alt="Jane" class="w-12 h-12 rounded-full" />
            <div>
              <h2 class="text-xl font-semibold">Hi Jane, You're awesome</h2>
              <p>You've been showing great leadership skills and we're proud of you</p>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Agenda</h2>
          <button class="flex items-center space-x-1 text-indigo-600">
            <Plus class="w-4 h-4" />
            <span>Add Items</span>
          </button>
        </div>
        <div class="space-y-4">
          {#each agendaItems as item}
            <div class="bg-white p-4 rounded-lg shadow">
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center space-x-2">
                  <img src={item.user.avatar} alt={item.user.name} class="w-8 h-8 rounded-full" />
                  <span>{item.user.name}</span>
                  {#if item.user.name === 'Onky S'}
                    <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">You</span>
                  {/if}
                </div>
                <div class="flex space-x-2">
                  <Bookmark class="w-5 h-5 text-gray-400" />
                  <MoreHorizontal class="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div class="mb-2">
                <span class="text-indigo-600 font-semibold">{item.date}</span>
                <h3 class="text-lg font-semibold">{item.title}</h3>
                {#if item.description}
                  <p class="text-gray-600">{item.description}</p>
                {/if}
                {#if item.subtasks}
                  <ul class="mt-2 space-y-1">
                    {#each item.subtasks as subtask}
                      <li class="flex items-center space-x-2">
                        <input type="checkbox" class="rounded text-indigo-600" />
                        <span class="text-sm">{subtask}</span>
                      </li>
                    {/each}
                  </ul>
                {/if}
                {#if item.file}
                  <div class="mt-2 flex items-center space-x-2 text-sm text-gray-600">
                    <Settings class="w-4 h-4" />
                    <span>{item.file}</span>
                  </div>
                {/if}
              </div>
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center space-x-1">
                  <MessageSquare class="w-4 h-4" />
                  <span>{item.comments}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Settings class="w-4 h-4" />
                  <span>{item.attachments}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Clock class="w-4 h-4" />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </main>
  </div>