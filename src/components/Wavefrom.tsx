// import { useEffect, useRef, useState } from "react"

// let bufferLength: number = 0
// let dataArray = new Uint8Array(2048)
// let id: number

// type WaveformTypes = {
//   analyser: AnalyserNode
//   start: boolean
// }

// export default function Waveform({ analyser, start }: WaveformTypes) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null)

//   useEffect(() => {
//     if (!start) return
//     console.log(analyser)

//     render()
//     function render() {
//       id = requestAnimationFrame(render)
//       analyser.getByteTimeDomainData(dataArray)
//       console.log(dataArray.reduce((a, b) => a + b))
//     }
//     return () => {
//       cancelAnimationFrame(id)
//     }
//   }, [start, analyser])

//   return (
//     <div className="border-[1px] rounded-xl w-[90%] mx-auto">
//       <canvas ref={canvasRef} width={250} height={250}>
//         fallback
//       </canvas>
//       {/*  */}
//       <div className="text-white">
//         {canvasRef.current == null ? "nocontext" : "context present"}
//       </div>
//       {/*  */}
//     </div>
//   )
// }
