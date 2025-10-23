



'use client'

import { useEffect, useRef, useState } from "react"

interface AudioMonitorProps {
  onAudioClipRecorded: (audioData: string) => void
}

export default function AudioMonitor({ onAudioClipRecorded }: AudioMonitorProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let stream: MediaStream | null = null
    let recordingInterval: ReturnType<typeof setInterval> | null = null

    const setupAudioMonitoring = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })

        recordingInterval = setInterval(() => {
          mediaRecorderRef.current = new MediaRecorder(stream!, { mimeType: "audio/webm" })
          audioChunksRef.current = []

          mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data)
          }

          mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
            const reader = new FileReader()
            reader.readAsDataURL(audioBlob)
            reader.onloadend = () => {
              const base64Audio = reader.result as string
              onAudioClipRecorded(base64Audio)
            }
          }

          mediaRecorderRef.current.start()
          setTimeout(() => {
            mediaRecorderRef.current?.stop()
          }, 4000)
        }, 15000)
      } catch (err) {
        setError("Microphone access was denied. Proctoring requires audio access.")
      }
    }

    setupAudioMonitoring()

    return () => {
      if (recordingInterval) clearInterval(recordingInterval)
      if (stream) stream.getTracks().forEach(track => track.stop())
    }
  }, [onAudioClipRecorded])

  if (error) {
    return <div className="absolute bottom-1 left-4 text-xs text-red-500">{error}</div>
  }

  return null
}