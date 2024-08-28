<script>
    import { slide } from 'svelte/transition';
  
    let faqs = [
      {
        question: "What exactly is Useless Message Co.?",
        answer: "We're a cutting-edge company dedicated to sending you messages you never knew you didn't need. Think of us as the digital equivalent of a pet rock, but less useful.",
        isOpen: false
      },
      {
        question: "How useless are your messages, really?",
        answer: "On a scale from 'somewhat pointless' to 'why does this even exist', we consistently aim for 'absolute waste of electrons'. We're very proud of our uselessness rating.",
        isOpen: false
      },
      {
        question: "Can I opt out of receiving messages?",
        answer: "Technically yes, but why would you want to? Our messages are like glitter - once you sign up, you'll never truly be rid of us. Embrace the uselessness!",
        isOpen: false
      },
      {
        question: "What if I accidentally learn something useful?",
        answer: "First, our sincerest apologies. Please report any incidents of accidental usefulness to our Pointlessness Department immediately. We'll send you extra useless messages to compensate.",
        isOpen: false
      },
      {
        question: "Is my data secure?",
        answer: "Absolutely! We use military-grade encryption to protect your data. Not because it's necessary, but because it sounds cool and adds an extra layer of pointlessness to our operation.",
        isOpen: false
      }
    ];
  
    function toggleFAQ(index) {
      faqs[index].isOpen = !faqs[index].isOpen;
      faqs = faqs;
    }
</script>
  
<section class="py-28 bg-gray-100">
    <div class="container mx-auto px-6">
      <h2 class="text-5xl font-normal text-center text-black mb-16">Frequently Absurd Questions 🤔</h2>
      <div class="max-w-3xl mx-auto">
        {#each faqs as faq, index}
          <div class="mb-6 bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden">
            <button
              on:click={() => toggleFAQ(index)}
              class="w-full text-left p-6 flex justify-between items-center focus:outline-none"
            >
              <span class="text-2xl font-normal text-black">{faq.question}</span>
              <svg 
                class="w-6 h-6 text-brand-blue transform transition-transform duration-300"
                class:rotate-180={faq.isOpen}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {#if faq.isOpen}
              <div transition:slide={{ duration: 300 }} class="p-6 pt-0">
                <p class="text-xl text-gray-500">{faq.answer}</p>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
</section>