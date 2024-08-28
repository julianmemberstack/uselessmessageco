<script>
    import { slide } from 'svelte/transition';
    import { currentMember } from '$lib/stores/memberStore';
    export let currentPage = '';
    let isMenuOpen = false;
  
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }
  
    $: isLoggedIn = $currentMember !== null && $currentMember !== undefined;
</script>
  
  <header class="bg-white shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] sticky top-0 w-full z-50">
    <nav class="container mx-auto px-6 py-4 md:py-8 flex flex-wrap justify-between items-center">
      <div class="text-2xl md:text-3xl font-normal text-black">Useless Message Co.</div>
      
      <button 
        class="lg:hidden ml-auto"
        on:click={toggleMenu}
        aria-label="Toggle menu"
      >
        <div class="w-6 h-6 flex flex-col justify-between items-center">
          <span class="w-full h-1 bg-brand-blue transform transition duration-300 ease-in-out" class:rotate-45={isMenuOpen} class:translate-y-2.5={isMenuOpen}></span>
          <span class="w-full h-1 bg-brand-blue transition duration-300 ease-in-out" class:opacity-0={isMenuOpen}></span>
          <span class="w-full h-1 bg-brand-blue transform transition duration-300 ease-in-out" class:-rotate-45={isMenuOpen} class:-translate-y-2.5={isMenuOpen}></span>
        </div>
      </button>
      
      <ul class="hidden lg:flex space-x-12 items-center">
        <li><a href="/" class="nav-link text-lg text-gray-700 hover:text-brand-blue font-light" class:text-brand-blue={currentPage === 'home'}>Home</a></li>
        <li><a href="/features" class="nav-link text-lg text-gray-700 hover:text-brand-blue font-light" class:text-brand-blue={currentPage === 'features'}>Features</a></li>
        <li><a href="/about" class="nav-link text-lg text-gray-700 hover:text-brand-blue font-light" class:text-brand-blue={currentPage === 'about'}>About</a></li>
      </ul>
      
      <div class="hidden lg:flex space-x-4 items-center">
        {#if isLoggedIn}
          <a href="/app/dashboard" class="bg-brand-blue text-white text-lg font-light py-2 px-6 rounded-full hover:bg-brand-blue-dark transition duration-300 flex items-center justify-center">Dashboard</a>
        {:else}
          <a href="/signup" data-ms-modal-signup class="bg-brand-blue text-white text-lg font-light py-2 px-6 rounded-full hover:bg-brand-blue-dark transition duration-300 flex items-center justify-center">Sign Up</a>
          <a href="/login" class="bg-white text-brand-blue text-lg font-light py-2 px-6 rounded-full border-2 border-brand-blue hover:bg-brand-blue-light transition duration-300 flex items-center justify-center">Login</a>
        {/if}
      </div>
    </nav>
    
    {#if isMenuOpen}
      <div transition:slide={{ duration: 300 }} class="lg:hidden">
        <ul class="bg-white py-6 px-6">
          <li class="py-3"><a href="/" class="text-lg text-gray-700 hover:text-brand-blue font-light">Home</a></li>
          <li class="py-3"><a href="/features" class="text-lg text-gray-700 hover:text-brand-blue font-light">Features</a></li>
          <li class="py-3"><a href="/about" class="text-lg text-gray-700 hover:text-brand-blue font-light">About</a></li>
          {#if isLoggedIn}
            <li class="py-3"><a href="/app/dashboard" class="text-lg text-brand-blue font-normal">Dashboard</a></li>
          {:else}
            <li class="py-3"><a href="#" data-ms-modal-signup class="text-lg text-brand-blue font-normal">Sign Up</a></li>
            <li class="py-3"><a href="#" class="text-lg text-brand-blue font-normal">Login</a></li>
          {/if}
        </ul>
      </div>
    {/if}
  </header>
  
  <style>
    .nav-link {
      position: relative;
      text-decoration: none;
    }
  
    .nav-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -8px; 
      left: 0;
      background-color: theme('colors.brand-blue');
      transition: width 0.3s ease-out, left 0.3s ease-out;
    }
  
    .nav-link:hover::after {
      width: 100%;
    }
  
    .nav-link:not(:hover)::after {
      left: auto;
      right: 0;
      transition: width 0.3s ease-out;
    }
  </style>