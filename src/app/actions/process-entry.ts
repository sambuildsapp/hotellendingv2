'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

export interface ProcessedRow {
    original: string;
    usaliCode: string; // e.g., "5100"
    category: string; // e.g., "Payroll - Operations"
    confidence: number; // 0-100
    riskFlag: 'LOW' | 'MEDIUM' | 'HIGH';
    reasoning: string;
    suggestedAudit: string | null; // e.g., "Check invoice for alcohol vs food split"
}

export async function processWithGemini(rawText: string): Promise<ProcessedRow[]> {
    console.log('--- [Server Action] processWithGemini Started ---');
    console.log('Input length:', rawText.length);
    console.log('API Key configured:', !!apiKey, apiKey ? `(Starts with ${apiKey.substring(0, 4)}...)` : 'NO');

    if (!apiKey) {
        console.error('❌ Error: GEMINI_API_KEY is missing via process.env');
        throw new Error('Gemini API Key not configured');
    }

    // System prompt for the "Lending Intelligence" persona
    const prompt = `
    Role: Expert Hotel Controller & Credit Underwriter.
    Task: Analyze the following expense line items from a hotel P&L.
    
    For each line, return a JSON object with:
    1. usaliCode: The 11th Edition USALI code (4 digits).
    2. category: Standardized USALI category name.
    3. confidence: Score 0-100 based on ambiguity.
    4. riskFlag: 'HIGH' if the expense seems fraudulent, personal, or misclassified (e.g., "Consulting" round numbers, "Party Supplies"). 'MEDIUM' if unusual. 'LOW' otherwise.
    5. reasoning: Brief explanation of the classification and risk.
    6. suggestedAudit: If risk > LOW, suggest a specific question to ask the borrower.

    Benchmarking Rules (Heuristics):
    - Food Cost > 35% of F&B Revenue is High Risk.
    - Labor > 50% is High Risk.
    - "Consulting" or "Professional Fees" > $5k without detail is Medium Risk.
    - Round numbers (e.g., 5000.00) are Suspicious.

    Input Data:
    ${rawText}

    Output Format:
    Return ONLY a valid JSON array of objects. No markdown formatting.
    `;

    try {
        console.log('Sending request to Gemini...');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log('Gemini Response received. Length:', text.length);
        console.log('Raw Response Snippet:', text.substring(0, 100));

        // Clean up markdown code blocks if present
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const parsed = JSON.parse(cleanedText) as ProcessedRow[];
        console.log('✅ Successfully parsed JSON. Rows:', parsed.length);
        return parsed;
    } catch (error: any) {
        console.error('❌ Gemini API Error Details:', error);

        let errorMessage = 'Failed to process data with Lending Intelligence AI';

        if (error.message?.includes('API Key')) {
            errorMessage = 'Invalid or missing API Key. Please check your .env.local configuration.';
        } else if (error.message?.includes('quota')) {
            errorMessage = 'API Quota Exceeded. Please try again later or use a different key.';
        } else if (error.status === 503) {
            errorMessage = 'AI Model is currently overloaded. Please try again in a moment.';
        } else if (error.message) {
            errorMessage = `AI Error: ${error.message}`;
        }

        throw new Error(errorMessage);
    }
}
