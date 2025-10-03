export const mockNetwork = {
  nodes: [
    { id: "user", name: "You", color: "#4285F4" }, // Blue for user
    { id: "alex", name: "Alex", title: "Student", company: "Purdue University", school: "Purdue", degree: 1, color: "#34A853", cluster: "Alumni" },
    { id: "priya", name: "Priya", title: "Analyst", company: "JPMorgan", school: "Purdue", degree: 1, color: "#34A853", cluster: "Alumni" },
    { id: "james", name: "James", title: "Recruiter", company: "Google", school: "Stanford", degree: 2, color: "#FBBC05", cluster: "Recruiter" },
    { id: "hannah", name: "Hannah", title: "Associate", company: "Goldman Sachs", school: "Purdue", degree: 2, color: "#FBBC05", cluster: "Alumni" },
    { id: "david", name: "David", title: "Software Engineer", company: "Facebook", school: "MIT", degree: 3, color: "#EA4335", cluster: "Peer" },
    { id: "maria", name: "Maria", title: "VP", company: "Morgan Stanley", school: "Harvard", degree: 3, color: "#EA4335", cluster: "Mentor" },
  ],
  links: [
    { source: "user", target: "alex" },
    { source: "user", target: "priya" },
    { source: "alex", target: "hannah" },
    { source: "alex", target: "james" },
    { source: "priya", target: "hannah" },
    { source: "james", target: "david" },
    { source: "hannah", target: "maria" },
  ],
};