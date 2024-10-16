<script>
    import { onDestroy } from 'svelte';
    import { goto } from '$app/navigation'; // Import goto for programmatic navigation

    let currentIndex = 0;
    const images = ['/train4.01.jpg', '/train4.02.jpg', '/train4.03.jpg', '/train4.04.jpg'];
    let fading = false;

    const slideInterval = setInterval(() => {
        fading = true;
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            fading = false;
        }, 500); // Sync fade-out and switch with the animation duration
    }, 5000);

    function goToSlide(index) {
        currentIndex = index;
    }

    function handleNavigation(text) {
        // Map text to URLs
        const urlMap = {
            'ค้นหาเที่ยวโดยสาร': '/customer/search',
            'รายการเที่ยวโดยสาร': '/customer/list_ticket',
            'จองเที่ยวโดยสาร': '/customer/search',
            'เปลี่ยนแปลงเที่ยวโดยสาร': '/customer/list_ticket'
        };
        goto(urlMap[text]); // Navigate to the corresponding URL
    }

    onDestroy(() => {
        clearInterval(slideInterval);
    });
</script>

<section class="relative w-full h-[24rem] md:h-[30rem] overflow-hidden">
    <div class="absolute inset-0">
        {#each images as image, index}
            <img
                src={image}
                alt="Cover image"
                class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                class:opacity-0={currentIndex !== index || fading}
                class:opacity-100={currentIndex === index && !fading}
            />
        {/each}
    </div>

    <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {#each images as _, index}
            <button
                class="w-4 h-4 rounded-full transition-transform duration-300 transform hover:scale-125"
                class:bg-white={currentIndex === index}
                class:bg-gray-400={currentIndex !== index}
                on:click={() => goToSlide(index)}
            ></button>
        {/each}
    </div>
</section>

<main class="home mt-10">
    <h2 class="text-3xl md:text-4xl font-bold text-[#102C57] text-center mb-10">
        ENJOY YOUR DESTINATIONS WITH OUR TRAINS
    </h2>

    <section class="flex flex-wrap justify-around gap-8">
        {#each [
            { img: '/iconblack-search.png', text: 'ค้นหาเที่ยวโดยสาร' },
            { img: '/iconblack-booking.png', text: 'รายการเที่ยวโดยสาร' },
            { img: '/iconblack-list.png', text: 'จองเที่ยวโดยสาร' },
            { img: '/iconblack-change.png', text: 'เปลี่ยนแปลงเที่ยวโดยสาร' }
        ] as item}
            <div class="flex flex-col items-center text-center w-56">
                <img src={item.img} alt={item.text} class="object-cover w-[160px] h-[160px] mb-4 rounded-md shadow-md" />
                <button
                    on:click={() => handleNavigation(item.text)}
                    class="border border-[#102C57] text-[#102C57] font-semibold py-2 px-6 rounded-lg w-full hover:bg-[#102C57] hover:text-white transition-colors duration-300"
                >
                    {item.text}
                </button>
            </div>
        {/each}
    </section>
</main>
