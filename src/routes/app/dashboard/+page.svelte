<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { currentMember } from '$lib/stores/memberStore';

  let latestMessage = "Loading your daily dose of uselessness...";

  onMount(async () => {
    if (browser) {
      // TODO: Fetch the latest useless message from your API
      // For now, we'll use a placeholder
      setTimeout(() => {
        latestMessage = "The average person spends 6 months of their life waiting for red lights to turn green.";
      }, 1500);
    }
  });
</script>

<svelte:head>
  <title>Dashboard - Useless Message Co.</title>
</svelte:head>

<main class="font-['Inter_Tight',sans-serif] font-normal bg-gray-100 min-h-screen">
  <section class="bg-brand-blue text-white py-16">
    <div class="container mx-auto px-6">
      <h1 class="text-4xl font-medium mb-4">Welcome, {$currentMember?.auth?.email || 'User'}</h1>
      <p class="text-xl mb-8">Here's your daily dose of uselessness:</p>
      <div class="bg-white text-brand-blue p-8 rounded-2xl shadow-lg">
        <p class="text-2xl font-normal italic">{latestMessage}</p>
      </div>
    </div>
  </section>

  <section class="py-12">
    <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-medium text-black mb-4">Your Profile</h2>
          <p class="text-lg text-gray-700 mb-2">Email: {$currentMember?.auth?.email || 'Loading...'}</p>
          <p class="text-lg text-gray-700">Plan: {$currentMember?.planConnections?.[0]?.planName || 'Basic Confusion'}</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-medium text-black mb-4">Useless Stats</h2>
          <p class="text-lg text-gray-700 mb-2">Messages Received: 42</p>
          <p class="text-lg text-gray-700">Confusion Level: Over 9000</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-medium text-black mb-4">Quick Actions</h2>
          <button class="bg-brand-blue text-white text-lg font-normal py-2 px-4 rounded-full hover:bg-brand-blue-dark transition duration-300 mb-2 w-full">Generate New Message</button>
          <button class="bg-gray-200 text-gray-700 text-lg font-normal py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300 w-full">Update Profile</button>
        </div>
      </div>
    </div>
  </section>

  <section class="py-12">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-medium text-black mb-6">Recent Useless Messages</h2>
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <ul class="divide-y divide-gray-200">
          <li class="py-4 text-lg">The average person will spend 6 months of their life waiting for red lights to turn green.</li>
          <li class="py-4 text-lg">In Switzerland, it is illegal to own just one guinea pig because they are prone to loneliness.</li>
          <li class="py-4 text-lg">The inventor of the frisbee was cremated and made into frisbees after he died.</li>
          <li class="py-4 text-lg">Banging your head against a wall burns 150 calories an hour.</li>
          <li class="py-4 text-lg">A group of flamingos is called a "flamboyance".</li>
        </ul>
      </div>
    </div>
  </section>
</main>
