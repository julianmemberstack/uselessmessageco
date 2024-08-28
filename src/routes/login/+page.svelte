<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  // Removed import of authStore

  let email = '';
  let password = '';
  let errorMessage = '';
  // Removed infoMessage variable
  let isSubmitting = false;

  onMount(async () => {
    await checkLoginStatus();
  });

  async function checkLoginStatus() {
    if (typeof window !== 'undefined' && window.$memberstackDom) {
      try {
        const member = await window.$memberstackDom.getCurrentMember();
        if (member && member.data !== null) {
          goto('/app/dashboard');
        }
      } catch (error) {
        // Silently handle the error
      }
    } else {
      setTimeout(checkLoginStatus, 500);
    }
  }

  async function handleSubmit() {
    if (!email || !password) {
      errorMessage = 'Please enter both email and password.';
      return;
    }

    isSubmitting = true;
    errorMessage = '';

    try {
      const loginResult = await window.$memberstackDom.loginMemberEmailPassword({
        email,
        password,
      });

      if (loginResult.member) {
        goto('/app/dashboard');
      } else {
        errorMessage = 'Login failed. Please check your credentials.';
      }
    } catch (error) {
      errorMessage = 'An error occurred during login. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Login - Useless Message Co.</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500&display=swap" rel="stylesheet">
</svelte:head>

<main class="font-['Inter_Tight',sans-serif] font-normal">
  <section class="bg-gray-100 pt-40 pb-28">
    <div class="container mx-auto px-6 text-center">
      <h1 class="text-6xl font-normal text-black mb-8">Login to Your Useless Account</h1>
      <p class="text-2xl text-gray-700 mb-12">Prepare for a daily dose of confusion!</p>
    </div>
  </section>

  <section class="py-28">
    <div class="container mx-auto px-6">
      <!-- Removed infoMessage conditional rendering -->
      <form on:submit|preventDefault={handleSubmit} class="max-w-xl mx-auto bg-white p-10 rounded-2xl shadow-lg shadow-gray-200/50">
        <div class="mb-6">
          <label for="email" class="block text-xl text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            required
            class="w-full px-4 py-3 rounded-full text-lg border border-gray-300 focus:outline-none focus:border-brand-blue"
            placeholder="your@email.com"
          />
        </div>
        <div class="mb-8">
          <label for="password" class="block text-xl text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            bind:value={password}
            required
            class="w-full px-4 py-3 rounded-full text-lg border border-gray-300 focus:outline-none focus:border-brand-blue"
            placeholder="Enter your password"
          />
        </div>
        {#if errorMessage}
          <p class="text-red-500 mt-2 mb-4">{errorMessage}</p>
        {/if}
        <button
          type="submit"
          class="w-full bg-brand-blue text-white text-xl font-normal py-3 px-8 rounded-full transition duration-300 hover:bg-brand-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login to Confusion Central'}
        </button>
      </form>
      <div class="text-center mt-8">
        <p class="text-lg text-gray-700">
          Don't have an account? <a href="/signup" class="text-brand-blue hover:underline">Sign up for pointless wisdom</a>
        </p>
      </div>
    </div>
  </section>

  <section class="bg-brand-blue text-white py-28 flex items-center min-h-[40vh]">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-5xl font-normal mb-8">Forgot Your Password? 🤔</h2>
      <p class="text-2xl mb-8">Don't worry, it happens to the best of us. Especially when you're constantly bombarded with useless information!</p>
      <a href="#" class="bg-white text-brand-blue text-xl font-normal py-3 px-8 rounded-full hover:bg-brand-blue-light transition duration-300 inline-block">Reset Password</a>
    </div>
  </section>
</main>
