import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function generateAIResponse(messages: ChatMessage[]): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate AI response');
  }
}

export function createSystemPrompt(context: 'coding' | 'robotics' | 'general'): string {
  const basePrompt = "You are CodewiseBot, a friendly AI tutor specializing in coding education for young learners aged 6-17. You help students learn programming concepts, solve coding problems, and build exciting projects.";
  
  const contextPrompts = {
    coding: "Focus on explaining programming concepts clearly, providing code examples, and encouraging best practices. Use age-appropriate language and relate concepts to real-world examples.",
    robotics: "Help students understand robotics concepts, microcontroller programming (especially micro:bit), sensor integration, and physical computing. Explain how code controls hardware.",
    general: "Assist with general coding questions, project ideas, learning resources, and educational guidance. Be encouraging and supportive."
  };

  return `${basePrompt}\n\n${contextPrompts[context]}\n\nAlways be encouraging, use simple language appropriate for the student's age, and provide practical examples when possible.`;
}