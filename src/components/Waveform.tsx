import { useRef } from "react"

type WaveformProps = {
  analyser: AnalyserNode | null
}

function Waveform({ analyser }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationController = useRef<number>(0)

  const visualizeData = () => {
    if (!canvasRef.current || !analyser) return

    const height = canvasRef.current.height
    const width = canvasRef.current.width

    animationController.current = window.requestAnimationFrame(visualizeData)

    const buffer: Uint8Array = new Uint8Array(2048)
    const bar_width = 3
    const start = 0

    analyser.getByteTimeDomainData(buffer)

    const ctx = canvasRef.current.getContext("2d")
    if (ctx == null) return

    ctx.fillStyle = "rgb(200, 200, 200)"
    ctx.fillRect(0, 0, width, height)

    ctx.lineWidth = 2
    ctx.strokeStyle = "rgb(0, 0, 0)"

    ctx.beginPath()

    const sliceWidth = (width * 1.0) / 2048
    let x = 0

    for (let i = 0; i < buffer.length; i++) {
      const v = buffer[i]! / 128.0
      const y = (v * height) / 2

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      x += sliceWidth
      ctx.fillRect(start, canvasRef.current.height, bar_width, -buffer[i]!)
    }

    ctx.lineTo(canvasRef.current.width, canvasRef.current.height / 2)
    ctx.stroke()
  }

  return (
    <div>
      <canvas
        className="bg-amber-800 rounded-xl"
        ref={canvasRef}
        width={500}
        height={200}
      />
      <button onClick={visualizeData}>start</button>
    </div>
  )
}

export default Waveform
