  <script>
    import { slide } from 'svelte/transition';
    let isMenuOpen = false;
  
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }
  
    const teamMembers = [
      {
        name: "Jane Doe",
        title: "Chief Uselessness Officer",
        description: "Jane specializes in creating messages so pointless, they're almost profound.",
        emoji: "🤔"
      },
      {
        name: "John Smith",
        title: "Head of Randomization",
        description: "John ensures our messages are as unpredictable as possible. Even he doesn't know what's coming next.",
        emoji: "🎲"
      },
      {
        name: "Alice Johnson",
        title: "Confusion Engineer",
        description: "Alice makes sure our users are always slightly bewildered, but in a good way.",
        emoji: "🌀"
      }
    ];
  </script>
  
  <svelte:head>
    <title>About Us - Useless Message Co.</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500&display=swap" rel="stylesheet">
  </svelte:head>
  
  <main class="font-['Inter_Tight',sans-serif] font-light">
    <section class="bg-gray-100 pt-40 pb-28">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-6xl font-normal text-black mb-8">About Us</h1>
        <p class="text-2xl text-gray-700 mb-12">Discover the masterminds behind your daily dose of uselessness</p>
      </div>
    </section>
  
    <section class="py-28">
      <div class="container mx-auto px-6">
        <h2 class="text-5xl font-normal text-center text-black mb-16">Our Pointless Mission 🚀</h2>
        <p class="text-2xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
          At Useless Message Co., we're dedicated to bringing a touch of absurdity to your everyday life. Our mission is simple: to confuse, amuse, and occasionally bemuse our valued customers with messages that serve absolutely no purpose whatsoever.
        </p>
        <p class="text-2xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
          Founded in 2023 by a group of professional time-wasters, we've quickly grown to become the world's leading provider of pointless notifications and irrelevant facts.
        </p>
      </div>
    </section>
  
    <section class="bg-brand-blue-light py-28">
      <div class="container mx-auto px-6">
        <h2 class="text-5xl font-normal text-center text-black mb-16">Meet Our Team of Uselessness Experts</h2>
        <div class="grid md:grid-cols-3 gap-16">
          {#each teamMembers as member}
            <div class="bg-white p-10 rounded-2xl shadow-lg shadow-gray-200/50 text-center">
              <div class="text-6xl mb-6">{member.emoji}</div>
              <h3 class="text-3xl font-normal text-black mb-4">{member.name}</h3>
              <h4 class="text-xl font-normal text-brand-blue mb-6">{member.title}</h4>
              <p class="text-xl text-gray-700">{member.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>
  
    <section class="py-28">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-5xl font-normal text-black mb-16">Our Useless Values 🌟</h2>
        <ul class="text-2xl text-gray-700 mb-12 space-y-8 max-w-3xl mx-auto">
          <li><strong>Pointlessness:</strong> We strive to be as irrelevant as possible in everything we do.</li>
          <li><strong>Confusion:</strong> If our customers aren't slightly bewildered, we're not doing our job right.</li>
          <li><strong>Amusement:</strong> We believe laughter is the best medicine, especially when it's for no reason at all.</li>
          <li><strong>Persistence:</strong> We'll never stop sending you messages, even if you beg us to.</li>
        </ul>
      </div>
    </section>
  
    <section class="bg-brand-blue text-white py-28">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-5xl font-normal mb-8">Join Our Useless Revolution 🎉</h2>
        <p class="text-2xl mb-12">Be part of something completely insignificant. Sign up now!</p>
        <a href="#" data-ms-modal-signup class="bg-white text-brand-blue text-xl font-light py-4 px-10 rounded-full hover:bg-brand-blue-light transition duration-300 inline-flex items-center justify-center">Embrace the Uselessness</a>
      </div>
    </section>
  </main>
  
  
  <style>

  </style>