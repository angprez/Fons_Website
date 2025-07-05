// Utility Functions

// Debounce function
function debounce(func, wait, immediate) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func(...args)
  }
}

// Throttle function
function throttle(func, limit) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Smooth scroll to element
function smoothScrollTo(element, duration = 1000) {
  const targetPosition = element.offsetTop - 80 // Account for header
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime = null

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = ease(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  function ease(t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  requestAnimationFrame(animation)
}

// Check if element is in viewport
function isInViewport(element, threshold = 0.1) {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  const vertInView = rect.top <= windowHeight * (1 - threshold) && rect.top + rect.height >= windowHeight * threshold
  const horInView = rect.left <= windowWidth * (1 - threshold) && rect.left + rect.width >= windowWidth * threshold

  return vertInView && horInView
}

// Intersection Observer for scroll animations
function createScrollObserver(callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observerOptions = { ...defaultOptions, ...options }

  return new IntersectionObserver(callback, observerOptions)
}

// Random number generator
function random(min, max) {
  return Math.random() * (max - min) + min
}

// Random integer generator
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Clamp number between min and max
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max)
}

// Linear interpolation
function lerp(start, end, factor) {
  return start + (end - start) * factor
}

// Map value from one range to another
function map(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}

// Get mouse position relative to element
function getMousePos(event, element) {
  const rect = element.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

// Format date
function formatDate(date, options = {}) {
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  const formatOptions = { ...defaultOptions, ...options }
  return new Intl.DateTimeFormat("en-US", formatOptions).format(new Date(date))
}

// Validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Get scroll percentage
function getScrollPercentage() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  return (scrollTop / scrollHeight) * 100
}

// Preload images
function preloadImages(urls) {
  return Promise.all(
    urls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = url
      })
    }),
  )
}

// Local storage helpers
const storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  },

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return defaultValue
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  },
}

// Cookie helpers
const cookies = {
  set(name, value, days = 7) {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  },

  get(name) {
    const nameEQ = name + "="
    const ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === " ") c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  },

  remove(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  },
}

// Device detection
const device = {
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  },

  isTablet() {
    return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent)
  },

  isDesktop() {
    return !this.isMobile() && !this.isTablet()
  },

  hasTouch() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0
  },
}

// Performance helpers
const perf = {
  measure(name, fn) {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
    return result
  },

  debounceRAF(fn) {
    let rafId
    return function (...args) {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(() => fn.apply(this, args))
    }
  },
}

// Animation helpers
const anim = {
  fadeIn(element, duration = 300) {
    element.style.opacity = "0"
    element.style.display = "block"

    const start = performance.now()

    function animate(currentTime) {
      const elapsed = currentTime - start
      const progress = Math.min(elapsed / duration, 1)

      element.style.opacity = progress

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  },

  fadeOut(element, duration = 300) {
    const start = performance.now()
    const startOpacity = Number.parseFloat(getComputedStyle(element).opacity)

    function animate(currentTime) {
      const elapsed = currentTime - start
      const progress = Math.min(elapsed / duration, 1)

      element.style.opacity = startOpacity * (1 - progress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        element.style.display = "none"
      }
    }

    requestAnimationFrame(animate)
  },

  slideUp(element, duration = 300) {
    const height = element.offsetHeight
    element.style.height = height + "px"
    element.style.overflow = "hidden"

    const start = performance.now()

    function animate(currentTime) {
      const elapsed = currentTime - start
      const progress = Math.min(elapsed / duration, 1)

      element.style.height = height * (1 - progress) + "px"

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        element.style.display = "none"
        element.style.height = ""
        element.style.overflow = ""
      }
    }

    requestAnimationFrame(animate)
  },

  slideDown(element, duration = 300) {
    element.style.display = "block"
    const height = element.scrollHeight
    element.style.height = "0px"
    element.style.overflow = "hidden"

    const start = performance.now()

    function animate(currentTime) {
      const elapsed = currentTime - start
      const progress = Math.min(elapsed / duration, 1)

      element.style.height = height * progress + "px"

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        element.style.height = ""
        element.style.overflow = ""
      }
    }

    requestAnimationFrame(animate)
  },
}

// Export utilities for use in other scripts
window.utils = {
  debounce,
  throttle,
  smoothScrollTo,
  isInViewport,
  createScrollObserver,
  random,
  randomInt,
  clamp,
  lerp,
  map,
  getMousePos,
  formatDate,
  isValidEmail,
  getScrollPercentage,
  preloadImages,
  storage,
  cookies,
  device,
  perf,
  anim,
}
