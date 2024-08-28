<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  // Removed import of authStore

  let email = '';
  let password = '';
  let confirmPassword = '';
  let plan = 'basic';
  let passwordsMatch = true;
  let errorMessage = '';
  let isPasswordValid = false;

  $: {
    passwordsMatch = password === confirmPassword;
    isPasswordValid = password.length >= 8;
  }

  onMount(() => {
    const emailParam = $page.url.searchParams.get('email');
    if (emailParam) {
      email = decodeURIComponent(emailParam);
    }
  });

  async function handleSubmit() {
    if (passwordsMatch) {
      try {
        const signupResult = await window.$memberstackDom.signupMemberEmailPassword({
          email,
          password,
          customFields: {
            plan: plan
          },
          plans: [
            {
              planId: getPlanId(plan)
            }
          ]
        });

        console.log('Signup successful', signupResult);
        goto('/app/dashboard');
      } catch (error) {
        console.error('Signup failed', error);
        errorMessage = error.message || 'Signup failed. Please try again.';
      }
    } else {
      errorMessage = 'Passwords do not match.';
    }
  }

  function getPlanId(planName) {
    // Replace these with your actual plan IDs from Memberstack
    const planIds = {
      basic: 'pln_basic-confusion-3x6b0e45',
      premium: 'pln_premium_id_here',
      ultimate: 'pln_ultimate_id_here'
    };
    return planIds[planName] || planIds.basic;
  }
</script>

<svelte:head>
  <title>Sign Up - Useless Message Co.</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500&display=swap" rel="stylesheet">
</svelte:head>

<main class="font-['Inter_Tight',sans-serif] font-light">
  <section class="bg-gray-100 pt-40 pb-28">
    <div class="container mx-auto px-6 text-center">
      <h1 class="text-6xl font-normal text-black mb-8">Sign Up for Uselessness</h1>
      <p class="text-2xl text-gray-700 mb-12">Join our community of confused individuals today!</p>
    </div>
  </section>

  <section class="py-28">
    <div class="container mx-auto px-6">
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
        <div class="mb-6">
          <label for="password" class="block text-xl text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            bind:value={password}
            required
            class="w-full px-4 py-3 rounded-full text-lg border border-gray-300 focus:outline-none focus:border-brand-blue"
            placeholder="Enter your password (min 8 characters)"
          />
          {#if password && !isPasswordValid}
            <p class="text-red-500 mt-2">Password must be at least 8 characters long</p>
          {/if}
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block text-xl text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            bind:value={confirmPassword}
            required
            class="w-full px-4 py-3 rounded-full text-lg border border-gray-300 focus:outline-none focus:border-brand-blue"
            placeholder="Confirm your password"
          />
          {#if !passwordsMatch && confirmPassword}
            <p class="text-red-500 mt-2">Passwords do not match</p>
          {/if}
        </div>
        <div class="mb-8">
          <label class="block text-xl text-gray-700 mb-2">Select Your Plan</label>
          <div class="flex justify-between">
            <label class="flex items-center">
              <input type="radio" bind:group={plan} value="basic" class="mr-2">
              <span>Basic Confusion</span>
            </label>
            <label class="flex items-center">
              <input type="radio" bind:group={plan} value="premium" class="mr-2">
              <span>Premium Perplexity</span>
            </label>
            <label class="flex items-center">
              <input type="radio" bind:group={plan} value="ultimate" class="mr-2">
              <span>Ultimate Uselessness</span>
            </label>
          </div>
        </div>
        {#if errorMessage}
          <p class="text-red-500 mt-2 mb-4">{errorMessage}</p>
        {/if}
        <button
          type="submit"
          class="w-full bg-brand-blue text-white text-xl font-light py-3 px-8 rounded-full transition duration-300"
          class:hover:bg-brand-blue-dark={isPasswordValid && passwordsMatch}
          class:opacity-50={!isPasswordValid || !passwordsMatch}
          class:cursor-not-allowed={!isPasswordValid || !passwordsMatch}
          disabled={!isPasswordValid || !passwordsMatch}
        >
          Sign Up for Pointless Wisdom
        </button>
      </form>
    </div>
  </section>

  <section class="bg-brand-blue text-white py-28 flex items-center min-h-[40vh]">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-5xl font-normal mb-8">Join the Confusion Today! 🤪</h2>
      <p class="text-2xl">Embrace the absurdity and start receiving useless messages right away!</p>
    </div>
  </section>
</main>

<style>
  /* Add any additional styles here if needed */
</style>
