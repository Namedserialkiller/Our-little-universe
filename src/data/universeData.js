/**
 * =====================================================================
 * 🌌 OUR LITTLE UNIVERSE — CENTRALIZED PERSONALIZATION DATA
 * =====================================================================
 * Everything in this file can be customized without editing any React code.
 * Look for the "✏️ CUSTOMIZE:" tags below to replace placeholders with
 * your personal memories, inside jokes, dates, and love notes.
 * =====================================================================
 */

export const universeData = {
  // ✏️ CUSTOMIZE: Basic Information
  recipientName: "My Khashree", // Her name (e.g., "Elena", "Sophia", "Maya")
  senderName: "Your Kannu",  // Your name or nickname
  relationshipStartDate: "July 25, 2024", // Date you became official or met
  websiteTitle: "Our Little Universe",
  tagline: "A quiet corner in the cosmos made just for you and me.",

  // ✏️ CUSTOMIZE: Distance / Timezone info (perfect for long-distance love)
  longDistanceInfo: {
    enabled: true,
    herCity: "Bengaluru",
    herTimezone: "Asia/Kolkata", // standard timezone
    myCity: "Chennai",
    myTimezone: "Asia/Kolkata",
    distanceKm: "330 km",
    subtext: "Separated by miles, connected under the exact same stars."
  },

  // ✏️ CUSTOMIZE: Opening Experience Text
  intro: {
    line1: "Somewhere in this infinite universe,",
    line2: "there's a little world that belongs to us.",
    buttonText: "Enter our universe",
    ambientMusicPrompt: "Toggle ambient starlight sound"
  },

  // ✏️ CUSTOMIZE: Section A — "Our Beginning"
  beginning: {
    id: "beginning",
    constellationTitle: "The Genesis Star",
    subtitle: "Where our coordinates first crossed",
    date: "July 25, 2024",
    storyParagraphs: [
      "In a world of billions of people moving in every direction, somehow the universe aligned and brought you into my life.",
      "I still remember the first conversation we had. What started as casual messages quickly turned into hours slipping away like minutes. I went to sleep with a smile I hadn't felt, wondering how someone so far away could feel closer than anyone around me.",
      "That was the night our little universe began."
    ],
    highlightQuote: "You didn't just walk into my life; you gently lit up every dark corner of it.",
    // Image placeholder: put an image in public/images/beginning.jpg or use SVG fallback
    image: "/images/beginning.png",
    imageCaption: "The moment everything changed 🌙"
  },

  // ✏️ CUSTOMIZE: Section B — "Little Memories"
  memories: [
    {
      id: "mem-1",
      title: "Our First 6-Hour Call",
      date: "Late July, 2024",
      tag: "Late Nights",
      description: "We swore we'd hang up after 15 minutes. Before we knew it, Madurai had come and we slept for 15 minutes.",
      image: null,
      coordinates: { x: 220, y: 160 },
      starColor: "#A99BFF"
    },
    {
      id: "mem-2",
      title: "The First Embrace",
      date: "October 12, 2024",
      tag: "First Meet",
      description: "Getting off the bus, Seeing you with your scooty and that og scarf of yours.",
      image: "/images/first_meet.jpg",
      coordinates: { x: 190, y: 340 },
      starColor: "#F5DFA5"
    },
    {
      id: "mem-3",
      title: "First Diwali Together",
      date: "October 31, 2024",
      tag: "Diwali",
      description: "My first diwali away from home, but being with you made it feel like I was right at home",
      image: "/images/diwali.jpg",
      coordinates: { x: 280, y: 430 },
      starColor: "#A99BFF"
    },
    {
      id: "mem-4",
      title: "Birthday surprise",
      date: "November 19, 2024",
      tag: "Birthday",
      description: "Least expected. Well executed, I will cherish it for the rest of my life",
      image: "/images/birthday.jpg",
      coordinates: { x: 140, y: 240 },
      starColor: "#F4F1FF"
    }
  ],

  // ✏️ CUSTOMIZE: Section C — "Things I Never Get Tired Of"
  thingsINeverTireOf: [
    {
      id: "tire-1",
      title: "Your texts, calls and everything in between",
      body: "I can't begin to explain how much your texts, calls and everything in between means to me. Its the highlight of my day and the thought of you brightens my entire day",
      icon: "message"
    },
    {
      id: "tire-2",
      title: "Fit pics",
      body: "Everyday you get ready, everyone see you and I don't get to, that picture of your outfit makes my day.",
      icon: "photo"
    },
    {
      id: "tire-3",
      title: "You spoiling me with food",
      body: "Be it my birthday, us meeting up or randomly just because I mentioned I was hungry, you always make sure I'm fed.",
      icon: "food"
    },
    {
      id: "tire-4",
      title: "Random songs you sing",
      body: "I don't know where you learn these songs from, but I love it when you randomly start singing.",
      icon: "music"
    }
  ],

  // ✏️ CUSTOMIZE: Section D — "Our Soundtrack"
  soundtrack: [
    {
      id: "track-1",
      title: "Nee Kavidhaigala",
      artist: "Pradeep Kumar",
      albumArt: "/images/album1.png",
      whyItMatters: "Our song. as it is",
      externalLink: "https://open.spotify.com/track/6R0FwF48PO2BrdZpLeWi42?si=&nd=1&dlsi=32925c27c66d49a2",
      vibe: "Warm, timeless romance"
    },
    {
      id: "track-2",
      title: "Sol",
      artist: "A.R. Rahman",
      albumArt: "/images/album2.png",
      whyItMatters: "This song is you when you were those bharatanatyam costumes, majestic, My queen.",
      externalLink: "https://open.spotify.com/track/6gCbPKTi7fTTI2WnntbnKr?si=da791df24629470f",
      vibe: "Majestic"
    },
    {
      id: "track-3",
      title: "Arz Kiya Hai",
      artist: "Anuv Jain",
      albumArt: "/images/album3.png",
      whyItMatters: "A coward turns to a poet because of you.",
      externalLink: "https://open.spotify.com/track/1bMkimTb47umgNP6xCi4A1?si=a22f8d78a0404c1b",
      vibe: "Poetic"
    },
    {
      id: "track-4",
      title: "Manjal Veyil",
      artist: "Harris Jeyaraj, Hariharan, Vijay & Nakkhul",
      albumArt: "/images/album4.png",
      whyItMatters: "This is me when I leave you at the railways.",
      externalLink: "https://open.spotify.com/track/1HNSUQPFhmGDJyHxyIsYXG?si=cb99a94c5e8e4396",
      vibe: "Euphoric & cinematic"
    }
  ],

  // ✏️ CUSTOMIZE: Section E — "Letters From Me"
  letters: [
    {
      id: "letter-miss",
      sealTitle: "Open when you miss me",
      envelopeColor: "#A99BFF",
      dateMark: "Always Valid",
      previewText: "For the moments when the bed feels too big and the silence is loud...",
      content: [
        "My love,",
        "If you are reading this, it probably means the distance is feeling a little too heavy today. I know how much it hurts when all you want is a hug, to smell my shirt, or to reach out and hold my hand.",
        "Close your eyes right now. Place your hand over your heart. Feel that beat? That's me, holding onto you from across all those miles.",
        "Distance is only a physical measurement. It cannot touch how deeply you are loved, how often you cross my mind, or the promises we've made to each other.",
        "One day soon, our plane tickets will only be one-way. Until then, look up at the moon tonight—we are looking at the exact same sky.",
        "I love you more than every kilometer between us."
      ]
    },
    {
      id: "letter-bad-day",
      sealTitle: "Open when you have a bad day",
      envelopeColor: "#E6A9D1",
      dateMark: "Handle With Care",
      previewText: "Take a deep breath, breathe out, and let me hold this for you...",
      content: [
        "Hey sweetheart,",
        "I am so sorry today was rough on you. Whatever went wrong—whether work was exhausting, people were unkind, or you just feel drained—please remember one thing:",
        "Your worth is not defined by how productive you were today, or how heavy things felt. You are doing the best you can, and I am already so proud of you.",
        "Kick off your shoes, get into your comfiest clothes, drink a glass of water, and let yourself rest. The world can wait. Tomorrow is a brand new sunrise.",
        "You are strong, you are loved, and you never have to carry everything alone. I'm right here with you."
      ]
    },
    {
      id: "letter-sleep",
      sealTitle: "Open when you cannot sleep",
      envelopeColor: "#101A35",
      dateMark: "Midnight Whisper",
      previewText: "For the quiet hours when your thoughts won't turn off...",
      content: [
        "Sweet girl,",
        "It's late, isn't it? The world has gone quiet, but your mind is still racing with thoughts.",
        "I wish I was lying beside you right now, playing with your hair until your eyelids get heavy. Picture my arm wrapped around your waist, pulling you into my chest where you are completely safe.",
        "You don't have to solve tomorrow's worries tonight. Everything you need is already within you. Let your breath slow down.",
        "Inhale peace... exhale tension.",
        "Dream of our future home, the smell of pancakes on Sunday mornings, and our little adventures. Goodnight, my angel."
      ]
    },
    {
      id: "letter-smile",
      sealTitle: "Open when you need a smile",
      envelopeColor: "#F5DFA5",
      dateMark: "Emergency Warmth",
      previewText: "A guaranteed reminder of how silly and lucky I am...",
      content: [
        "Hello my favourite person!",
        "Did you know that sea otters hold hands while sleeping so they don't drift apart? That is literally us, except one of us is across the planet and texting 'wake up baby I found a funny video'.",
        "Also, reminder: you are stuck with me! You already liked my quirks, my terrible jokes, and my endless affection, so there's no return policy on this relationship.",
        "Now do me a favor: smile right now. Yes, right this second. Even a small smirk counts.",
        "There it is. The prettiest view in the universe."
      ]
    },
    {
      id: "letter-doubt",
      sealTitle: "Open when you doubt yourself",
      envelopeColor: "#8E7CC3",
      dateMark: "A Gentle Truth",
      previewText: "When the inner critic tries to speak over your brilliance...",
      content: [
        "My brilliant girl,",
        "Sometimes you look in the mirror and forget just how extraordinary you are. But I see it every single day.",
        "I see your fierce loyalty, your kind heart, your sharp mind, and the courage you show even when you're afraid. You have survived every single hard day you've ever faced, and you came out softer and stronger.",
        "Never dim your light for anyone. You are capable of moving mountains. Believe in yourself the way I believe in you."
      ]
    }
  ],

  // ✏️ CUSTOMIZE: Section F — "Our Future"
  futureDreams: [
    {
      id: "future-1",
      title: "Closing The Distance For Good",
      estimatedDate: "2027",
      status: "In Progress",
      description: "No more tearful goodbyes. Unpacking two lives into one single apartment, sharing one key, and finally waking up together every single morning.",
      icon: "home"
    },
    {
      id: "future-2",
      title: "Night outs in Bengaluru",
      estimatedDate: "Sometime in 2027",
      status: "Dream Destination",
      description: "Long drives with you hugging me from behind.",
      icon: "bike"
    },
    {
      id: "future-3",
      title: "Our Sunday Morning Routine",
      estimatedDate: "Forever",
      status: "Daily Promise",
      description: "Waking up at the smell of tea I make for you, groceries and movie time.",
      icon: "coffee"
    },
    {
      id: "future-4",
      title: "Adopting a Doberman",
      estimatedDate: "Sometime in the future",
      status: "Agreed Rule",
      description: "Taking him on walks, you getting used to the doggo, eventuallu becoming his favourite parent.",
      icon: "paw"
    },
    {
      id: "future-5",
      title: "Growing Old and Wrinkled Together",
      estimatedDate: "Decades Ahead",
      status: "Soul Contract",
      description: "Sitting on our porch in rocking chairs, still holding hands, still laughing at the same silly things we did when we were young.",
      icon: "heart-handshake"
    }
  ],

  // ✏️ CUSTOMIZE: Section 6 — Shooting Star Personal Messages (at least 10 messages)
  shootingStarWishes: [
    "Thinking of you right now, wherever you are in this world.",
    "You are my absolute favorite notification on my phone screen.",
    "Distance means so little when someone means so much.",
    "Every love song makes complete sense now that I know you.",
    "I fall in love with you all over again every time we speak.",
    "Thank you for choosing me every single day.",
    "Counting down every minute until I get to hold you again.",
    "You make this entire chaotic universe feel gentle and safe.",
    "I love you to the moon, through the stars, and all the way back.",
    "Whatever our souls are made of, yours and mine are the same.",
    "You are the best decision I ever made.",
    "My heart found its true home the day you stepped into my life."
  ],

  // ✏️ CUSTOMIZE: Section 7 — Hidden Constellation Secret
  hiddenConstellation: {
    title: "The Heart of Orion",
    hint: "5 secret stardust points are scattered across the universe. Tap them to reveal our bond.",
    totalStars: 5,
    celebrationTitle: "Constellation Discovered",
    specialMessage: "Out of all the stars in this universe, you're still my favourite.",
    recipientPlaceholder: "Nekha Shree" // Her name
  },

  // ✏️ CUSTOMIZE: Section 8 — Final Surprise
  finalSurprise: {
    beaconTitle: "The Celestial Beacon",
    screenTitle: "A Message Kept Close to My Heart",
    introSubtitle: "Press play to hear the words I carry with me every night.",
    messageText: "Thank you for being my anchor across the miles. No matter how many constellations shift or how far apart our cities stand, my universe will always revolve around you.",
    audioVoiceRecording: "/audio/voice-message.wav", // Place your MP3 file in public/audio/voice-message.mp3
    audioRecordingTitle: "Voice Note for You 🌙",
    audioDurationEstimate: "00:21",
    closingSignoff: "Forever & Always Yours,"
  }
};
