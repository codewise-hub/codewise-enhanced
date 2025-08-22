import { Router } from 'express';
import { generateAIResponse, createSystemPrompt, type ChatMessage } from './openai';

const router = Router();

router.post('/ai/chat', async (req, res) => {
  try {
    const { message, context = 'general', ageGroup = '12-17' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create system prompt based on context and age group
    const systemPrompt = createSystemPrompt(context as 'coding' | 'robotics' | 'general');
    
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ];

    // Add age-specific context
    if (ageGroup === '6-11') {
      messages[0].content += "\n\nRemember: This is a young learner (ages 6-11). Use very simple language, visual examples, and encourage creativity. Focus on block-based programming concepts.";
    } else {
      messages[0].content += "\n\nThis is a teen learner (ages 12-17). You can use more technical terms but still keep explanations clear and engaging.";
    }

    const response = await generateAIResponse(messages);

    res.json({ 
      response,
      context,
      suggestions: [
        "Can you explain that differently?",
        "Show me an example",
        "What should I learn next?",
        "How can I practice this?"
      ]
    });

  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ 
      error: 'Failed to generate AI response',
      fallback: "I'm having trouble connecting to my AI brain right now. Try asking your question again in a moment, or reach out to your teacher for help!"
    });
  }
});

router.post('/ai/help', async (req, res) => {
  try {
    const { topic, difficulty = 'beginner', ageGroup = '12-17' } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const helpMessage = `Can you help me understand ${topic}? I'm a ${difficulty} level student.`;
    const systemPrompt = createSystemPrompt('coding');
    
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: helpMessage }
    ];

    // Add difficulty and age context
    if (ageGroup === '6-11') {
      messages[0].content += "\n\nThis is a young learner. Use simple language, visual analogies, and relate to things kids understand. Focus on the fun aspects of programming.";
    }

    if (difficulty === 'beginner') {
      messages[0].content += "\n\nThis student is just starting. Explain fundamentals clearly and provide encouragement.";
    } else if (difficulty === 'advanced') {
      messages[0].content += "\n\nThis student has experience. You can discuss more complex concepts and best practices.";
    }

    const response = await generateAIResponse(messages);

    res.json({ 
      response,
      topic,
      difficulty,
      nextSteps: [
        "Try building a small project",
        "Practice with coding exercises", 
        "Ask follow-up questions",
        "Share your progress"
      ]
    });

  } catch (error) {
    console.error('AI help error:', error);
    res.status(500).json({ 
      error: 'Failed to generate help response',
      fallback: "I'm having some technical difficulties. Don't worry - keep experimenting and learning! Your teacher can also help with this topic."
    });
  }
});

export { router as aiRoutes };