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
    audio: "/text-to-voice",
    stream: "/text-to-voice/stream",
    data: "/text-to-voice/data",
  },
} as const;
