import { type NextPage } from "next"
import { useEffect, useRef, useState } from "react"
// import Waveform from "~/components/Wavefrom"
// import useAudioContext from "~/hooks/useAudioContext"

const log = true

let audioContext: AudioContext
let analyser: AnalyserNode
let stream: MediaStream
let source: MediaStreamAudioSourceNode
const bufferArray: Uint8Array = new Uint8Array(2048)
let frameId: number

const Home: NextPage = () => {
  const [buffer, setBuffer] = useState<number>(0)

  // Initialize audioContext
  useEffect(() => {
    if (audioContext || analyser) return
    audioContext = new AudioContext()
    analyser = audioContext.createAnalyser()
    initAnalyserParams(analyser)

    log && console.log(audioContext, analyser, "audioContext present")

    return () => {
      if (audioContext)
        audioContext
          .close()
          .then(() => console.log("audioContext closed"))
          .catch(() => console.log("something went wrong"))
    }
  }, [])

  // Get Canvas
  // todo

  // Start MicStream
  const startStream = async (): Promise<void> => {
    if (stream && source) return
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)
      log && console.log("started", source, stream)

      if (audioContext && analyser) draw()
      function draw(): void {
        frameId = requestAnimationFrame(draw)
        analyser.getByteTimeDomainData(bufferArray)
        setBuffer(bufferArray.reduce((a, b) => a + b))
        log && console.log(bufferArray.reduce((a, b) => a + b))
      }
    } catch (error) {
      console.log(error)
    }

    return
  }

  return (
    <div>
      <h1>AudioContext</h1>
      <button
        className="border-2 rounded-md p-2 text-lg"
        onClick={void startStream}
      >
        Start Stream
      </button>
      <p>{buffer}</p>
    </div>
  )
}

export default Home

function initAnalyserParams(analyser: AnalyserNode): void {
  analyser.minDecibels = -100
  analyser.maxDecibels = -10
  analyser.smoothingTimeConstant = 0.85
}
