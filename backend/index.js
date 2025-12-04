const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const members = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Frontend Developer",
    skills: ["React", "JavaScript", "CSS"],
    location: "Delhi, India",
    bio: "Passionate about building pixel-perfect UIs and smooth user experiences.",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww"
  },
  {
    id: 2,
    name: "Sara Khan",
    role: "Backend Developer",
    skills: ["Node.js", "Express", "MongoDB"],
    location: "Mumbai, India",
    bio: "Loves designing scalable APIs and solving performance bottlenecks.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww"
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Mobile Developer",
    skills: ["Flutter", "Firebase"],
    location: "Bengaluru, India",
    bio: "Bringing ideas to life on small screens with beautiful mobile apps.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    name: "Ananya Gupta",
    role: "Designer",
    skills: ["Figma", "UI/UX", "Illustration"],
    location: "Pune, India",
    bio: "Design-first mindset with a love for clean and minimal interfaces.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww"
  },
  {
  id: 5,
  name: "Vikram Mehta",
  role: "AI/ML Engineer",
  skills: ["Python", "TensorFlow", "Machine Learning"],
  location: "Hyderabad, India",
  bio: "Turning data into meaningful predictions — one model at a time.",
  photo: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=600&auto=format&fit=crop&q=60"
},
{
  id: 6,
  name: "Priya Das",
  role: "Cloud Engineer",
  skills: ["AWS", "Docker", "Kubernetes"],
  location: "Kolkata, India",
  bio: "On a mission to make deployments smoother than butter 🧈",
  photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  id: 7,
  name: "Neeraj Patel",
  role: "Full Stack Developer",
  skills: ["JavaScript", "Node.js", "React"],
  location: "Ahmedabad, India",
  bio: "From backend logic to frontend magic — I build it all.",
  photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=60"
},
{
  id: 8,
  name: "Ishita Rao",
  role: "Data Analyst",
  skills: ["SQL", "Power BI", "Python"],
  location: "Chennai, India",
  bio: "Love finding stories hidden inside rows and columns 📊",
  photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&auto=format&fit=crop&q=60"
}

];

// Simple health check route
app.get("/", (req, res) => {
  res.send("GDGC Members API is running 🚀");
});

// GET /members – all members
app.get("/members", (req, res) => {
  res.json(members);
});

// GET /members/:id – one member
app.get("/members/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const member = members.find((m) => m.id === id);

  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }

  res.json(member);
});

// Start server
app.listen(PORT, () => {
  console.log(`GDGC Members API running on http://localhost:${PORT}`);
});
