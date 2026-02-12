
import { GoogleGenAI } from "@google/genai";

export class HRService {
  private ai: GoogleGenAI;
  private model = "gemini-3-flash-preview";

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getHRResponse(userPrompt: string, history: { role: 'user' | 'model', text: string }[]) {
    try {
      const chat = this.ai.chats.create({
        model: this.model,
        config: {
          systemInstruction: `You are 'BetterHR Assistant', a friendly and professional HR bot for a modern company. 
          You help employees with:
          1. Understanding company policies (standard global tech company policies).
          2. Drafting leave requests or emails to managers.
          3. Answering questions about payroll, insurance, and benefits.
          4. Career development advice.
          
          Keep responses concise, empathetic, and professional. Use markdown for lists and bold text. 
          If a query is outside HR scope, politely steer them back.`,
        },
      });

      // Simple implementation since chat.sendMessage is preferred
      const result = await chat.sendMessage({ message: userPrompt });
      return result.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm sorry, I'm having trouble connecting to the HR mainframe. Please try again in a moment.";
    }
  }
}

export const hrAssistant = new HRService();
