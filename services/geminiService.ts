
import { GoogleGenAI } from "@google/genai";

export class HRService {
  private ai: GoogleGenAI | null = null;
  private model = "gemini-3-flash-preview";

  constructor() {
    this.init();
  }

  private init() {
    try {
      const apiKey = typeof process !== 'undefined' ? process.env?.API_KEY : null;
      if (apiKey) {
        this.ai = new GoogleGenAI({ apiKey });
      }
    } catch (e) {
      console.warn("HRService: Failed to access API_KEY from environment", e);
    }
  }

  async getHRResponse(userPrompt: string, history: { role: 'user' | 'model', text: string }[]) {
    try {
      const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) || '';
      if (!apiKey) {
        return "I'm sorry, I can't process requests right now because my brain (API Key) is missing. Please check your configuration.";
      }

      const aiClient = new GoogleGenAI({ apiKey });
      
      const chat = aiClient.chats.create({
        model: this.model,
        config: {
          systemInstruction: `You are 'BetterHR Assistant', a friendly and professional HR bot for a modern company using the BetterHR Pro Android application.
          You help employees with:
          1. Company policies: leave, remote work, attendance, code of conduct.
          2. Drafting professional emails to managers or HR.
          3. Benefits info: health insurance, payroll, performance reviews.
          4. Using the app: explaining how to clock in, apply for leave, or find payslips.
          
          Guidelines:
          - Keep responses concise, supportive, and formatted with Markdown.
          - Use bold text for key terms.
          - If asked about specific sensitive employee data you don't have access to, guide them to contact their HR manager directly via the Directory in the app.
          - Your tone is "Tech-Savvy Professional".`,
        },
      });

      const result = await chat.sendMessage({ message: userPrompt });
      return result.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I encountered a minor system error while processing your request. Please try again or contact support if the issue persists.";
    }
  }
}

export const hrAssistant = new HRService();
