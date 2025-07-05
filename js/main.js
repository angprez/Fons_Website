// Main JavaScript functionality

// Declare utils variable before using it
const utils = {
  throttle: (func, limit) => {
    let inThrottle
    return function (...args) {
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },
  debounce: (func, wait) => {
    let timeout
    return function (...args) {
      
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  },
  createScrollObserver: (callback, options) => {
    return new IntersectionObserver(callback, options)
  },
  storage: {
    get: (key, defaultValue) => {
      const value = localStorage.getItem(key)
      return value !== null ? value : defaultValue
    },
    set: (key, value) => {
      localStorage.setItem(key, value)
    },
  },
  smoothScrollTo: (target) => {
    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    })
  },
  isValidEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },
  getScrollPercentage: () => {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollY = window.scrollY
    return (scrollY / docHeight) * 100
  },
}

class FONSWebsite {
  constructor() {
    this.isLoaded = false
    this.scrollObserver = null
    this.currentTheme = "light"
    this.mobileMenuOpen = false

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.initScrollAnimations()
    this.initThemeToggle()
    this.initMobileMenu()
    this.initSmoothScrolling()
    this.initHeaderScroll()
    this.initFormHandling()
    this.initCarousels()
    this.initModals()
    this.initFilters()
    this.initProgressBar()
    this.initLazyLoading()

    // Mark as loaded
    this.isLoaded = true
    document.body.classList.add("loaded")
  }

  setupEventListeners() {
    // Window events
    window.addEventListener("scroll", utils.throttle(this.handleScroll.bind(this), 16))
    window.addEventListener("resize", utils.debounce(this.handleResize.bind(this), 250))
    window.addEventListener("load", this.handleLoad.bind(this))

    // Navigation events
    document.addEventListener("click", this.handleNavigation.bind(this))
  }

  initScrollAnimations() {
    // Create intersection observer for scroll animations
    this.scrollObserver = utils.createScrollObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")

            // Add stagger effect for grouped elements
            const siblings = entry.target.parentElement.querySelectorAll(".scroll-reveal")
            siblings.forEach((sibling, index) => {
              if (sibling === entry.target) {
                setTimeout(() => {
                  sibling.classList.add("revealed")
                }, index * 100)
              }
            })
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe all scroll reveal elements
    const scrollElements = document.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale",
    )
    scrollElements.forEach((el) => {
      this.scrollObserver.observe(el)
    })

    // Add scroll reveal classes to elements with data-aos
    const aosElements = document.querySelectorAll("[data-aos]")
    aosElements.forEach((el) => {
      const animation = el.getAttribute("data-aos")
      const delay = el.getAttribute("data-aos-delay") || 0

      el.classList.add("scroll-reveal")
      el.style.transitionDelay = `${delay}ms`

      this.scrollObserver.observe(el)
    })
  }

  initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle")
    if (!themeToggle) return

    // Load saved theme
    const savedTheme = utils.storage.get("theme", "light")
    this.setTheme(savedTheme)

    themeToggle.addEventListener("click", () => {
      const newTheme = this.currentTheme === "light" ? "dark" : "light"
      this.setTheme(newTheme)
    })
  }

  setTheme(theme) {
    this.currentTheme = theme
    document.documentElement.setAttribute("data-theme", theme)
    utils.storage.set("theme", theme)

    // Update theme toggle icon
    const themeToggle = document.getElementById("themeToggle")
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", `Switch to ${theme === "light" ? "dark" : "light"} mode`)
    }
  }

  initMobileMenu() {
    const navToggle = document.getElementById("navToggle")
    const navMenu = document.getElementById("navMenu")

    if (!navToggle || !navMenu) return

    navToggle.addEventListener("click", () => {
      this.toggleMobileMenu()
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.mobileMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        this.closeMobileMenu()
      }
    })

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.mobileMenuOpen) {
        this.closeMobileMenu()
      }
    })
  }

  toggleMobileMenu() {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu()
    } else {
      this.openMobileMenu()
    }
  }

  openMobileMenu() {
    const navMenu = document.getElementById("navMenu")
    const navToggle = document.getElementById("navToggle")

    this.mobileMenuOpen = true
    navMenu.classList.add("active")
    navToggle.classList.add("active")
    document.body.classList.add("menu-open")
  }

  closeMobileMenu() {
    const navMenu = document.getElementById("navMenu")
    const navToggle = document.getElementById("navToggle")

    this.mobileMenuOpen = false
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
    document.body.classList.remove("menu-open")
  }

  initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return

      const href = link.getAttribute("href")
      if (href === "#") return

      const target = document.querySelector(href)
      if (!target) return

      e.preventDefault()
      utils.smoothScrollTo(target)

      // Close mobile menu if open
      if (this.mobileMenuOpen) {
        this.closeMobileMenu()
      }
    })
  }

  initHeaderScroll() {
    const header = document.getElementById("header")
    if (!header) return

    let lastScrollY = window.scrollY
    let ticking = false

    const updateHeader = () => {
      const scrollY = window.scrollY

      if (scrollY > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }

      // Hide/show header on scroll
      if (scrollY > lastScrollY && scrollY > 200) {
        header.classList.add("hidden")
      } else {
        header.classList.remove("hidden")
      }

      lastScrollY = scrollY
      ticking = false
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader)
        ticking = true
      }
    })
  }

  initFormHandling() {
    // Contact form
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", this.handleContactForm.bind(this))
    }

    // Newsletter form
    const newsletterForms = document.querySelectorAll(".newsletter-form")
    newsletterForms.forEach((form) => {
      form.addEventListener("submit", this.handleNewsletterForm.bind(this))
    })

    // Floating labels
    const floatingInputs = document.querySelectorAll(".form-input")
    floatingInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused")
      })

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.classList.remove("focused")
        }
      })
    })
  }

  async handleContactForm(e) {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    const submitBtn = form.querySelector('button[type="submit"]')

    // Validate form
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    if (!name || !email || !message) {
      this.showNotification("Please fill in all required fields.", "error")
      return
    }

    if (!utils.isValidEmail(email)) {
      this.showNotification("Please enter a valid email address.", "error")
      return
    }

    // Show loading state
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      this.showNotification("Thank you! Your message has been sent successfully.", "success")
      form.reset()
    } catch (error) {
      this.showNotification("Sorry, there was an error sending your message. Please try again.", "error")
    } finally {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }
  }

  async handleNewsletterForm(e) {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    const email = formData.get("email")
    const submitBtn = form.querySelector('button[type="submit"]')

    if (!email || !utils.isValidEmail(email)) {
      this.showNotification("Please enter a valid email address.", "error")
      return
    }

    const originalText = submitBtn.textContent
    submitBtn.textContent = "Subscribing..."
    submitBtn.disabled = true

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      this.showNotification("Successfully subscribed to our newsletter!", "success")
      form.reset()
    } catch (error) {
      this.showNotification("Subscription failed. Please try again.", "error")
    } finally {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }
  }

  initCarousels() {
    const clientCarousel = document.getElementById("clientCarousel")
    if (clientCarousel) {
      this.initClientCarousel(clientCarousel)
    }
  }

  initClientCarousel(carousel) {
    const track = carousel.querySelector(".client-carousel__track")
    if (!track) return

    // Clone items for infinite scroll
    const items = track.children
    const itemsArray = Array.from(items)

    itemsArray.forEach((item) => {
      const clone = item.cloneNode(true)
      track.appendChild(clone)
    })

    // Pause animation on hover
    carousel.addEventListener("mouseenter", () => {
      track.style.animationPlayState = "paused"
    })

    carousel.addEventListener("mouseleave", () => {
      track.style.animationPlayState = "running"
    })
  }

  initModals() {
    // Service modals
    const serviceCards = document.querySelectorAll(".service-card")
    serviceCards.forEach((card) => {
      card.addEventListener("click", () => {
        const serviceName = card.querySelector(".service-card__title").textContent
        this.openServiceModal(serviceName)
      })
    })

    // Portfolio lightbox
    const portfolioCards = document.querySelectorAll(".portfolio-card")
    portfolioCards.forEach((card) => {
      card.addEventListener("click", () => {
        const title = card.querySelector(".portfolio-card__title").textContent
        const category = card.querySelector(".portfolio-card__category").textContent
        const image = card.querySelector(".portfolio-card__image img").src

        this.openPortfolioLightbox({ title, category, image })
      })
    })

    // Close modals
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal__backdrop") || e.target.classList.contains("modal__close")) {
        this.closeModal(e.target.closest(".modal"))
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const activeModal = document.querySelector(".modal.active")
        if (activeModal) {
          this.closeModal(activeModal)
        }
      }
    })
  }

  openServiceModal(serviceName) {
    const modal = this.createServiceModal(serviceName)
    document.body.appendChild(modal)

    // Trigger animation
    setTimeout(() => {
      modal.classList.add("active")
    }, 10)
  }

  createServiceModal(serviceName) {
    const modal = document.createElement("div")
    modal.className = "modal"
    modal.innerHTML = `
      <div class="modal__backdrop"></div>
      <div class="modal__content">
        <div class="modal__header">
          <h3 class="modal__title">${serviceName}</h3>
          <button class="modal__close" aria-label="Close modal">×</button>
        </div>
        <div class="modal__body">
          <p>Learn more about our ${serviceName.toLowerCase()} services and how we can help grow your business.</p>
          <form class="consultation-form">
            <div class="form-group">
              <label class="form-label">Name</label>
              <input type="text" class="form-input" name="name" required>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" name="email" required>
            </div>
            <div class="form-group">
              <label class="form-label">Company</label>
              <input type="text" class="form-input" name="company">
            </div>
            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea class="form-input form-textarea" name="message" placeholder="Tell us about your project..."></textarea>
            </div>
          </form>
        </div>
        <div class="modal__footer">
          <button type="button" class="btn btn--outline" onclick="this.closest('.modal').querySelector('.modal__close').click()">Cancel</button>
          <button type="submit" class="btn btn--primary" form="consultation-form">Schedule Consultation</button>
        </div>
      </div>
    `

    return modal
  }

  openPortfolioLightbox({ title, category, image }) {
    const lightbox = this.createPortfolioLightbox({ title, category, image })
    document.body.appendChild(lightbox)

    setTimeout(() => {
      lightbox.classList.add("active")
    }, 10)
  }

  createPortfolioLightbox({ title, category, image }) {
    const lightbox = document.createElement("div")
    lightbox.className = "modal"
    lightbox.innerHTML = `
      <div class="modal__backdrop"></div>
      <div class="modal__content" style="max-width: 800px;">
        <div class="modal__header">
          <h3 class="modal__title">${title}</h3>
          <button class="modal__close" aria-label="Close lightbox">×</button>
        </div>
        <div class="modal__body">
          <div class="portfolio-lightbox">
            <img src="${image}" alt="${title}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
            <div class="portfolio-lightbox__meta">
              <span class="portfolio-lightbox__category">${category}</span>
              <h4 class="portfolio-lightbox__title">${title}</h4>
              <p class="portfolio-lightbox__description">
                This project showcases our expertise in ${category.toLowerCase()}. 
                We delivered exceptional results that exceeded client expectations.
              </p>
            </div>
          </div>
        </div>
      </div>
    `

    return lightbox
  }

  closeModal(modal) {
    modal.classList.remove("active")
    setTimeout(() => {
      modal.remove()
    }, 300)
  }

  initFilters() {
    const filterTabs = document.querySelectorAll(".filter-tab")
    const filterableItems = document.querySelectorAll("[data-filter]")

    filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.getAttribute("data-filter")

        // Update active tab
        filterTabs.forEach((t) => t.classList.remove("active"))
        tab.classList.add("active")

        // Filter items
        filterableItems.forEach((item) => {
          const itemCategories = item.getAttribute("data-filter").split(" ")

          if (filter === "all" || itemCategories.includes(filter)) {
            item.style.display = "block"
            item.classList.add("animate-fade-in")
          } else {
            item.style.display = "none"
            item.classList.remove("animate-fade-in")
          }
        })
      })
    })
  }

  initProgressBar() {
    const progressBar = document.querySelector(".progress-bar")
    if (!progressBar) return

    window.addEventListener("scroll", () => {
      const scrollPercentage = utils.getScrollPercentage()
      progressBar.style.transform = `scaleX(${scrollPercentage / 100})`
    })
  }

  initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]')

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src || img.src
            img.classList.remove("loading")
            imageObserver.unobserve(img)
          }
        })
      })

      images.forEach((img) => {
        img.classList.add("loading")
        imageObserver.observe(img)
      })
    }
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification--${type}`
    notification.innerHTML = `
      <div class="notification__content">
        <span class="notification__message">${message}</span>
        <button class="notification__close" aria-label="Close notification">×</button>
      </div>
    `

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1080;
      background: ${type === "success" ? "#10B981" : type === "error" ? "#EF4444" : "#6B46C1"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 400px;
    `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 10)

    // Auto remove
    setTimeout(() => {
      this.removeNotification(notification)
    }, 5000)

    // Close button
    notification.querySelector(".notification__close").addEventListener("click", () => {
      this.removeNotification(notification)
    })
  }

  removeNotification(notification) {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }

  handleScroll() {
    // Update scroll-based animations and effects
    const scrollY = window.scrollY

    // Parallax effects
    const parallaxElements = document.querySelectorAll("[data-parallax]")
    parallaxElements.forEach((el) => {
      const speed = Number.parseFloat(el.getAttribute("data-parallax")) || 0.5
      const yPos = -(scrollY * speed)
      el.style.transform = `translateY(${yPos}px)`
    })
  }

  handleResize() {
    // Handle responsive changes
    if (window.innerWidth > 1024 && this.mobileMenuOpen) {
      this.closeMobileMenu()
    }
  }

  handleLoad() {
    // Page fully loaded
    document.body.classList.add("page-loaded")
  }

  handleNavigation(e) {
    // Handle navigation clicks
    const link = e.target.closest("a")
    if (!link) return

    // Update active navigation
    if (link.classList.contains("nav__link")) {
      document.querySelectorAll(".nav__link").forEach((l) => l.classList.remove("active"))
      link.classList.add("active")
    }
  }
}

// Initialize website
const fonsWebsite = new FONSWebsite()

// Export for global access
window.fonsWebsite = fonsWebsite

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0]
      console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`)
    }, 0)
  })
}
