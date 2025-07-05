// 3D Animations using Three.js

// Import Three.js
const THREE = window.THREE

class ThreeJSManager {
  constructor() {
    this.scenes = new Map()
    this.renderers = new Map()
    this.cameras = new Map()
    this.animationFrames = new Map()
    this.isInitialized = false
  }

  init() {
    if (this.isInitialized) return

    // Initialize 3D scenes
    this.initHero3D()
    this.initNavLogo()
    this.initFooterLogo()
    this.initParticleBackground()

    this.isInitialized = true
  }

  initHero3D() {
    const container = document.getElementById("hero3D")
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(container.offsetWidth, container.offsetHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Create floating geometric shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.ConeGeometry(0.7, 1.5, 8),
      new THREE.OctahedronGeometry(0.8),
      new THREE.TorusGeometry(0.7, 0.3, 16, 100),
    ]

    const materials = [
      new THREE.MeshPhongMaterial({
        color: 0x6b46c1,
        transparent: true,
        opacity: 0.8,
        shininess: 100,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.7,
        shininess: 100,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.6,
        shininess: 100,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xc084fc,
        transparent: true,
        opacity: 0.5,
        shininess: 100,
      }),
    ]

    const meshes = []

    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = materials[Math.floor(Math.random() * materials.length)]
      const mesh = new THREE.Mesh(geometry, material)

      // Random positioning
      mesh.position.x = (Math.random() - 0.5) * 20
      mesh.position.y = (Math.random() - 0.5) * 15
      mesh.position.z = (Math.random() - 0.5) * 10

      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.y = Math.random() * Math.PI
      mesh.rotation.z = Math.random() * Math.PI

      // Random scale
      const scale = 0.5 + Math.random() * 1.5
      mesh.scale.set(scale, scale, scale)

      scene.add(mesh)
      meshes.push({
        mesh,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: 0.5 + Math.random() * 1.5,
        floatOffset: Math.random() * Math.PI * 2,
      })
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x8b5cf6, 1, 100)
    pointLight.position.set(-5, -5, 5)
    scene.add(pointLight)

    camera.position.z = 10

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = (time) => {
      // Rotate and float meshes
      meshes.forEach((item, index) => {
        const { mesh, rotationSpeed, floatSpeed, floatOffset } = item

        mesh.rotation.x += rotationSpeed.x
        mesh.rotation.y += rotationSpeed.y
        mesh.rotation.z += rotationSpeed.z

        mesh.position.y += Math.sin(time * 0.001 * floatSpeed + floatOffset) * 0.01
      })

      // Camera movement based on mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
      this.animationFrames.set("hero3D", requestAnimationFrame(animate))
    }

    animate(0)

    // Handle resize
    const handleResize = () => {
      camera.aspect = container.offsetWidth / container.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.offsetWidth, container.offsetHeight)
    }

    window.addEventListener("resize", handleResize)

    // Store references
    this.scenes.set("hero3D", scene)
    this.cameras.set("hero3D", camera)
    this.renderers.set("hero3D", renderer)
  }

  initNavLogo() {
    const container = document.getElementById("navLogo")
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(32, 32)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Create FONS logo geometry
    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)
    const material = new THREE.MeshPhongMaterial({
      color: 0x6b46c1,
      shininess: 100,
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    camera.position.z = 2

    // Animation
    const animate = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderer.render(scene, camera)
      this.animationFrames.set("navLogo", requestAnimationFrame(animate))
    }

    animate()

    this.scenes.set("navLogo", scene)
    this.cameras.set("navLogo", camera)
    this.renderers.set("navLogo", renderer)
  }

  initFooterLogo() {
    const container = document.getElementById("footerLogo")
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(32, 32)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Create logo geometry
    const geometry = new THREE.SphereGeometry(0.5, 32, 32)
    const material = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(1, 1, 1)
    scene.add(pointLight)

    camera.position.z = 2

    // Animation
    const animate = (time) => {
      sphere.rotation.x = Math.sin(time * 0.001) * 0.5
      sphere.rotation.y += 0.005

      renderer.render(scene, camera)
      this.animationFrames.set("footerLogo", requestAnimationFrame(animate))
    }

    animate(0)

    this.scenes.set("footerLogo", scene)
    this.cameras.set("footerLogo", camera)
    this.renderers.set("footerLogo", renderer)
  }

  initParticleBackground() {
    // Create particle system for contact page
    const createParticleSystem = (containerId) => {
      const container = document.getElementById(containerId)
      if (!container) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

      renderer.setSize(container.offsetWidth, container.offsetHeight)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      // Particle geometry
      const particleCount = 100
      const particles = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)

      const colorPalette = [
        new THREE.Color(0x6b46c1),
        new THREE.Color(0x8b5cf6),
        new THREE.Color(0xa855f7),
        new THREE.Color(0xc084fc),
      ]

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        positions[i3] = (Math.random() - 0.5) * 20
        positions[i3 + 1] = (Math.random() - 0.5) * 20
        positions[i3 + 2] = (Math.random() - 0.5) * 20

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
        colors[i3] = color.r
        colors[i3 + 1] = color.g
        colors[i3 + 2] = color.b

        sizes[i] = Math.random() * 3 + 1
      }

      particles.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      particles.setAttribute("color", new THREE.BufferAttribute(colors, 3))
      particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

      const particleMaterial = new THREE.PointsMaterial({
        size: 2,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      })

      const particleSystem = new THREE.Points(particles, particleMaterial)
      scene.add(particleSystem)

      camera.position.z = 10

      // Animation
      const animate = (time) => {
        const positions = particleSystem.geometry.attributes.position.array

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3
          positions[i3 + 1] += Math.sin(time * 0.001 + i) * 0.01
        }

        particleSystem.geometry.attributes.position.needsUpdate = true
        particleSystem.rotation.y += 0.002

        renderer.render(scene, camera)
        this.animationFrames.set(containerId, requestAnimationFrame(animate))
      }

      animate(0)

      // Handle resize
      const handleResize = () => {
        camera.aspect = container.offsetWidth / container.offsetHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.offsetWidth, container.offsetHeight)
      }

      window.addEventListener("resize", handleResize)

      this.scenes.set(containerId, scene)
      this.cameras.set(containerId, camera)
      this.renderers.set(containerId, renderer)
    }

    // Initialize for different pages
    createParticleSystem("contactParticles")
  }

  // CSS 3D Transforms for cards
  init3DCards() {
    const cards = document.querySelectorAll(".team-card, .service-card, .portfolio-card")

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
      })
    })
  }

  // Parallax 3D effect for portfolio images
  initParallax3D() {
    const portfolioCards = document.querySelectorAll(".portfolio-card")

    portfolioCards.forEach((card) => {
      const image = card.querySelector(".portfolio-card__image img")
      if (!image) return

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const moveX = ((x - centerX) / centerX) * 20
        const moveY = ((y - centerY) / centerY) * 20

        image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`
      })

      card.addEventListener("mouseleave", () => {
        image.style.transform = "translate(0px, 0px) scale(1)"
      })
    })
  }

  // Cleanup function
  cleanup() {
    // Cancel all animation frames
    this.animationFrames.forEach((frameId, key) => {
      cancelAnimationFrame(frameId)
    })

    // Dispose of renderers
    this.renderers.forEach((renderer, key) => {
      renderer.dispose()
    })

    // Clear maps
    this.scenes.clear()
    this.cameras.clear()
    this.renderers.clear()
    this.animationFrames.clear()

    this.isInitialized = false
  }

  // Pause animations (for performance)
  pause() {
    this.animationFrames.forEach((frameId, key) => {
      cancelAnimationFrame(frameId)
    })
    this.animationFrames.clear()
  }

  // Resume animations
  resume() {
    if (this.isInitialized) {
      this.cleanup()
      this.init()
    }
  }
}

// Initialize 3D manager
const threeJSManager = new ThreeJSManager()

// Export for global use
window.threeJSManager = threeJSManager

// Auto-initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Small delay to ensure all elements are rendered
  setTimeout(() => {
    threeJSManager.init()
    threeJSManager.init3DCards()
    threeJSManager.initParallax3D()
  }, 100)
})

// Handle page visibility for performance
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    threeJSManager.pause()
  } else {
    threeJSManager.resume()
  }
})

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  threeJSManager.cleanup()
})
