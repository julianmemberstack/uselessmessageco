<script>
    import "../app.css";
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import Nav from '$lib/components/Nav.svelte';
    import FAQ from '$lib/components/FAQ.svelte';
    import { page } from '$app/stores';
    import { currentMember } from '$lib/stores/memberStore';

    $: currentPage = $page.url.pathname === '/' ? 'home' : $page.url.pathname.slice(1);

    let memberstack;

    onMount(async () => {
        if (browser) {
            const memberstackDOM = await import('@memberstack/dom');
            memberstack = memberstackDOM.default.init({
                publicKey: "pk_sb_c245103819605b673848",
            });

            try {
                const member = await memberstack.getCurrentMember();
                console.log('Member object:', member);
                if (member && member.data && member.data.auth) {
                    console.log('User is logged in:', member.data.auth.email);
                    currentMember.set(member.data);
                } else {
                    console.log('No user is currently logged in');
                    currentMember.set(null);
                }
            } catch (error) {
                console.error('Error getting current member:', error);
                currentMember.set(null);
            }
        }
    });

    // Function to handle logout
    async function handleLogout() {
        try {
            await memberstack.logout();
            currentMember.set(null);
            // Redirect to home page or login page
            window.location.href = '/';
        } catch (error) {
            console.error('Error during logout:', error);
            // Handle logout error
        }
    }
</script>

<Nav {currentPage} />

<slot />

<FAQ />

<footer class="bg-brand-blue text-white py-12">
  <div class="container mx-auto px-6 text-center">
    <p class="text-xl font-light">&copy; 2023 Useless Message Co. All rights reserved.</p>
    {#if $currentMember}
      <button on:click={handleLogout} class="mt-4 text-white underline">Logout</button>
    {/if}
  </div>
</footer>