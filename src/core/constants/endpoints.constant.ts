export const endpoints = {
  orthography: {
    check: "/orthography/check",
  },
  proCon: {
    dicusser: "/pro-con/dicusser",
    stream: "/pro-con/stream",
  },
  transalte: "/translate",
  textToAudio: {
    audio: "/text-to-audio",
    stream: "/text-to-audio/stream",
    data: "/text-to-audio/data",
  },
} as const;
