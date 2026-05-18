export interface ProjectType {
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

export const projectsData: ProjectType[] = [
  {
    title: "Intelligent Business Card Data Extracter and Manager",
    description: "A comprehensive learning management system with course creation, enrollment, and progress tracking.",
    image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Software",
    technologies: ["Python", "MySQL", "EasyOCR", "Streamlit"],
    github: "https://github.com/M-Mohamed-Mydeen-Shahabudeen/Intelligent-Business-Card-Data-Extractor-and-Manager",
    
  },
  
  {
    title: "Symposium Website",
    description: "Mobile application to track workouts, nutrition, and fitness goals with customizable plans.",
    image: "https://images.pexels.com/photos/4429141/pexels-photo-4429141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "web",
    technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
    github: "https://github.com",
    
  },
  {
    title: "Mydeen's Portfolio",
    description: "A centralized dashboard to control IoT devices, monitor energy usage, and set automation rules.",
    image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "web",
    technologies: ["Reactjs", "TypeScript", "CSS", "JavaScript", "MySQL"],
    
  },
  {
    title: "Music Player Using Data Structures",
    description: "A simple, custom music player application uses Double circular linked list Model.",
    image: "https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Software",
    technologies: ["Python", "Data Structures", "PyGame", "Tkinter"],
    github: "https://github.com/M-Mohamed-Mydeen-Shahabudeen/Music-Player-Using-Double-Linked-List",
    
  },
  {
    title: "Face Detection and Authentication System",
    description: "This project is simple face detection & authentication system using Tkinter for GUI & OpenCV for face detection.",
    image: "https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "AI",
    technologies: ["Python", "OpenCV", "Tkinter","pandas"],
    github: "https://github.com/M-Mohamed-Mydeen-Shahabudeen/Real-time-Face-Detection-and-Authentication-System-Using-OpenCV-",
    
  },
  {
    title: "TNEA-CutOff Checking Portal",
    description: "This project is helps you to check the 12th TNEA Cut  Off Mark and Make use if it ALL The Best.",
    image: "https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "web",
    technologies: ["Python", "OpenCV", "Tkinter","pandas"],
    github: "https://github.com/M-Mohamed-Mydeen-Shahabudeen/TNEA-cutoff-checker",
    demo: "https://tnea-cutoff-checker.vercel.app/"
  },
  {
    title: "Railway Complaint and Feedback Portal ",
    description: "This project is a web-based application that allows users to submit complaints and feedback related to railway services.",
    image: "https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "web",
    technologies: ["Flask", "MySQL", "HTML CSS"],
    github: "https://github.com/M-Mohamed-Mydeen-Shahabudeen/Railway-complains-and-feedback-Portal-using-Flask",
    
  },

];
