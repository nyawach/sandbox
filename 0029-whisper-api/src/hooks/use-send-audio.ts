import { blobToFile } from "@/utils/blobToFile";
import { useState } from "react";

export const useSendAudio = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [convertedText, setConvertedText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleBlob = async (blob: Blob) => {
    const file = blobToFile(blob, `${Date.now()}.webm`)
    const data = new FormData();
    data.append("file", file);
    data.append("model", "whisper-1");
    data.append("language", "ja");
    setFormData(data);
    // check if the size is less than 25MB
    if (file.size > 25 * 1024 * 1024) {
      alert("Please upload an audio file less than 25MB");
      return;
    }
  };

  const sendAudio = async () => {
    setLoading(true);
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setLoading(false);
    setConvertedText(data.text);
  };
  return {
    formData,
    convertedText,
    loading,
    handleBlob,
    sendAudio,
  }
}