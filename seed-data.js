import mongoose from "mongoose"
import dotenv from "dotenv"
import Project from "./models/Project.js"
import Skill from "./models/Skill.js"
import User from "./models/User.js"

// Load environment variables
dotenv.config()

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  })

// Sample projects data
const projectsData = [
  {
    title: "E-commerce Platform",
    description: "A full-featured online store with product management, cart functionality, and payment processing.",
    longDescription:
      "This e-commerce platform provides a complete solution for online stores. It includes features such as product catalog management, shopping cart functionality, user authentication, order processing, and integration with Stripe for payment processing. The application is built with Next.js for the frontend, providing a fast and SEO-friendly user experience. The backend is powered by Node.js and Express, with MongoDB as the database for storing product information, user data, and order details.",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "/placeholder.svg?height=300&width=500",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: [
      "User authentication and profile management",
      "Product catalog with categories and search functionality",
      "Shopping cart and checkout process",
      "Payment processing with Stripe",
      "Order history and tracking",
      "Admin dashboard for managing products and orders",
    ],
    technologies: [
      "Next.js for frontend",
      "Node.js and Express for backend",
      "MongoDB for database",
      "Stripe for payment processing",
      "Tailwind CSS for styling",
      "JWT for authentication",
    ],
    featured: true,
    order: 1,
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team workspaces.",
    longDescription:
      "This task management application allows teams to collaborate on projects by creating and assigning tasks, setting deadlines, and tracking progress. The application features real-time updates using Socket.io, so team members can see changes as they happen without refreshing the page. Users can create workspaces for different projects, invite team members, and organize tasks using boards, lists, and cards similar to Trello.",
    tags: ["React", "Express", "Socket.io", "MongoDB"],
    imageUrl: "/placeholder.svg?height=300&width=500",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: [
      "User authentication and team management",
      "Project workspaces and boards",
      "Task creation, assignment, and tracking",
      "Real-time updates and notifications",
      "Deadline reminders and calendar view",
      "File attachments and comments on tasks",
    ],
    technologies: [
      "React for frontend",
      "Express for backend API",
      "Socket.io for real-time communication",
      "MongoDB for database",
      "JWT for authentication",
      "AWS S3 for file storage",
    ],
    featured: true,
    order: 2,
  },
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website built with modern web technologies.",
    longDescription:
      "This portfolio website showcases my skills, projects, and experience as a developer. It features a clean and modern design with smooth animations powered by Framer Motion. The website is fully responsive and optimized for all devices. It includes sections for about me, skills, projects, and contact information. The project section displays my work with detailed descriptions, technologies used, and links to live demos and source code.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    imageUrl: "/placeholder.svg?height=300&width=500",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: [
      "Responsive design for all devices",
      "Smooth page transitions and animations",
      "Project showcase with filtering options",
      "Contact form with validation",
      "Dark mode support",
      "Blog section for sharing insights and tutorials",
      "SEO optimization for better visibility",
    ],
    technologies: [
      "Next.js for frontend",
      "Tailwind CSS for styling",
      "Framer Motion for animations",
      "React Hook Form for form handling",
      "Vercel for deployment",
      "MDX for blog content",
    ],
    featured: true,
    order: 3,
  },
  {
    title: "Weather Dashboard",
    description: "A weather application that provides real-time weather data and forecasts for locations worldwide.",
    longDescription:
      "This weather dashboard provides users with real-time weather information and forecasts for locations around the world. Users can search for cities and view current weather conditions, hourly forecasts, and 7-day forecasts. The application visualizes weather data using Chart.js, making it easy to understand temperature trends, precipitation chances, and wind patterns. The dashboard also includes features such as saving favorite locations, viewing historical weather data, and receiving weather alerts.",
    tags: ["React", "OpenWeather API", "Chart.js"],
    imageUrl: "/placeholder.svg?height=300&width=500",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: [
      "Location search with autocomplete",
      "Current weather conditions display",
      "Hourly and 7-day forecasts",
      "Interactive weather charts and graphs",
      "Favorite locations saving",
      "Weather alerts and notifications",
      "Responsive design for all devices",
    ],
    technologies: [
      "React for frontend",
      "OpenWeather API for weather data",
      "Chart.js for data visualization",
      "Geolocation API for current location",
      "Local Storage for saving preferences",
      "CSS Modules for styling",
    ],
    featured: false,
    order: 4,
  },
]

// Sample skills data
const skillsData = [
  // Frontend skills
  { name: "JavaScript", category: "frontend", level: 5, order: 1 },
  { name: "TypeScript", category: "frontend", level: 4, order: 2 },
  { name: "React", category: "frontend", level: 5, order: 3 },
  { name: "Next.js", category: "frontend", level: 4, order: 4 },
  { name: "HTML5", category: "frontend", level: 5, order: 5 },
  { name: "CSS3", category: "frontend", level: 5, order: 6 },
  { name: "Tailwind CSS", category: "frontend", level: 4, order: 7 },
  { name: "Redux", category: "frontend", level: 4, order: 8 },
  { name: "Vue.js", category: "frontend", level: 3, order: 9 },

  // Backend skills
  { name: "Node.js", category: "backend", level: 4, order: 1 },
  { name: "Express", category: "backend", level: 4, order: 2 },
  { name: "RESTful APIs", category: "backend", level: 5, order: 3 },
  { name: "GraphQL", category: "backend", level: 3, order: 4 },
  { name: "Python", category: "backend", level: 3, order: 5 },
  { name: "Django", category: "backend", level: 2, order: 6 },

  // Database skills
  { name: "MongoDB", category: "database", level: 4, order: 1 },
  { name: "PostgreSQL", category: "database", level: 3, order: 2 },
  { name: "MySQL", category: "database", level: 3, order: 3 },
  { name: "Redis", category: "database", level: 2, order: 4 },

  // DevOps skills
  { name: "Git", category: "devops", level: 4, order: 1 },
  { name: "Docker", category: "devops", level: 3, order: 2 },
  { name: "AWS", category: "devops", level: 3, order: 3 },
  { name: "CI/CD", category: "devops", level: 3, order: 4 },
  { name: "Vercel", category: "devops", level: 4, order: 5 },

  // Tools and other skills
  { name: "Figma", category: "tools", level: 3, order: 1 },
  { name: "Jest", category: "tools", level: 3, order: 2 },
  { name: "Cypress", category: "tools", level: 3, order: 3 },
  { name: "Webpack", category: "tools", level: 3, order: 4 },
]

// Sample admin user
const adminUser = {
  username: "admin",
  email: "admin@example.com",
  password: "password123",
  role: "admin",
}

// Function to seed the database
async function seedDatabase() {
  try {
    // Clear existing data
    await Project.deleteMany({})
    await Skill.deleteMany({})

    // Insert new data
    await Project.insertMany(projectsData)
    await Skill.insertMany(skillsData)

    // Check if admin user exists
    const existingAdmin = await User.findOne({ email: adminUser.email })

    if (!existingAdmin) {
      // Create admin user
      const newAdmin = new User(adminUser)
      await newAdmin.save()
      console.log("Admin user created")
    }

    console.log("Database seeded successfully")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

// Run the seed function
seedDatabase()

