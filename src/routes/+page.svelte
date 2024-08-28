<script>
  import { onMount } from 'svelte';
  import Swiper from 'swiper';
  import { Autoplay } from 'swiper/modules';
  import 'swiper/css';
  import { fade } from 'svelte/transition';

  const testimonials = [
    { name: "Sarah B.", quote: "I've never felt so informed about things I don't need to know!", emoji: "🤯" },
    { name: "Mike R.", quote: "Thanks to Useless Message Co., I now have an excuse for being late to everything!", emoji: "⏰" },
    { name: "Emma L.", quote: "My friends think I'm profound, but it's just these random messages.", emoji: "🧠" },
    { name: "Alex K.", quote: "I've become an expert in topics I never knew existed. Thanks for nothing!", emoji: "🎓" },
    { name: "Olivia P.", quote: "My productivity has plummeted, but my random knowledge has skyrocketed!", emoji: "📊" },
    { name: "Chris M.", quote: "I now start and end my day with absolute nonsense. It's strangely comforting.", emoji: "🌙" },
  ];

  const uselessMessages = [
    "The average person will spend six months of their life waiting for red lights to turn green.",
    "A group of flamingos is called a 'flamboyance' and a group of crows is called a 'murder'.",
    "The inventor of the frisbee was cremated and turned into a frisbee after he died.",
    "Honeybees can recognize human faces, but they're not very good at remembering names.",
    "In Switzerland, it is illegal to own just one guinea pig because they are prone to loneliness.",
    "The shortest war in history lasted 38 minutes between Britain and Zanzibar in 1896.",
    "Polar bears' fur is actually clear, not white. Their skin is black underneath.",
    "The Hawaiian pizza was invented in Canada, not Hawaii, by a Greek immigrant.",
    "A day on Venus is longer than its year. It takes 243 Earth days to rotate once on its axis.",
    "The first oranges weren't orange. They were green. The color was named after the fruit.",
    "The world's largest desert is Antarctica, not the Sahara. It receives very little precipitation.",
    "A 'jiffy' is an actual unit of time: 1/100th of a second. It's used in various scientific fields.",
    "Bananas are berries, but strawberries aren't. This is based on the botanical definition of a berry.",
    "The Eiffel Tower can grow up to 6 inches taller during the summer due to thermal expansion.",
    "Octopuses have three hearts and blue blood. This is due to their unique circulatory system.",
  ];

  let swiper;
  let currentMessage = '';
  let blurredMessage = '';
  let email = '';
  let isEmailValid = false;
  let isMessageRevealed = false;
  let isSubmitted = false;
  let isSubmitting = false;
  let submitError = null;

  function getRandomMessage() {
    const message = uselessMessages[Math.floor(Math.random() * uselessMessages.length)];
    const halfLength = Math.ceil(message.length / 2);
    currentMessage = message.slice(0, halfLength);
    blurredMessage = message.slice(halfLength);
    return message;
  }

  function validateEmail() {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isEmailValid = re.test(email);
  }

  async function handleSubmit() {
    if (!isEmailValid) return;

    isSubmitting = true;
    submitError = null;

    try {
      const response = await fetch('https://hook.us1.make.com/sk8jh6wt40tc4viakejyl2i1c0nk4rmq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Handle successful submission
      isMessageRevealed = true;
      isSubmitted = true;
    } catch (error) {
      console.error('Submission error:', error);
      submitError = 'An error occurred. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }

  function signUpForMore() {
    // Redirect to signup page with email as URL parameter
    window.location.href = `/signup?email=${encodeURIComponent(email)}`;
  }

  onMount(() => {
    swiper = new Swiper('.swiper-container', {
      modules: [Autoplay],
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });

    getRandomMessage();
    const interval = setInterval(() => {
      if (!isMessageRevealed) {
        getRandomMessage();
      }
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>Useless Message Co. - Pointless Wisdom Delivered Daily</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500&display=swap" rel="stylesheet">
</svelte:head>


<main class="font-['Inter_Tight',sans-serif] font-light">
  <section id="home" class="bg-gray-100 pt-40 pb-28">
    <div class="container mx-auto px-6 text-center">
      <h1 class="text-6xl font-normal text-black mb-8">Useless Messages, Delivered Daily 📩</h1>
      <p class="text-2xl text-gray-700 mb-12">Because who doesn't need more pointless notifications in their life?</p>
      <div class="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 mb-12 max-w-2xl mx-auto">
        <p class="text-xl text-gray-700 italic mb-4">Today's Useless Insight:</p>
        <p class="text-2xl text-brand-blue" transition:fade>
          {currentMessage}<span class={isMessageRevealed ? '' : 'blur-sm'}>{blurredMessage}</span>
        </p>
      </div>
      {#if !isSubmitted}
        <form on:submit|preventDefault={handleSubmit} class="flex flex-col sm:flex-row justify-center items-stretch gap-4 max-w-xl mx-auto">
          <input
            type="email"
            bind:value={email}
            on:input={validateEmail}
            placeholder="Enter your email"
            class="w-full sm:flex-grow px-4 py-3 rounded-full text-lg"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            class="w-full sm:w-auto bg-brand-blue text-white text-xl font-light py-3 px-8 rounded-full hover:bg-brand-blue-dark transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0"
            disabled={!isEmailValid || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Reveal Uselessness'}
          </button>
        </form>
        {#if submitError}
          <p class="text-red-500 mt-2">{submitError}</p>
        {/if}
      {:else}
        <button
          on:click={signUpForMore}
          class="bg-brand-blue text-white text-xl font-light py-3 px-8 rounded-full hover:bg-brand-blue-dark transition duration-300 inline-block"
        >
          Sign up for more uselessness
        </button>
      {/if}
    </div>
  </section>

  <section id="how-it-works" class="py-28">
    <div class="container mx-auto px-6">
      <h2 class="text-5xl font-normal text-center text-black mb-16">How It Works (Sort Of) 🤔</h2>
      <div class="grid md:grid-cols-3 gap-16">
        <div class="bg-white p-10 rounded-2xl shadow-lg shadow-gray-200/50 text-center">
          <div class="text-6xl mb-6">💸</div>
          <h3 class="text-3xl font-normal text-black mb-6">1. Pay Us</h3>
          <p class="text-xl text-gray-700 mb-8">Hand over your hard-earned cash for messages you don't need.</p>
        </div>
        <div class="bg-white p-10 rounded-2xl shadow-lg shadow-gray-200/50 text-center">
          <div class="text-6xl mb-6">⏳</div>
          <h3 class="text-3xl font-normal text-black mb-6">2. Wait Anxiously</h3>
          <p class="text-xl text-gray-700 mb-8">Spend your day wondering what useless tidbit you'll receive.</p>
        </div>
        <div class="bg-white p-10 rounded-2xl shadow-lg shadow-gray-200/50 text-center">
          <div class="text-6xl mb-6">🎉</div>
          <h3 class="text-3xl font-normal text-black mb-6">3. Receive Wisdom(?)</h3>
          <p class="text-xl text-gray-700 mb-8">Get a message so random, it might just change your life (but probably not).</p>
        </div>
      </div>
    </div>
  </section>

  <section id="testimonials" class="bg-brand-blue-light py-28">
    <div class="container mx-auto px-6">
      <h2 class="text-5xl font-normal text-center text-black mb-16">What Our Confused Customers Say 🗣️</h2>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          {#each testimonials as testimonial}
            <div class="swiper-slide">
              <div class="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 text-center h-full flex flex-col justify-between">
                <div>
                  <div class="text-4xl mb-4">{testimonial.emoji}</div>
                  <p class="text-lg text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                </div>
                <p class="text-base font-normal text-brand-blue">- {testimonial.name}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <section id="pricing" class="py-28">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-5xl font-normal text-black mb-16">Pricing (Because Uselessness Isn't Free) 💰</h2>
      <div class="grid md:grid-cols-3 gap-16">
        <div class="bg-white p-10 rounded-2xl shadow-lg shadow-gray-200/50 text-center">
          <h3 class="text-3xl font-normal text-black mb-6">Basic Confusion</h3>
          <p class="text-6xl font-normal text-brand-blue mb-8">$4.99<span class="text-2xl">/mo</span></p>
          <ul class="text-xl text-gray-700 mb-8">
            <li>1 useless message per day</li>
            <li>50% chance of typos</li>
            <li>Occasional emoji overload</li>
          </ul>
          <a href="#" data-ms-modal-signup class="bg-brand-blue text-white text-lg font-light py-3 px-8 rounded-full hover:bg-brand-blue-dark transition duration-300 inline-flex items-center justify-center">Sign Up</a>
        </div>
        <div class="bg-white p-10 rounded-2xl shadow-lg shadow-gray-200/50 text-center border-4 border-brand-blue">
          <h3 class="text-3xl font-normal text-black mb-6">Premium Perplexity</h3>
          <p class="text-6xl font-normal text-brand-blue mb-8">$9.99<span class="text-2xl">/mo</span></p>
          <ul class="text-xl text-gray-700 mb-8">
            <li>3 useless messages per day</li>
            <li>25% chance of accidental wisdom</li>
            <li>Custom confusion settings</li>
          </ul>
          <a href="#" data-ms-modal-signup class="bg-brand-blue text-white text-lg font-light py-3 px-8 rounded-full hover:bg-brand-blue-dark transition duration-300 inline-flex items-center justify-center">Sign Up</a>
        </div>
        <div class="bg-white p-10 rounded-2xl shadow-lg shadow-gray-200/50 text-center">
          <h3 class="text-3xl font-normal text-black mb-6">Ultimate Uselessness</h3>
          <p class="text-6xl font-normal text-brand-blue mb-8">$19.99<span class="text-2xl">/mo</span></p>
          <ul class="text-xl text-gray-700 mb-8">
            <li>Unlimited useless messages</li>
            <li>AI-generated nonsense</li>
            <li>Priority customer confusion</li>
          </ul>
          <a href="#" data-ms-modal-signup class="bg-brand-blue text-white text-lg font-light py-3 px-8 rounded-full hover:bg-brand-blue-dark transition duration-300 inline-flex items-center justify-center">Sign Up</a>
        </div>
      </div>
    </div>
  </section>

  <section id="cta" class="bg-brand-blue text-white py-28 flex items-center min-h-[50vh]">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-5xl font-normal mb-8">Ready to Embrace the Absurd? 🎭</h2>
      <p class="text-2xl mb-12">Join thousands of confused individuals who can't start their day without our pointless insights!</p>
      <a href="#" data-ms-modal-signup class="bg-white text-brand-blue text-xl font-light py-4 px-10 rounded-full hover:bg-brand-blue-light transition duration-300 inline-flex items-center justify-center">Start Your Journey to Nowhere</a>
    </div>
  </section>
</main>


<style>
  :global(.swiper-pagination-bullet) {
    background-color: theme('colors.brand-blue');
  }

  :global(.swiper-button-next),
  :global(.swiper-button-prev) {
    color: theme('colors.brand-blue');
  }

  :global(.swiper-button-next:after),
  :global(.swiper-button-prev:after) {
    font-size: 24px;
  }
</style>
