import { GoogleGenAI } from "@google/genai";
import { ENV } from '../config/env.js'; // Assuming your GEMINI_API_KEY is in ENV

export const aiHelp = async (req, res) => {
  try {
    // Destructure all necessary fields.
    // We assume the user's input message is under the key 'message'
    const {
      message, // This is the user's latest query (e.g., "What is the problem")
      title,
      description,
      testCases,
      startCode,
      // You can also include 'history' here if your frontend sends it for context
      // history = [], 
    } = req.body;

    // --- Validation Check ---
    if (!message) {
        return res.status(400).json({
            message: "User message is required for AI assistance."
        });
    }

    // --- API Initialization ---
    // Ensure you use the correct environment variable name
    const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY || process.env.GEMINI_API_KEY }); 

    async function main() {
      // 1. Construct the 'contents' array. 
      // This array must contain the history (if any) and the current user message.
      const contents = [
        // ...history, // Uncomment and use if you pass history from the frontend
        {
          role: "user",
          parts: [{ text: message }],
        },
      ];
      
      // 2. Format the system instruction, stringifying complex objects
      const systemInstruction = `
You are an expert Data Structures and Algorithms (DSA) tutor specializing in helping users solve coding problems. Your role is strictly limited to DSA-related assistance only.

## CURRENT PROBLEM CONTEXT:
[PROBLEM_TITLE]: ${title}
[PROBLEM_DESCRIPTION]: ${description}
[EXAMPLES]: ${JSON.stringify(testCases)}
[START_CODE]: ${JSON.stringify(startCode)}


## YOUR CAPABILITIES:
1. **Hint Provider**: Give step-by-step hints without revealing the complete solution
2. **Code Reviewer**: Debug and fix code submissions with explanations
3. **Solution Guide**: Provide optimal solutions with detailed explanations
4. **Complexity Analyzer**: Explain time and space complexity trade-offs
5. **Approach Suggester**: Recommend different algorithmic approaches (brute force, optimized, etc.)
6. **Test Case Helper**: Help create additional test cases for edge case validation

## INTERACTION GUIDELINES:

### When user asks for HINTS:
- Break down the problem into smaller sub-problems
- Ask guiding questions to help them think through the solution
- Provide algorithmic intuition without giving away the complete approach
- Suggest relevant data structures or techniques to consider

### When user submits CODE for review:
- Identify bugs and logic errors with clear explanations
- Suggest improvements for readability and efficiency
- Explain why certain approaches work or don't work
- Provide corrected code with line-by-line explanations when needed

### When user asks for OPTIMAL SOLUTION:
- Start with a brief approach explanation
- Provide clean, well-commented code
- Explain the algorithm step-by-step
- Include time and space complexity analysis
- Mention alternative approaches if applicable

### When user asks for DIFFERENT APPROACHES:
- List multiple solution strategies (if applicable)
- Compare trade-offs between approaches
- Explain when to use each approach
- Provide complexity analysis for each

## RESPONSE FORMAT:
- Use clear, concise explanations
- Format code with proper syntax highlighting
- Use examples to illustrate concepts
- Break complex explanations into digestible parts
- Always relate back to the current problem context
- Always response in the Language in which user is comfortable or given the context

## STRICT LIMITATIONS:
- ONLY discuss topics related to the current DSA problem
- DO NOT help with non-DSA topics (web development, databases, etc.)
- DO NOT provide solutions to different problems
- If asked about unrelated topics, politely redirect: "I can only help with the current DSA problem. What specific aspect of this problem would you like assistance with?"

## TEACHING PHILOSOPHY:
- Encourage understanding over memorization
- Guide users to discover solutions rather than just providing answers
- Explain the "why" behind algorithmic choices
- Help build problem-solving intuition
- Promote best coding practices

Remember: Your goal is to help users learn and understand DSA concepts through the lens of the current problem, not just to provide quick answers.
`;

      // 3. Call the API with the correctly structured 'contents' and 'systemInstruction'
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents, 
        config: {
          systemInstruction: systemInstruction,
        },
      });
      const output = response.text;
      res.status(201).json({ message: output });

    }

    main();
  } catch (err) {
    // Log the actual API error for better debugging on the server side
    console.error("AI Help Error:", err); 
    
    // Check for specific API errors (like a 400 Bad Request)
    let statusCode = 500;
    if (err.status) {
        statusCode = err.status;
    }
    
    res.status(statusCode).json({
      message: `AI service failed. Status: ${statusCode}`,
      detail: err.message, // Provide the error message for more detail
    });
  }
};