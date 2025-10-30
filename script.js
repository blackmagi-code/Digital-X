// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navbar = document.getElementById("navbar")
  const navLinks = document.querySelectorAll(".nav-link")

  const authLinks = document.getElementById("auth-links")
  const profileMenu = document.getElementById("profile-menu")
  const profileName = document.getElementById("profile-name")
  const logoutBtn = document.getElementById("logout-btn")

  // Check authentication status on page load
  checkAuthStatus()

  function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem("digitalx_user") || "null")
    if (user) {
      showUserProfile(user)
    } else {
      showAuthLinks()
    }
  }

  function showUserProfile(user) {
    if (authLinks) authLinks.style.display = "none"
    if (profileMenu) {
      profileMenu.style.display = "block"
      if (profileName) profileName.textContent = user.name || user.email
    }
  }

  function showAuthLinks() {
    if (authLinks) authLinks.style.display = "flex"
    if (profileMenu) profileMenu.style.display = "none"
  }

  // Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("digitalx_user")
      localStorage.removeItem("digitalx_token")
      showAuthLinks()
      window.location.href = "index.html"
    })
  }

  // Profile tab switching
  const sidebarItems = document.querySelectorAll(".sidebar-item")
  const tabContents = document.querySelectorAll(".tab-content")

  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tabName = item.getAttribute("data-tab")

      // Remove active class from all sidebar items and tab contents
      sidebarItems.forEach((si) => si.classList.remove("active"))
      tabContents.forEach((tc) => tc.classList.remove("active"))

      // Add active class to clicked item and corresponding tab
      item.classList.add("active")
      const targetTab = document.getElementById(`${tabName}-tab`)
      if (targetTab) targetTab.classList.add("active")
    })
  })

  // Copy to clipboard function
  window.copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Show success message
      const btn = event.target.closest("button")
      const originalHTML = btn.innerHTML
      btn.innerHTML = '<i class="fas fa-check"></i>'
      btn.style.color = "#10b981"

      setTimeout(() => {
        btn.innerHTML = originalHTML
        btn.style.color = ""
      }, 2000)
    })
  }

  // Profile form submissions
  const personalInfoForm = document.getElementById("personal-info-form")
  const passwordForm = document.getElementById("password-form")

  if (personalInfoForm) {
    personalInfoForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Simulate form submission
      const submitBtn = e.target.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Saving..."
      submitBtn.disabled = true

      setTimeout(() => {
        submitBtn.textContent = "Saved!"
        submitBtn.style.background = "linear-gradient(45deg, #10b981, #059669)"

        setTimeout(() => {
          submitBtn.textContent = originalText
          submitBtn.disabled = false
          submitBtn.style.background = ""
        }, 2000)
      }, 1500)
    })
  }

  if (passwordForm) {
    passwordForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Simulate password update
      const submitBtn = e.target.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Updating..."
      submitBtn.disabled = true

      setTimeout(() => {
        submitBtn.textContent = "Password Updated!"
        submitBtn.style.background = "linear-gradient(45deg, #10b981, #059669)"

        setTimeout(() => {
          submitBtn.textContent = originalText
          submitBtn.disabled = false
          submitBtn.style.background = ""
          passwordForm.reset()
        }, 2000)
      }, 1500)
    })
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")

      // Update aria-expanded attribute
      const isExpanded = navMenu.classList.contains("active")
      navToggle.setAttribute("aria-expanded", isExpanded)
    })

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
        navToggle.setAttribute("aria-expanded", "false")
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
        navToggle.setAttribute("aria-expanded", "false")
      }
    })
  }

  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollToTopBtn.className = "scroll-to-top"
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top")
  document.body.appendChild(scrollToTopBtn)

  const progressBar = document.createElement("div")
  progressBar.className = "page-progress"
  document.body.appendChild(progressBar)

  const cookieBanner = document.createElement("div")
  cookieBanner.className = "cookie-banner"
  cookieBanner.innerHTML = `
    <div class="cookie-content">
      <div class="cookie-text">
        <i class="fas fa-cookie-bite"></i>
        <span>We use cookies to enhance your browsing experience and analyze our traffic.</span>
      </div>
      <div class="cookie-actions">
        <button class="btn-cookie accept">Accept</button>
        <button class="btn-cookie decline">Decline</button>
      </div>
    </div>
  `
  document.body.appendChild(cookieBanner)

  function initTooltips() {
    const tooltipElements = document.querySelectorAll("[data-tooltip]")
    tooltipElements.forEach((element) => {
      const tooltip = document.createElement("div")
      tooltip.className = "tooltip"
      tooltip.textContent = element.getAttribute("data-tooltip")
      document.body.appendChild(tooltip)

      element.addEventListener("mouseenter", (e) => {
        const rect = element.getBoundingClientRect()
        tooltip.style.left = rect.left + rect.width / 2 + "px"
        tooltip.style.top = rect.top - 40 + "px"
        tooltip.classList.add("tooltip-visible")
      })

      element.addEventListener("mouseleave", () => {
        tooltip.classList.remove("tooltip-visible")
      })
    })
  }

  const userPreferences = {
    get: (key) => {
      try {
        return JSON.parse(localStorage.getItem(`digitalx_${key}`))
      } catch {
        return null
      }
    },
    set: (key, value) => {
      try {
        localStorage.setItem(`digitalx_${key}`, JSON.stringify(value))
      } catch {
        console.warn("Unable to save to localStorage")
      }
    },
  }

  function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="/"]:not([href^="//"]), a[href$=".html"]')
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        if (link.hostname === window.location.hostname) {
          e.preventDefault()
          document.body.classList.add("page-transition")
          setTimeout(() => {
            window.location.href = link.href
          }, 300)
        }
      })
    })
  }

  // Mobile menu toggle
  // navToggle.addEventListener("click", () => {
  //   navMenu.classList.toggle("active")
  //   navToggle.classList.toggle("active")
  // })

  // Close mobile menu when clicking on a link
  // navLinks.forEach((link) => {
  //   link.addEventListener("click", () => {
  //     navMenu.classList.remove("active")
  //     navToggle.classList.remove("active")
  //   })
  // })

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = (scrolled / maxScroll) * 100

    // Update progress bar
    progressBar.style.width = scrollProgress + "%"

    // Navbar scroll effect
    if (scrolled > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Scroll to top button visibility
    if (scrolled > 300) {
      scrollToTopBtn.classList.add("visible")
    } else {
      scrollToTopBtn.classList.remove("visible")
    }
  })

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // If it's a hash link (same page), use smooth scrolling
      if (href.startsWith("#")) {
        e.preventDefault()
        const targetSection = document.querySelector(href)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
      // Otherwise, let the browser handle the page navigation
    })
  })

  function createParticles() {
    const particlesContainer = document.getElementById("particles")
    if (!particlesContainer) return

    const particleCount = window.innerWidth < 768 ? 25 : 50 // Reduce particles on mobile

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      // Random size between 2-6px
      const size = Math.random() * 4 + 2
      particle.style.width = size + "px"
      particle.style.height = size + "px"

      // Random position
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"

      // Random animation delay
      particle.style.animationDelay = Math.random() * 6 + "s"
      particle.style.animationDuration = Math.random() * 4 + 4 + "s"

      particlesContainer.appendChild(particle)
    }
  }

  createParticles()

  function initCookieBanner() {
    const cookieConsent = userPreferences.get("cookieConsent")

    if (cookieConsent === null) {
      setTimeout(() => {
        cookieBanner.classList.add("visible")
      }, 2000)
    }

    cookieBanner.querySelector(".accept").addEventListener("click", () => {
      userPreferences.set("cookieConsent", true)
      cookieBanner.classList.remove("visible")
    })

    cookieBanner.querySelector(".decline").addEventListener("click", () => {
      userPreferences.set("cookieConsent", false)
      cookieBanner.classList.remove("visible")
    })
  }

  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    const formFields = {
      name: contactForm.querySelector("#name"),
      email: contactForm.querySelector("#email"),
      subject: contactForm.querySelector("#subject"),
      message: contactForm.querySelector("#message"),
    }
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalButtonText = submitButton.innerHTML

    // Create success message element
    const successMessage = document.createElement("div")
    successMessage.className = "form-success-message"
    successMessage.innerHTML = `
      <div class="success-content">
        <i class="fas fa-check-circle"></i>
        <h4>Message Sent Successfully!</h4>
        <p>Thank you for your message. We'll get back to you within 24 hours.</p>
      </div>
    `
    successMessage.style.display = "none"
    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling)

    // Real-time validation functions
    function validateField(field, validationFn, errorMessage) {
      const isValid = validationFn(field.value.trim())
      const formGroup = field.closest(".form-group")

      // Remove existing error message
      const existingError = formGroup.querySelector(".field-error")
      if (existingError) {
        existingError.remove()
      }

      // Remove existing validation classes
      field.classList.remove("field-valid", "field-invalid")

      if (field.value.trim() === "") {
        // Empty field - neutral state
        return true
      } else if (isValid) {
        // Valid field
        field.classList.add("field-valid")
        return true
      } else {
        // Invalid field
        field.classList.add("field-invalid")
        const errorDiv = document.createElement("div")
        errorDiv.className = "field-error"
        errorDiv.textContent = errorMessage
        formGroup.appendChild(errorDiv)
        return false
      }
    }

    function validateName(name) {
      return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name)
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    function validateSubject(subject) {
      return subject.length >= 3
    }

    function validateMessage(message) {
      return message.length >= 10
    }

    // Add real-time validation listeners
    formFields.name.addEventListener("blur", () => {
      validateField(formFields.name, validateName, "Name must be at least 2 characters and contain only letters")
    })

    formFields.email.addEventListener("blur", () => {
      validateField(formFields.email, validateEmail, "Please enter a valid email address")
    })

    formFields.subject.addEventListener("blur", () => {
      validateField(formFields.subject, validateSubject, "Subject must be at least 3 characters long")
    })

    formFields.message.addEventListener("blur", () => {
      validateField(formFields.message, validateMessage, "Message must be at least 10 characters long")
    })

    // Form submission with enhanced UX
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Validate all fields
      const validations = [
        validateField(formFields.name, validateName, "Name must be at least 2 characters and contain only letters"),
        validateField(formFields.email, validateEmail, "Please enter a valid email address"),
        validateField(formFields.subject, validateSubject, "Subject must be at least 3 characters long"),
        validateField(formFields.message, validateMessage, "Message must be at least 10 characters long"),
      ]

      // Check if any field is empty
      const emptyFields = Object.values(formFields).filter((field) => !field.value.trim())
      if (emptyFields.length > 0) {
        emptyFields.forEach((field) => {
          field.classList.add("field-invalid")
          const formGroup = field.closest(".form-group")
          if (!formGroup.querySelector(".field-error")) {
            const errorDiv = document.createElement("div")
            errorDiv.className = "field-error"
            errorDiv.textContent = "This field is required"
            formGroup.appendChild(errorDiv)
          }
        })
        return
      }

      // Check if all validations passed
      if (!validations.every(Boolean)) {
        return
      }

      // Show loading state
      submitButton.disabled = true
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitButton.classList.add("btn-loading")

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Show success state
        contactForm.style.display = "none"
        successMessage.style.display = "block"

        // Reset form after delay
        setTimeout(() => {
          contactForm.reset()
          Object.values(formFields).forEach((field) => {
            field.classList.remove("field-valid", "field-invalid")
          })
          document.querySelectorAll(".field-error").forEach((error) => error.remove())

          submitButton.disabled = false
          submitButton.innerHTML = originalButtonText
          submitButton.classList.remove("btn-loading")

          contactForm.style.display = "block"
          successMessage.style.display = "none"
        }, 5000)
      } catch (error) {
        // Show error state
        submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Try Again'
        submitButton.classList.add("btn-error")

        setTimeout(() => {
          submitButton.disabled = false
          submitButton.innerHTML = originalButtonText
          submitButton.classList.remove("btn-loading", "btn-error")
        }, 3000)
      }
    })
  }

  // Add hover effects to cards
  const cards = document.querySelectorAll(".service-card, .resource-card, .benefit-card, .contact-item")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all sections for scroll animations
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(section)
  })

  // Button click effects
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  const style = document.createElement("style")
  style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        /* Form validation styles */
        .field-valid {
            border-color: #10b981 !important;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
        }

        .field-invalid {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }

        .field-error {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 8px;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .field-error::before {
            content: "⚠";
            font-size: 0.75rem;
        }

        /* Button states */
        .btn-loading {
            background: linear-gradient(45deg, #6b7280, #4b5563) !important;
            cursor: not-allowed;
        }

        .btn-error {
            background: linear-gradient(45deg, #ef4444, #dc2626) !important;
        }

        /* Success message */
        .form-success-message {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            backdrop-filter: blur(10px);
            margin-top: 20px;
        }

        .success-content i {
            font-size: 3rem;
            color: #10b981;
            margin-bottom: 16px;
        }

        .success-content h4 {
            color: #10b981;
            font-size: 1.5rem;
            margin-bottom: 8px;
        }

        .success-content p {
            color: #d1d5db;
            font-size: 1rem;
        }

        /* Form field focus improvements */
        .form-group input:focus,
        .form-group textarea:focus {
            transform: translateY(-2px);
        }

        /* Loading spinner animation */
        .fa-spinner {
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* Scroll to top button */
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #10b981, #059669);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
        }

        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .scroll-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 25px rgba(16, 185, 129, 0.4);
        }

        /* Page progress bar */
        .page-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(45deg, #10b981, #34d399);
            z-index: 1001;
            transition: width 0.1s ease;
        }

        /* Cookie banner */
        .cookie-banner {
            position: fixed;
            bottom: -100px;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            border-top: 1px solid rgba(16, 185, 129, 0.2);
            padding: 20px;
            z-index: 1000;
            transition: bottom 0.3s ease;
        }

        .cookie-banner.visible {
            bottom: 0;
        }

        .cookie-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }

        .cookie-text {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #d1d5db;
        }

        .cookie-text i {
            color: #10b981;
            font-size: 1.5rem;
        }

        .cookie-actions {
            display: flex;
            gap: 12px;
        }

        .btn-cookie {
            padding: 8px 20px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-cookie.accept {
            background: linear-gradient(45deg, #10b981, #059669);
            color: white;
        }

        .btn-cookie.decline {
            background: transparent;
            color: #9ca3af;
            border: 1px solid #374151;
        }

        .btn-cookie:hover {
            transform: translateY(-2px);
        }

        /* Tooltips */
        .tooltip {
            position: absolute;
            background: rgba(15, 23, 42, 0.95);
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.875rem;
            opacity: 0;
            visibility: hidden;
            transform: translateX(-50%) translateY(-5px);
            transition: all 0.3s ease;
            z-index: 1000;
            pointer-events: none;
            border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .tooltip-visible {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0);
        }

        /* Page transitions */
        .page-transition {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
            .cookie-content {
                flex-direction: column;
                text-align: center;
            }

            .scroll-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `
  document.head.appendChild(style)

  // Parallax effect for floating shapes
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const shapes = document.querySelectorAll(".floating-shape")

    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1
      const yPos = -(scrolled * speed)
      shape.style.transform = `translateY(${yPos}px)`
    })
  })

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Animate hero content
    const heroContent = document.querySelector(".hero-content")
    if (heroContent) {
      heroContent.style.opacity = "0"
      heroContent.style.transform = "translateY(50px)"

      setTimeout(() => {
        heroContent.style.transition = "opacity 1s ease, transform 1s ease"
        heroContent.style.opacity = "1"
        heroContent.style.transform = "translateY(0)"
      }, 300)
    }
  })

  initTooltips()
  initCookieBanner()
  initPageTransitions()
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Performance optimization for scroll events
const optimizedScroll = debounce(() => {
  // Scroll-based animations can be added here
}, 10)

window.addEventListener("scroll", optimizedScroll)
