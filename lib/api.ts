export interface GenerateResponse {
  generated_text: string;
  audio_url?: string;
  audioUrl?: string;
  audio?: string;
}

export interface GenerateRequest {
  prompt: string;
  language: string;
}

function getAudioUrl(data: GenerateResponse): string | null {
  return data.audio_url || data.audioUrl || data.audio || null;
}

export async function generateContent(
  prompt: string,
  language: string
): Promise<GenerateResponse> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, language }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || `API request failed: ${response.status}`);
  }

  return data as GenerateResponse;
}

export { getAudioUrl };
