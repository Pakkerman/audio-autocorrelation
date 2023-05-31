// import { useEffect, useState } from "react"

// export default function useAudioContext(): [
//   context: AudioContext | null,
//   anaylser: AnalyserNode | null
// ] {
//   const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
//   const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)

//   useEffect(() => {
//     const AudioContext = window.AudioContext
//     const context = new AudioContext()
//     setAudioContext(context)
//     const node = context.createAnalyser()
//     node.minDecibels = -100
//     node.maxDecibels = -10
//     node.smoothingTimeConstant = 0.85
//     setAnalyser(node)
//     const initializeAudioContext = () => {}
//     //   if (!audioContext) {
//     //   initializeAudioContext()
//     // }

//     return () => {
//       if (audioContext) {
//         setAudioContext(null)
//       }
//     }
//   }, [])

//   // if (audioContext != null && source == null) {
//   //   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//   //     setSource(audioContext.createMediaStreamSource(stream))
//   //   })
//   // }
//   // if (source != null && analyser != null) source.connect(analyser)

//   return [audioContext, analyser]
// }
