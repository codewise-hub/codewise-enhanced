// Simple test script to verify AI functionality
// Run with: node test-ai.js

import fetch from 'node-fetch';

async function testAI() {
  try {
    console.log('Testing AI chat endpoint...');
    
    const response = await fetch('http://localhost:5000/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'What is a variable in programming?',
        context: 'coding',
        ageGroup: '12-17'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ AI is working!');
      console.log('Response:', data.response.substring(0, 100) + '...');
    } else {
      console.log('❌ AI test failed:', data.error);
      console.log('Fallback message:', data.fallback);
    }
    
  } catch (error) {
    console.log('❌ Connection error:', error.message);
    console.log('Make sure the server is running on port 5000');
  }
}

testAI();