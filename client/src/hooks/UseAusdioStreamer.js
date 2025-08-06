import { useState,useRef,useEffect } from "react";


 const useAudioStreamer = (onAudioChunk,amplificationFactor = 2.0) => {
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const micStreamRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      
        const source = audioContext.createMediaStreamSource(stream);
      const gainNode = audioContext.createGain();
      gainNode.gain.value = amplificationFactor*2; // <-- Amplify here (e.g., 2x volume)

      const destination = audioContext.createMediaStreamDestination();

      // Connect the chain: Mic → Gain → Destination
      source.connect(gainNode);
      gainNode.connect(destination);


      // Use destination.stream for amplified audio
      const mediaRecorder = new MediaRecorder(destination.stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          if (onAudioChunk) {
            onAudioChunk(event.data);
          }
        }
      };

      mediaRecorder.start(500); // Send audio chunks every 500ms
      console.log('Recording started');
    } catch (error) {
      console.error('Microphone access error:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      console.log('Recording stopped');
    }
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return { startRecording, stopRecording };
};

export default useAudioStreamer;
