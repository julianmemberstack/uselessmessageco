<script>
  import { slide } from 'svelte/transition';
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  const features = [
    {
      title: "Daily Secret Messages",
      description: "Receive a unique, cryptic message every day that may or may not be relevant to your life.",
      icon: "📩"
    },
    {
      title: "Randomized Wisdom",
      description: "Our AI-powered system generates wisdom that's so random, it might just be profound.",
      icon: "🤖"
    },
    {
      title: "Useless Facts",
      description: "Learn something new every day that you'll probably never need to know.",
      icon: "🧠"
    },
    {
      title: "Mysterious Notifications",
      description: "Get notifications at odd hours for no apparent reason.",
      icon: "🔔"
    },
    {
      title: "Encrypted Nonsense",
      description: "Your messages are encrypted with state-of-the-art technology, because why not?",
      icon: "🔐"
    },
    {
      title: "Pointless Achievements",
      description: "Earn badges for accomplishing absolutely nothing of value.",
      icon: "🏆"
    }
  ];
</script>

<svelte:head>
  <title>Features - Useless Message Co.</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500&display=swap" rel="stylesheet">
</svelte:head>


<main class="font-['Inter_Tight',sans-serif] font-light">
  <section class="bg-gray-100 pt-40 pb-28">
    <div class="container mx-auto px-6 text-center">
      <h1 class="text-6xl font-normal text-black mb-8">Our Useless Features</h1>
      <p class="text-2xl text-gray-700 mb-12">Discover the pointless wonders that await you</p>
    </div>
  </section>

  <section class="py-28">
    <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-3 gap-16">
        {#each features as feature}
          <div class="bg-white p-10 rounded-2xl shadow-lg shadow-gray-200/50 text-center">
            <div class="text-6xl mb-6">{feature.icon}</div>
            <h3 class="text-3xl font-normal text-black mb-6">{feature.title}</h3>
            <p class="text-xl text-gray-700 mb-8">{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section id="cta" class="bg-brand-blue text-white py-28">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-5xl font-normal mb-8">Ready to Embrace the Absurd? 🎭</h2>
      <p class="text-2xl mb-12">Join thousands of confused individuals who can't start their day without our pointless insights!</p>
      <a href="#" data-ms-modal-signup class="bg-white text-brand-blue text-xl font-light py-4 px-10 rounded-full hover:bg-brand-blue-light transition duration-300 inline-flex items-center justify-center">Start Your Journey to Nowhere</a>
    </div>
  </section>
</main>

<style>

</style>
