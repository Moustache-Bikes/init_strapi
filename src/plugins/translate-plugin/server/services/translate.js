const axios = require('axios');

module.exports = () => ({
  async translateText(entries, targetLang, srcLang) {
    const apiKey = process.env.OPENAI_API_KEY;

    console.log('translateText from service OpenAI', entries, targetLang, srcLang);

    const systemPrompt = `
You are a translation assistant. 
You will receive an array of JSON entries, each having a "path" and a "value".
Translate only the "value" content from ${srcLang} to ${targetLang}.
Do NOT modify the "path". 
If a "value" is a JSON string, you MUST preserve its structure and only translate the embedded text (e.g. for Slate.js rich text).

Return the result as a JSON array with the same shape: [{ path: string, value: string }]

JSON entries : 

${JSON.stringify(entries, null, 2)}
`;
 
console.log('GPT system prompt:', systemPrompt);

    const userPrompt = JSON.stringify(entries, null, 2);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4', // ou gpt-3.5-turbo 
        messages: [
          { role: 'system', content: systemPrompt },
        ],
        temperature: 0.3,
      },
      {
        headers: { 
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response.data.choices?.[0]?.message?.content?.trim();

    console.log('GPT response:', result);

    try {
      return JSON.parse(result);
    } catch (e) {
      console.warn('[translate-plugin] Failed to parse GPT response', result);
      return [];
    }
  },
});
