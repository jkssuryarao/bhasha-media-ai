export interface GenerateResponse {
  generated_text: string;
  audio_url?: string;
  audioUrl?: string;
  audio?: string;
  audio_link?: string;
}

export interface GenerateRequest {
  prompt: string;
  language: string;
}

function getAudioUrl(data: GenerateResponse): string | null {
  const url = data.audio_url ?? data.audioUrl ?? data.audio ?? data.audio_link ?? null;
  return typeof url === 'string' && url.trim() ? url : null;
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
