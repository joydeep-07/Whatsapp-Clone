const users = [
  {
    id: 1,
    name: "Virat Kohli",
    email: "virat.kohli@bcci.in",
    about: "King 👑 | Passion. Intensity. Cricket.",
    location: "Delhi, India",
    message: "Hey, did you check the match schedule?",
    originalMessage:
      "Hey, did you check the match schedule for the upcoming series? We need to plan the practice sessions accordingly.",
    profile:
      "https://i.pinimg.com/736x/82/81/e1/8281e186c1de47e78199c5fee86dc0df.jpg",
    isOnline: true,
    isUnread: true,
    isSeen: false,
  },
  {
    id: 2,
    name: "Rohit Sharma",
    email: "rohit.sharma@bcci.in",
    about: "Hitman 🏏 | Calm & composed",
    location: "Mumbai, India",
    message: "Let’s discuss team strategy.",
    originalMessage:
      "Let’s discuss team strategy before the next match. I have a few ideas about the opening combination.",
    profile:
      "https://i.pinimg.com/736x/03/5d/70/035d705b245fb0c1f36e0fbbfd643ba7.jpg",
    isOnline: true,
    isUnread: false,
    isSeen: false,
  },
  {
    id: 3,
    name: "KL Rahul",
    email: "kl.rahul@bcci.in",
    about: "Stay focused. Stay hungry.",
    location: "Bengaluru, India",
    message: "Practice session at 5?",
    originalMessage:
      "Practice session at 5 PM today? Let me know if the timing works for everyone.",
    profile:
      "https://i.pinimg.com/736x/df/51/42/df5142b30ec25991609b95ec14de4117.jpg",
    isOnline: true,
    isUnread: true,
    isSeen: false,
  },
  {
    id: 4,
    name: "Hardik Pandya",
    email: "hardik.pandya@bcci.in",
    about: "All-rounder vibes 💪🔥",
    location: "Baroda, India",
    message: "Gym done 💪",
    originalMessage:
      "Gym done 💪 Feeling good today. Ready for net practice in the evening.",
    profile:
      "https://i.pinimg.com/736x/da/d8/b1/dad8b15f49a796af139ccfd6c41347ff.jpg",
    isOnline: false,
    isUnread: false,
    isSeen: true,
  },
  {
    id: 5,
    name: "Jasprit Bumrah",
    email: "jasprit.bumrah@bcci.in",
    about: "Yorkers > Everything 🎯",
    location: "Ahmedabad, India",
    message: "Bowling felt great today.",
    originalMessage:
      "Bowling felt great today. Worked on my yorkers and slower deliveries.",
    profile:
      "https://i.pinimg.com/736x/69/0f/fe/690ffe07fab9681f211570a2ad51ed18.jpg",
    isOnline: false,
    isUnread: false,
    isSeen: false,
  },
  {
    id: 6,
    name: "Ravindra Jadeja",
    email: "ravindra.jadeja@bcci.in",
    about: "Sir Jadeja ⚔️ Fielding beast",
    location: "Jamnagar, India",
    message: "Fielding drills done.",
    originalMessage:
      "Fielding drills done. Reflex catches were intense but fun.",
    profile: "",
    isOnline: false,
    isUnread: true,
    isSeen: false,
  },
  {
    id: 7,
    name: "Shubman Gill",
    email: "shubman.gill@bcci.in",
    about: "Timing is everything 🏏",
    location: "Chandigarh, India",
    message: "Batting felt smooth today.",
    originalMessage:
      "Batting felt smooth today. Timing the ball really well in the nets.",
    profile:
      "https://i.pinimg.com/736x/d8/82/4e/d8824e19f1501d2e480e7be0f7ff4c07.jpg",
    isOnline: true,
    isUnread: true,
    isSeen: false,
  },
  {
    id: 8,
    name: "Rishabh Pant",
    email: "rishabh.pant@bcci.in",
    about: "Fearless. Fun. Forever smiling 😄",
    location: "Roorkee, India",
    message: "Missed a sitter 😅",
    originalMessage:
      "Missed a sitter 😅 Need to work more on my keeping skills tomorrow.",
    profile: "",
    isOnline: false,
    isUnread: false,
    isSeen: true,
  },
  {
    id: 9,
    name: "Suryakumar Yadav",
    email: "suryakumar.yadav@bcci.in",
    about: "360° shots only 🔥",
    location: "Mumbai, India",
    message: "Trying new shots 🔥",
    originalMessage:
      "Trying new shots 🔥 Experimenting with different angles against spin.",
    profile: "",
    isOnline: true,
    isUnread: true,
    isSeen: false,
  },
  {
    id: 10,
    name: "Shreyas Iyer",
    email: "shreyas.iyer@bcci.in",
    about: "Confidence is the key ✨",
    location: "Mumbai, India",
    message: "All set for tomorrow.",
    originalMessage: "All set for tomorrow. Looking forward to the match.",
    profile:
      "https://i.pinimg.com/736x/57/92/26/579226d8bd177d4da8278d9aa2fbca01.jpg",
    isOnline: true,
    isUnread: false,
    isSeen: true,
  },
  {
    id: 11,
    name: "Mohammed Shami",
    email: "mohammed.shami@bcci.in",
    about: "Swing it both ways 🏏",
    location: "Amroha, India",
    message: "Pitch looks good.",
    originalMessage:
      "Pitch looks good for fast bowlers. Might get some early swing.",
    profile:
      "https://i.pinimg.com/736x/8b/73/0b/8b730b32ac5ed08e9c1e1b4531561873.jpg",
    isOnline: true,
    isUnread: true,
    isSeen: false,
  },
  {
    id: 12,
    name: "Kuldeep Yadav",
    email: "kuldeep.yadav@bcci.in",
    about: "Spin & win 🎯",
    location: "Kanpur, India",
    message: "Working on variations.",
    originalMessage:
      "Working on variations. Trying to improve my googly consistency.",
    profile:
      "https://i.pinimg.com/736x/ea/5f/26/ea5f263a2ad37e1741ae393fe6ab0adb.jpg",
    isOnline: true,
    isUnread: false,
    isSeen: true,
  },
];

export default users;
