import { type NextPage } from "next"
import { useRef, useState } from "react"

import Waveform from "~/components/Waveform"
// import useAudioContext from "~/hooks/useAudioContext"

let animationController: number

const Home: NextPage = () => {
  const [start, setStart] = useState<boolean>(false)
  const [oscillatorFrequency, setOscillatorFrequency] = useState<number>(0)

  const audioContextRef = useRef<AudioContext | null>()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioRef = useRef<HTMLMediaElement | null>(null)
  const micSource = useRef<MediaStreamAudioSourceNode | null>(null)
  const analyser = useRef<AnalyserNode | null>(null)

  const startMic = async () => {
    audioContextRef.current = new AudioContext()

    if (!audioContextRef.current) return
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    micSource.current = audioContextRef.current.createMediaStreamSource(stream)

    analyser.current = audioContextRef.current.createAnalyser()
    micSource.current.connect(analyser.current)

    initAnalyserParams(analyser.current)
    setStart(true)

    // visualizeData()
  }

  const closeVisual = () => {
    return cancelAnimationFrame(animationController)
  }

  // const visualizeData = () => {
  //   if (!canvasRef.current || !analyser.current) return

  //   const height = canvasRef.current.height
  //   const width = canvasRef.current.width

  //   animationController = window.requestAnimationFrame(visualizeData)

  //   const buffer: Uint8Array = new Uint8Array(2048)
  //   const bar_width = 3
  //   let start = 0

  //   analyser.current.getByteTimeDomainData(buffer)

  //   const ctx = canvasRef.current.getContext("2d")
  //   if (ctx == null) return

  //   ctx.fillStyle = "rgb(200, 200, 200)"
  //   ctx.fillRect(0, 0, width, height)

  //   ctx.lineWidth = 2
  //   ctx.strokeStyle = "rgb(0, 0, 0)"

  //   ctx.beginPath()

  //   // ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  //   let sliceWidth = (width * 1.0) / 2048
  //   let x = 0

  //   for (let i = 0; i < buffer.length; i++) {
  //     let v = buffer[i]! / 128.0
  //     let y = (v * height) / 2

  //     if (i === 0) {
  //       ctx.moveTo(x, y)
  //     } else {
  //       ctx.lineTo(x, y)
  //     }

  //     x += sliceWidth
  //     ctx.fillRect(start, canvasRef.current.height, bar_width, -buffer[i]!)
  //   }

  //   ctx.lineTo(canvasRef.current.width, canvasRef.current.height / 2)
  //   ctx.stroke()
  // }

  function playNote(hz: number): void {
    if (!audioContextRef.current || !analyser.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()
    oscillator.frequency.setValueAtTime(
      880,
      audioContextRef.current.currentTime
    )
    gainNode.gain.value = 0.2
    oscillator.connect(gainNode)
    gainNode.connect(analyser.current)
    oscillator.start()
  }

  return (
    <div className="max-w-md mx-auto flex flex-col">
      <h1 className="text-center">Audio stuff</h1>
      <Waveform analyser={analyser.current} />

      <div className="flex justify-evenly p-4">
        <button
          className="px-2 border-2 rounded-md"
          onClick={() => void startMic()}
        >
          start mic
        </button>
        <button
          className="px-2 border-2 rounded-md"
          onClick={() => {
            if (micSource.current != null) micSource.current.disconnect()
          }}
        >
          stop mic
        </button>
      </div>

      <div>
        <button
          className="px-2 border-2 rounded-md"
          onClick={() => playNote(440)}
        >
          A
        </button>
        <input
          min={440}
          max={880}
          step={5}
          type="range"
          onChange={(event) => {
            console.log(oscillatorFrequency)
            setOscillatorFrequency(+event.target.value)
            playNote(oscillatorFrequency)
          }}
          value={oscillatorFrequency}
        />
      </div>

      <button
        onClick={() => {
          console.log(canvasRef, audioRef, analyser)
        }}
      >
        checkRefs
      </button>
    </div>
  )
}

export default Home

function initAnalyserParams(analyser: AnalyserNode): void {
  analyser.minDecibels = -100
  analyser.maxDecibels = -10
  analyser.smoothingTimeConstant = 0.85
}
