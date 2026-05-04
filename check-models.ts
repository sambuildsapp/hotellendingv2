import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function listModelsViaRest() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('No API Key found');
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    console.log('Fetching models from:', url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('--- AVAILABLE MODELS ---');
        // @ts-ignore
        data.models.forEach(m => {
            if (m.supportedGenerationMethods.includes('generateContent')) {
                console.log(`Model: ${m.name.replace('models/', '')}`);
                console.log(`   - Display Name: ${m.displayName}`);
                console.log(`   - Supported Methods: ${m.supportedGenerationMethods.join(', ')}`);
            }
        });
    } catch (e: any) {
        console.error('Failed to list models:', e.message);
    }
}

listModelsViaRest();
