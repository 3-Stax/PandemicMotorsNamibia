// Strict mode for better error checking
'use strict';

// --- DOM Elements ---
// Using `const` for elements that won't be reassigned
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');
const carGrid = document.getElementById('carGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterTagsContainer = document.querySelector('.filter-tags');
const filterTags = filterTagsContainer ? filterTagsContainer.querySelectorAll('.filter-tag') : [];
const testimonialSlider = document.getElementById('testimonialSlider');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const interestSelect = document.getElementById('interest');


// --- Data (Consider moving to a separate data.js file for larger applications) ---
const cars = [{
    id: 1,
    make: 'Toyota',
    model: 'Hilux',
    year: 2022,
    fuel: 'Diesel',
    transmission: 'Automatic',
    type: 'truck',
    images: ['images/hilux/hiluxp1.jpg', 'images/hilux/hiluxp2.jpg', 'images/hilux/hiluxp3.jpg', 'images/hilux/hiluxp4.jpg', 'images/hilux/hiluxp5.jpg'],
    price: 'N$ 450,000',
    description: 'A robust and reliable pickup truck, perfect for both work and adventure. Features include a powerful diesel engine, spacious cabin, and advanced safety features.'
}, {
    id: 2,
    make: 'Volkswagen',
    model: 'Jetta',
    year: 2015,
    fuel: 'Petrol',
    transmission: 'Automatic',
    type: 'sedan',
    images: ['images/jetta/jettap1.jpg', 'images/jetta/jettap2.jpg', 'images/jetta/jettap3.jpg', 'images/jetta/jettap4.jpg', 'images/jetta/jettap5.jpg', 'images/jetta/jettap6.jpg', 'images/jetta/jettap7.jpg'],
    price: 'N$ 220,000',
    description: 'A comfortable and efficient sedan, ideal for city driving and long commutes. Known for its smooth ride and fuel economy.'
}, {
    id: 3,
    make: 'Mercedes-Benz',
    model: 'A-Class',
    year: 2020,
    fuel: 'Petrol',
    transmission: 'Automatic',
    type: 'sedan',
    images: ['images/a250/a250p1.jpg', 'images/a250/a250p2.jpg', 'images/a250/a250p3.jpg'],
    price: 'N$ 680,000',
    description: 'Luxury and performance combined. This C-Class offers a premium driving experience with state-of-the-art technology and exquisite comfort.'
}, {
    id: 4,
    make: 'Mazda',
    model: 'Demio',
    year: 2014,
    fuel: 'Petrol',
    transmission: 'Automatic',
    type: 'Hatchback',
    images: ['images/demio/demiop1.jpg', 'images/demio/demiop2.jpg', 'images/demio/demiop3.jpg', 'images/demio/demiop4.jpg', 'images/demio/demiop5.jpg'],
    price: 'N$ 750,000',
    description: 'A fuel efficient city car, perfect for young professionals and adventurous spirits. Excellent handling and a luxurious interior.'
}, {
    id: 5,
    make: 'Volkswagen',
    model: 'Golf',
    year: 2018,
    fuel: 'Petrol',
    transmission: 'Manual',
    type: 'truck',
    images: ['images/golf/golfp1.jpg', 'images/golf/golfp2.jpg', 'images/golf/golfp3.jpg', 'images/golf/golfp4.jpg', 'images/golf/golfp5.jpg', 'images/golf/golfp6.jpg', 'images/golf/golfp7.jpg'],
    price: 'N$ 220,000',
    description: 'Built Ford Tough! This Ranger is ready for any challenge, offering impressive towing capabilities and off-road prowess.'
}, {
    id: 6,
    make: 'Volkswagen',
    model: 'Polo',
    year: 2014,
    fuel: 'Petrol',
    transmission: 'Automatic',
    type: 'Hatchback',
    images: ['images/polo/polop1.jpg', 'images/polo/polop2.jpg', 'images/polo/polop3.jpg', 'images/polo/polop4.jpg'],
    price: 'N$ 310,000',
    description: 'A versatile and stylish compact SUV, offering a comfortable ride and modern features. Great for urban adventures and weekend getaways.'
}];

const services = [{
    icon: 'fas fa-car-crash',
    title: 'Vehicle Inspection',
    description: 'Our certified technicians perform a thorough 150-point inspection to ensure top quality and safety for every vehicle.'
}, {
    icon: 'fas fa-shield-alt',
    title: 'Warranty & Support',
    description: 'We offer comprehensive warranty packages and dedicated after-sales support for your peace of mind.'
}, {
    icon: 'fas fa-money-check-alt',
    title: 'Flexible Financing',
    description: 'Get pre-approved for a loan with competitive rates. Our team helps you find the best financing options tailored to your needs.'
}, {
    icon: 'fas fa-tools',
    title: 'Maintenance & Repairs',
    description: 'From routine servicing to major repairs, our state-of-the-art service center is equipped to handle all your vehicle needs.'
}];

const testimonials = [{
    content: "I was hesitant about buying a used car, but the transparency and quality of service at AutoDeals Namibia completely changed my mind. The Hilux I bought is perfect!",
    author: "Johannes K.",
    rating: 5
}, {
    content: "Finding a reliable sedan was my priority, and AutoDeals Namibia delivered! My Jetta runs like new, and the financing process was surprisingly smooth. Highly recommend!",
    author: "Maria S.",
    rating: 4
}, {
    content: "The variety of vehicles was impressive, and the staff were incredibly helpful without being pushy. I drove away with my dream BMW X5. A truly professional experience.",
    author: "David L.",
    rating: 5
}, {
    content: "Great service and fair prices. I found a fantastic Ford Ranger here. The team was knowledgeable and answered all my questions patiently. Will definitely return!",
    author: "Penda M.",
    rating: 4
}];


// --- Mobile Menu Toggle ---
/**
 * Toggles the mobile navigation menu's active state and updates the button icon.
 * Also controls body scrolling when the menu is open.
 */
function toggleMobileMenu() {
    const isOpen = mainNav.classList.toggle('active');
    const iconElement = mobileMenuBtn.querySelector('.menu-icon');

    if (iconElement) {
        mobileMenuBtn.classList.toggle('active', isOpen);
    } else {
        mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    }

    document.body.style.overflow = isOpen ? 'hidden' : '';
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
}

// --- Smooth Scrolling ---
/**
 * Handles smooth scrolling for anchor links, adjusting for fixed header height.
 * @param {Event} e - The click event object.
 */
function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') {
        return;
    }

    const target = document.querySelector(targetId);
    if (target) {
        const headerOffset = document.querySelector('header').offsetHeight;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        if (mainNav && mainNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    } else {
        console.warn(`Smooth scroll target not found for ID: ${targetId}`);
    }
}


// --- Car Display Functions ---
/**
 * Creates an HTML card element for a given car object.
 * @param {Object} car - The car data object.
 * @returns {HTMLElement} The created car card div element.
 */
function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.dataset.type = car.type;

    card.innerHTML = `
        <div class="car-images">
            <img src="${car.images[0]}" alt="${car.make} ${car.model} Front View" loading="lazy" decoding="async">
            ${car.images[1] ? `<img src="${car.images[1]}" alt="${car.make} ${car.model} Interior View" loading="lazy" decoding="async">` : ''}
        </div>
        <div class="car-info">
            <h3>${car.make} ${car.model}</h3>
            <p class="car-specs">${car.year} • ${car.fuel} • ${car.transmission}</p>
            <p class="car-description">${car.description || 'No description available.'}</p>
            <p class="car-price"><strong>Price: ${car.price}</strong></p>
            <a href="#contact" class="btn btn-primary inquire-btn">
                <i class="fas fa-car"></i> Inquire Now
            </a>
        </div>
    `;

    const inquireButton = card.querySelector('.inquire-btn');
    if (inquireButton) {
        inquireButton.addEventListener('click', (e) => {
            e.preventDefault();

            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            if (interestSelect) {
                const optionToSelect = Array.from(interestSelect.options).find(
                    option => option.value === `${car.make} ${car.model}`
                );
                if (optionToSelect) {
                    interestSelect.value = optionToSelect.value;
                } else {
                    const newOption = document.createElement('option');
                    newOption.value = `${car.make} ${car.model}`;
                    newOption.textContent = `${car.make} ${car.model}`;
                    interestSelect.appendChild(newOption);
                    interestSelect.value = newOption.value;
                }
            }
        });
    }

    return card;
}

/**
 * Displays cars in the grid based on search filter and type.
 * @param {string} filter - Search term (case-insensitive) for make/model.
 * @param {string} type - Car type to filter by ('all', 'sedan', 'SUV', 'truck').
 */
function displayCars(filter = '', type = 'all') {
    if (!carGrid) {
        console.error('Car grid element not found!');
        return;
    }

    carGrid.innerHTML = '';
    const lowerCaseFilter = filter.toLowerCase();

    const filteredCars = cars.filter(car => {
        const matchesSearch = !lowerCaseFilter ||
            car.make.toLowerCase().includes(lowerCaseFilter) ||
            car.model.toLowerCase().includes(lowerCaseFilter) ||
            car.description.toLowerCase().includes(lowerCaseFilter);
        const matchesType = type === 'all' || car.type === type;
        return matchesSearch && matchesType;
    });

    if (filteredCars.length === 0) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results text-center';
        noResultsDiv.style.gridColumn = '1 / -1';
        noResultsDiv.innerHTML = `
            <i class="fas fa-info-circle" style="font-size: 3rem; color: var(--accent); margin-bottom: 20px;"></i>
            <p>Oops! No vehicles found matching your criteria. Try adjusting your search or filters.</p>
            <button class="btn btn-primary" onclick="resetFilters()">Show All Cars</button>
        `;
        carGrid.appendChild(noResultsDiv);
        return;
    }

    const fragment = document.createDocumentFragment();
    filteredCars.forEach(car => {
        fragment.appendChild(createCarCard(car));
    });
    carGrid.appendChild(fragment);
}

/**
 * Resets the search input and filter tags to their default state, then re-displays all cars.
 */
function resetFilters() {
    if (searchInput) {
        searchInput.value = '';
    }
    if (filterTags.length > 0) {
        filterTags.forEach(tag => tag.classList.remove('active'));
        const allTag = document.querySelector('.filter-tag[data-filter="all"]');
        if (allTag) {
            allTag.classList.add('active');
        }
    }
    displayCars();
}


// --- Search and Filter Functionality ---
/**
 * Executes a search based on current search input and active filter tag.
 */
function handleSearch() {
    const searchTerm = searchInput ? searchInput.value.trim() : '';
    const activeFilter = document.querySelector('.filter-tag.active');
    const typeFilter = activeFilter ? activeFilter.dataset.filter : 'all';

    displayCars(searchTerm, typeFilter);
}


// --- Initialize Services Section ---
/**
 * Dynamically populates the services section with data.
 */
function initServices() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) {
        console.error('Services grid element not found!');
        return;
    }

    const fragment = document.createDocumentFragment();
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-icon" aria-hidden="true">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        fragment.appendChild(card);
    });
    servicesGrid.appendChild(fragment);
}


// --- Initialize Testimonials Section ---
/**
 * Dynamically populates the testimonial section with data.
 */
function initTestimonials() {
    if (!testimonialSlider) {
        console.error('Testimonial slider element not found!');
        return;
    }

    const fragment = document.createDocumentFragment();
    testimonials.forEach(testimonial => {
        const element = document.createElement('div');
        element.className = 'testimonial';
        element.innerHTML = `
            <blockquote class="testimonial-content">"${testimonial.content}"</blockquote>
            <p class="testimonial-author">- ${testimonial.author}</p>
            <div class="testimonial-rating" role="img" aria-label="${testimonial.rating} out of 5 stars">
                ${'<i class="fas fa-star" aria-hidden="true"></i>'.repeat(testimonial.rating)}
            </div>
        `;
        fragment.appendChild(element);
    });
    testimonialSlider.appendChild(fragment);
}


// --- Form Handling ---
/**
 * Handles form submissions for contact and newsletter forms.
 * @param {Event} e - The submit event object.
 * @param {string} formType - 'contact' or 'newsletter' to distinguish forms.
 */
async function handleFormSubmit(e, formType) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
    }

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert(`Success! Thank you for your ${formType === 'contact' ? 'message' : 'subscription'}!`);
        form.reset();
    } catch (error) {
        console.error(`Error submitting ${formType} form:`, error);
        alert(`There was an error processing your ${formType}. Please try again later.`);
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = formType === 'contact' ? 'Send Message' : 'Subscribe';
        }
    }
}


// --- Initialize Page ---
/**
 * Initializes all dynamic content and functionality on page load.
 */
function initPage() {
    displayCars();
    initServices();
    initTestimonials();

    if (interestSelect) {
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a vehicle (optional)';
        defaultOption.selected = true;
        defaultOption.disabled = true;
        interestSelect.appendChild(defaultOption);

        cars.forEach(car => {
            const option = document.createElement('option');
            option.value = `${car.make} ${car.model}`;
            option.textContent = `${car.make} ${car.model}`;
            interestSelect.appendChild(option);
        });
    }

    // Attach all event listeners in one central place
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') !== '#') {
            anchor.addEventListener('click', smoothScroll);
        }
    });

    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    if (filterTags.length > 0) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                filterTags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                handleSearch();
            });
        });
    }
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contact'));
    }
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => handleFormSubmit(e, 'newsletter'));
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
        // Deactivate all slides and dots
        slides.forEach((slide) => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
        });
        dots.forEach((dot) => {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
        });

        // Activate the current slide and dot
        slides[index].classList.add('active');
        slides[index].setAttribute('aria-hidden', 'false');
        dots[index].classList.add('active');
        dots[index].setAttribute('aria-selected', 'true');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
            resetAutoSlide();
        });
    });

    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Start the auto-slide when the page loads
    startAutoSlide();

    // Pause auto-slide on hover for better user experience
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    heroSection.addEventListener('mouseleave', () => startAutoSlide());

    // Initialize the first slide
    showSlide(currentIndex);
});