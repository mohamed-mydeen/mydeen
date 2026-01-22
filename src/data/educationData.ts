export interface EducationType {
  period: string;
  title: string;
  organization: string;
  description: string;
  icon: string;
  achievements?: string[];
}

export const educationData: EducationType[] = [
  {
    period: "2023 - Present",
    title: "BTech in Computer Science and Business Systems",
    organization: "Francis xavier Engineering College",
    description: "Pursuing a comprehensive computer science degree with focus on software engineering, artificial intelligence, and data structures & algorithms.",
    icon: "https://https://www.francisxavier.ac.in//C:/Users/moham/OneDrive/Desktop/project/src/assets/images/unnamed.jpg",

    
  },
  {
    period: "2021-2023",
    title: "SSLC | HSC ",
    organization: "Time Matric High Sec School",
    description: "Completed My HSC with 83.17 %  . Continuously enhancing my academic knowledge and technical skills. ",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    achievements: [
      "I was Recognized as Best Student (2022-2023)",
    ]
  },
  {
    period: "1 Month",
    title: "Fullstack Developement Intern",
    organization: "IPCS global TVL.",
    description: "Working on developing and maintaining web applications using Python, Streamlit, and MySQL. Collaborating with cross-functional teams to deliver high-quality products.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    achievements: [
      "Developed a Software Product",
      
      
    ]
  },
  {
    period: "2 Month",
    title: "Fullstack Developement Intern",
    organization: "Asta Solution",
    description: "Working on developing and maintaining web applications using Java Springboot,Reactjs,nodejs and CSS, and MySQL. Collaborating with cross-functional teams to deliver high-quality products.",
    icon: "🎓",
    achievements: [
      "Developed a Software Product",
      "Implemented responsive design patterns reducing page load time by 40%",
      
    ]
  },
];
