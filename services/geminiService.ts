
import { GoogleGenAI, Type, GenerateContentResponse, Chat } from "@google/genai";
import { AcademicGuidance } from "../types";

export const getAcademicGuidance = async (subject: string): Promise<AcademicGuidance | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide comprehensive academic guidance for the subject: ${subject}. 
      Include a summary, 3 specific study tips, detailed exam prep for a major topic in this subject, and a potential career path.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            summary: { type: Type.STRING },
            studyTips: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  technique: { type: Type.STRING }
                },
                required: ["title", "description", "technique"]
              }
            },
            examPrep: {
              type: Type.OBJECT,
              properties: {
                topic: { type: Type.STRING },
                keyConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
                commonMistakes: { type: Type.ARRAY, items: { type: Type.STRING } },
                practiceQuestion: { type: Type.STRING }
              },
              required: ["topic", "keyConcepts", "commonMistakes", "practiceQuestion"]
            },
            careerPath: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING },
                skillsRequired: { type: Type.ARRAY, items: { type: Type.STRING } },
                salaryOutlook: { type: Type.STRING },
                nextSteps: { type: Type.STRING }
              },
              required: ["role", "skillsRequired", "salaryOutlook", "nextSteps"]
            }
          },
          required: ["subject", "summary", "studyTips", "examPrep", "careerPath"]
        }
      }
    });

    return JSON.parse(response.text.trim()) as AcademicGuidance;
  } catch (error) {
    console.error("Error fetching academic guidance:", error);
    return null;
  }
};

export const chatWithAcademicAdvisor = async (message: string, context: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat: Chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are a friendly and encouraging Academic Advisor for the "AI Student Helpdesk". 
      The student is currently looking at: ${context}. 
      Provide clear, step-by-step explanations for academic questions. Use analogies when helpful. 
      Encourage critical thinking. If asked a homework question, explain how to solve it rather than just giving the answer.`,
    },
  });

  try {
    const response = await chat.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't process that question right now.";
  } catch (error) {
    console.error("Advisor chat error:", error);
    return "The advisor is currently offline. Please try again in a moment.";
  }
};
