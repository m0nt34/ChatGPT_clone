import Bag from "../assets/icons/chatDirectionIcons/Bag";
import Charts from "../assets/icons/chatDirectionIcons/Charts";
import Console from "../assets/icons/chatDirectionIcons/Console";
import Document from "../assets/icons/chatDirectionIcons/Document";
import Eye from "../assets/icons/chatDirectionIcons/Eye";
import FactBox from "../assets/icons/chatDirectionIcons/FactBox";
import GraduateCap from "../assets/icons/chatDirectionIcons/GraduateCap";
import LightBulb from "../assets/icons/chatDirectionIcons/LightBulb";
import Pen from "../assets/icons/chatDirectionIcons/Pen";
import Plain from "../assets/icons/chatDirectionIcons/Plain";
import Search from "../assets/icons/chatDirectionIcons/Search";

export const chatDirection = [
  {
    icon: <Bag/>,
    topics: [
      {
        header: "Outfit ideas for autumn photoshoot",
        message:
          "Suggest trendy outfits for a fall-themed photo session, matching the season and mood.",
      },
      {
        header: "Upload images for style insights",
        message:
          "I will upload my photos, and you can identify style patterns and fashion trends I can explore.",
      },
      {
        header: "Pack for a one-week trip",
        message:
          "I’ll provide a personalized packing checklist based on my travel destination and planned activities.",
      },
      {
        header: "Current handbag trends and top brands",
        message:
          "Can you tell me about the latest handbag trends and recommend popular brands I should check out?",
      },
    ],
  },
  {
    icon: <Charts/>,
    topics: [
      {
        header: "Analyze financial data for business growth",
        message:
          "Can you help me explore sales patterns, identify risks, and spot growth opportunities?",
      },
      {
        header: "Create a chart using provided data",
        message: "Can you create a chart for me using this data?",
      },
      {
        header: "Identify trends from performance reports",
        message:
          "Can you identify trends in my performance reports and help me understand them?",
      },
    ],
  },
  {
    icon: <Console/>,
    topics: [
      {
        header: "Fix bugs in my code",
        message:
          "Can you help me fix bugs in my code and guide me through the debugging process?",
      },
      {
        header: "Optimizing server performance",
        message:
          "Can you suggest ways to optimize my server's performance and improve its speed?",
      },
      {
        header: "Coding practices suggestions",
        message:
          "Can you recommend new coding practices to make my code cleaner and more efficient?",
      },
    ],
  },
  {
    icon: <Document/>,
    topics: [
      {
        header: "Summarize this lengthy report",
        message:
          "Can you help me by summarizing this lengthy report into a brief and easy-to-understand version?",
      },
      {
        header: "Write professional project proposal",
        message:
          "Can you guide me in crafting a well-structured project proposal that presents my ideas clearly?",
      },
      {
        header: "Review document for errors and suggestions",
        message:
          "Can you analyze my document and suggest improvements or corrections?",
      },
      {
        header: "Good CV practices",
        message:
          "Can you provide personalized tips on how to structure my CV to stand out to employers?",
      },
    ],
  },
  {
    icon: <Eye/>,
    topics: [
      {
        header: "review UX design concept",
        message:
          "Can you provide detailed feedback on my design, focusing on user experience improvements?",
      },
      {
        header: "spot mistakes in written content",
        message:
          "Can you review my content and help me identify grammatical errors or unclear sections?",
      },
      {
        header: "improve design project",
        message:
          "Can you give me advice on refining my design to make it more visually appealing and functional?",
      },
    ],
  },
  {
    icon: <FactBox/>,
    topics: [
      {
        header: "Give fun facts about history",
        message:
          "Discover interesting historical facts that can be shared with friends or used in projects.",
      },
      {
        header: "What are some weird science discoveries",
        message:
          "Explore fascinating scientific discoveries that will surprise and amaze.",
      },
    ],
  },
  {
    icon: <GraduateCap/>,
    topics: [
      {
        header: "Understand complex academic concepts",
        message:
          "Break down difficult academic concepts into simpler explanations for better learning.",
      },
      {
        header: "Suggest study tips for exam preparation",
        message:
          "Get practical study tips and strategies to help ace the next exam.",
      },
      {
        header: "examples of practical real-life applications",
        message:
          "Learn how academic knowledge can be applied in real-world situations.",
      },
    ],
  },
  {
    icon: <LightBulb/>,
    topics: [
      {
        header: "Suggest creative project ideas",
        message:
          "Get inspired with innovative project ideas to explore in personal or work life.",
      },
      {
        header: "Suggest motivational quotes for today",
        message:
          "Lift spirits with powerful motivational quotes to start the day on a positive note.",
      },
    ],
  },
  {
    icon: <Pen/>,
    topics: [
      {
        header: "Improve storytelling skills quickly",
        message:
          "Get tips on enhancing storytelling abilities to captivate the audience.",
      },
      {
        header: "Suggest unique blog post ideas",
        message:
          "Receive creative blog post ideas to engage readers and boost content strategy.",
      },
      {
        header: "Edit text for clarity",
        message:
          "Share the text, and it will be edited to improve clarity and readability.",
      },
    ],
  },
  {
    icon: <Plain/>,
    topics: [
      {
        header: "Suggest travel destinations for vacation",
        message:
          "Explore popular and off-the-beaten-path destinations for the upcoming trip.",
      },
      {
        header: "List travel essentials for adventure trip",
        message:
          "Get a list of must-have travel essentials for adventurous getaways.",
      },
      {
        header: "Recommend travel safety tips",
        message:
          "Ensure the travel experience is safe and enjoyable with helpful safety tips.",
      },
    ],
  },
  {
    icon: <Search/>,
    topics: [
      {
        header: "Find quick facts about science",
        message:
          "Get quick, accurate facts about various scientific topics to expand knowledge.",
      },
      {
        header: "Solve general knowledge quiz questions",
        message: "Answer quiz questions and help improve general knowledge.",
      },
    ],
  },
];
