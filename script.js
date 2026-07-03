document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate Falling Petals (Marigold and Jasmine)
    const petalsContainer = document.getElementById('petals-container');
    const petalCount = 30;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        const leftPos = Math.random() * 100;
        const size = Math.random() * 10 + 10;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;

        petal.style.left = `${leftPos}vw`;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;

        const rand = Math.random();
        if (rand < 0.33) {
            petal.style.backgroundColor = '#FF7F50'; // Marigold dark
        } else if (rand < 0.66) {
            petal.style.backgroundColor = '#FFFFFF'; // Jasmine white
        }

        petalsContainer.appendChild(petal);
    }

    // SECTION NAVIGATION LOGIC
    const photosSection = document.getElementById('photos-section');
    const proposalSection = document.getElementById('proposal-section');
    const storySection = document.getElementById('story-section');
    const promisesSection = document.getElementById('promises-section');
    const successScreen = document.getElementById('success-screen');
    const postProposalSection = document.getElementById('post-proposal-section');
    const essenceSection = document.getElementById('essence-section');
    const endingSection = document.getElementById('ending-section');

    const goToProposalBtn = document.getElementById('go-to-proposal');
    const goToStoryBtn = document.getElementById('go-to-story');
    const goToPromisesBtn = document.getElementById('go-to-promises');
    const goToPostProposalBtn = document.getElementById('go-to-post-proposal');

    // SLIDESHOW LOGIC
    let currentPhoto = 1;
    const totalPhotos = 10;
    const slideshowImage = document.getElementById('slideshow-image');
    const slideshowCaption = document.getElementById('slideshow-caption');
    const prevPhotoBtn = document.getElementById('prev-photo');
    const nextPhotoBtn = document.getElementById('next-photo');

    const captions = {
        1: "Day end ki entha alisipoyina, neetho okka mata matladithe chalu... naa energy antha tirigi ostundi! 🔋❤️",
        2: "Neetho matladithe chalu, naa roju antha oka pedda 'Good Day' ye! 🍪😊",
        3: "Naa life lo athi viluvaina GEMS nee kalle! 💎✨",
        4: "Naa life lo nuvve naa comfort zone. Neetho unte vachedi prasanthatha! 🥰🏠",
        5: "Naa daggara nuvvu eppudu neela 'B Natural' ga undali! 🧃🌿",
        6: "Naa life lo unna oke okka 'Choice' nuvve! ❤️",
        7: "Nee matallo unde theeyadhanam mundu ye sweet paniki raadhu... naa life ki kavalsina oke oka sweet nuvve! 🥰🍯",
        8: "Neetho matladetappudu oche sigguki, naa face strawberry kante ekkuva red aipothundi! 🍓🙈",
        9: "Naa kalallo neekosam epudo kota kattesanu bangaram! ☕🏰❤️",
        10: "Naa manasulo unna prema ni innala nunchi dachipettadaniki try chesa... kani inka nee premato 'Hide & Seek' aadalenu. 🥺❤️",
        11: "Nuvvu lekunda naa life ni oohinchukolenu... naa chivari swasa varaku naku thodu ga untava? Will you 'MARIE' me? 💍🥺",
        12: "Naa cheekati prapancham lo ki nee prema oka tharala vachi 'HIT' ayindi... aa velugu nannu eppatiki vidichi povodhu! ✨🥺"
    };

    function updateSlideshow() {
        slideshowImage.src = `Photos/${currentPhoto}.PNG`;
        slideshowCaption.innerText = captions[currentPhoto] || "";
        
        prevPhotoBtn.style.visibility = currentPhoto === 1 ? 'hidden' : 'visible';
        
        if (currentPhoto === totalPhotos) {
            nextPhotoBtn.style.display = 'none';
            goToProposalBtn.classList.remove('hidden');
        } else {
            nextPhotoBtn.style.display = 'inline-block';
            goToProposalBtn.classList.add('hidden');
        }
    }

    prevPhotoBtn.addEventListener('click', () => {
        if (currentPhoto > 1) {
            currentPhoto--;
            updateSlideshow();
        }
    });

    nextPhotoBtn.addEventListener('click', () => {
        if (currentPhoto < totalPhotos) {
            currentPhoto++;
            updateSlideshow();
        }
    });

    // Initialize
    updateSlideshow();

    function switchSection(from, to) {
        from.classList.remove('active');
        from.classList.add('hidden');
        to.classList.remove('hidden');
        to.classList.add('active');
        window.scrollTo(0, 0);
    }

    goToProposalBtn.addEventListener('click', () => {
        switchSection(photosSection, proposalSection);
    });

    goToPostProposalBtn.addEventListener('click', () => {
        successScreen.classList.remove('visible');
        switchSection(proposalSection, postProposalSection);
    });

    goToStoryBtn.addEventListener('click', () => {
        switchSection(postProposalSection, storySection);
        animateChatMessages();
    });

    // POST-PROPOSAL SLIDESHOW LOGIC
    let currentPostPhoto = 11;
    const totalPostPhotos = 12;
    const postSlideshowImage = document.getElementById('post-slideshow-image');
    const postSlideshowCaption = document.getElementById('post-slideshow-caption');
    const postPrevPhotoBtn = document.getElementById('post-prev-photo');
    const postNextPhotoBtn = document.getElementById('post-next-photo');

    function updatePostSlideshow() {
        postSlideshowImage.src = `Photos/${currentPostPhoto}.PNG`;
        postSlideshowCaption.innerText = captions[currentPostPhoto] || "";
        
        postPrevPhotoBtn.style.visibility = currentPostPhoto === 11 ? 'hidden' : 'visible';
        
        if (currentPostPhoto === totalPostPhotos) {
            postNextPhotoBtn.style.display = 'none';
            goToStoryBtn.classList.remove('hidden');
        } else {
            postNextPhotoBtn.style.display = 'inline-block';
            goToStoryBtn.classList.add('hidden');
        }
    }

    postPrevPhotoBtn.addEventListener('click', () => {
        if (currentPostPhoto > 11) {
            currentPostPhoto--;
            updatePostSlideshow();
        }
    });

    postNextPhotoBtn.addEventListener('click', () => {
        if (currentPostPhoto < totalPostPhotos) {
            currentPostPhoto++;
            updatePostSlideshow();
        }
    });

    // Initialize Post Slideshow
    updatePostSlideshow();

    // 2. Playful "No" Button Logic
    const noBtn = document.getElementById('no-btn');
    
    const dodgeCursor = () => {
        const btnRect = noBtn.getBoundingClientRect();
        const maxX = window.innerWidth - btnRect.width - 20;
        const maxY = window.innerHeight - btnRect.height - 20;
        
        const newX = Math.max(20, Math.floor(Math.random() * maxX));
        const newY = Math.max(20, Math.floor(Math.random() * maxY));

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        noBtn.style.transition = 'all 0.2s ease';
    };

    noBtn.addEventListener('mouseover', dodgeCursor);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dodgeCursor();
    });

    // 3. "Yes" Button Logic & Confetti
    const yesBtn = document.getElementById('yes-btn');
    const mainCard = document.getElementById('main-card');

    yesBtn.addEventListener('click', () => {
        mainCard.classList.add('hidden');
        setTimeout(() => {
            successScreen.classList.add('visible');
            triggerConfetti();
        }, 500);
    });

    function triggerConfetti() {
        const duration = 5 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#FF9933', '#FFD700', '#8B0000', '#097969'] });
            confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#FF9933', '#FFD700', '#8B0000', '#097969'] });
            if (Date.now() < end) { requestAnimationFrame(frame); }
        }());
    }

    // 4. Royal Scroll Pagination Logic
    let currentChatPage = 0;
    const messagesPerPage = 5;
    const allMessages = document.querySelectorAll('.scroll-paragraph');
    const nextChatPageBtn = document.getElementById('next-chat-page-btn');
    const prevChatPageBtn = document.getElementById('prev-chat-page-btn');
    const goToEssenceBtn = document.getElementById('go-to-essence');
    const scrollContainer = document.getElementById('chat-container'); // ID is still chat-container in HTML

    function showChatPage(pageIndex) {
        const startIdx = pageIndex * messagesPerPage;
        const endIdx = startIdx + messagesPerPage;
        
        // Hide all messages first
        allMessages.forEach(msg => {
            msg.classList.remove('visible');
            msg.style.display = 'none';
            msg.style.animationDelay = '0s';
        });

        // Show only messages for the current page
        let messagesShown = 0;
        for (let i = startIdx; i < endIdx && i < allMessages.length; i++) {
            const msg = allMessages[i];
            msg.style.display = 'flex'; // force display before adding class
            // trigger reflow
            void msg.offsetWidth;
            msg.classList.add('visible');
            msg.style.animationDelay = `${messagesShown * 0.15}s`;
            messagesShown++;
        }

        // Scroll to top of the scroll container so they read from top to bottom
        setTimeout(() => {
            scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);

        // Hide "Load More" if we reached the end, and show "Essence" button
        if (endIdx >= allMessages.length) {
            nextChatPageBtn.style.display = 'none';
            goToEssenceBtn.classList.remove('hidden');
        } else {
            nextChatPageBtn.style.display = 'inline-block';
            nextChatPageBtn.classList.remove('hidden');
            goToEssenceBtn.classList.add('hidden');
        }

        if (pageIndex > 0) {
            prevChatPageBtn.style.visibility = 'visible';
        } else {
            prevChatPageBtn.style.visibility = 'hidden';
        }
    }

    if (prevChatPageBtn) {
        prevChatPageBtn.addEventListener('click', () => {
            if (currentChatPage > 0) {
                currentChatPage--;
                showChatPage(currentChatPage);
            }
        });
    }

    if (goToEssenceBtn) {
        goToEssenceBtn.addEventListener('click', () => {
            switchSection(storySection, essenceSection);
        });
    }

    const goToPromisesRealBtn = document.getElementById('go-to-promises-real');
    if (goToPromisesRealBtn) {
        goToPromisesRealBtn.addEventListener('click', () => {
            switchSection(essenceSection, promisesSection);
        });
    }

    const goToEndingBtn = document.getElementById('go-to-ending');
    if (goToEndingBtn) {
        goToEndingBtn.addEventListener('click', () => {
            switchSection(promisesSection, endingSection);
        });
    }

    if (nextChatPageBtn) {
        nextChatPageBtn.addEventListener('click', () => {
            currentChatPage++;
            showChatPage(currentChatPage);
        });
    }

    function animateChatMessages() {
        // Start from page 0
        currentChatPage = 0;
        showChatPage(currentChatPage);
    }
});
