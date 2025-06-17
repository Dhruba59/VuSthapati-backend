// Base API URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Generic fetch function with error handling
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      // Add cache: 'no-store' for dynamic data that changes frequently
      // or use { next: { revalidate: 60 } } to revalidate every 60 seconds
      cache: "no-store",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "An error occurred")
    }

    return await response.json()
  } catch (error) {
    console.error(`API error for ${url}:`, error)
    throw error
  }
}

// Projects API
export const projectsAPI = {
  // Get all projects
  getAll: async () => {
    return fetchAPI("/projects")
  },

  // Get featured projects
  getFeatured: async () => {
    return fetchAPI("/projects/featured")
  },

  // Get project by ID
  getById: async (id: string) => {
    return fetchAPI(`/projects/${id}`)
  },
}

// News API
export const newsAPI = {
  // Get all news
  getAll: async () => {
    return fetchAPI("/news")
  },

  // Get project by ID
  getById: async (id: string) => {
    return fetchAPI(`/news/${id}`)
  },
}

// Skills API
export const skillsAPI = {
  // Get all skills
  getAll: async () => {
    return fetchAPI("/skills")
  },

  // Get skills by category
  getByCategory: async (category: string) => {
    return fetchAPI(`/skills/category/${category}`)
  },
}

// Contact API
export const contactAPI = {
  // Submit contact form
  submit: async (data: { name: string; email: string; message: string }) => {
    return fetchAPI("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}

// Auth API (for admin panel)
export const authAPI = {
  // Login
  login: async (credentials: { email: string; password: string }) => {
    return fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  // Get current user
  getCurrentUser: async (token: string) => {
    return fetchAPI("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

