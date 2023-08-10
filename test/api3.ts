import * as openai from 'openai';
import { ChatCompletion } from 'openai/src/resources/chatCompletion';
openai.apiKey = "ここにOpenAI API KEYが入ります。";
//api一号機
const chatGPT_api_1 = async (messages: { role: string; content: string }[]): Promise<ChatCompletion> => {
  const response = await openai.ChatCompletion.create({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 1
  });
  return response;
};
//api二号機
const chatGPT_api_2 = async (messages: { role: string; content: string }[]): Promise<ChatCompletion> => {
  const response = await openai.ChatCompletion.create({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.5
  });
  return response;
};
//api一号機に役割をセット(ポシティブ)
const messages_1: { role: string; content: string }[] = [
  {"role": "system", "content": "あなたはプロの投資家です。不動産クラウドファンディングにネガティブなことを言われたら30文字以内で反論してください。"}
];
chatGPT_api_1(messages_1).then(response1 => {
  const res1 = response1.choices[0].message.content;
  console.log("chatGPT_api_1:" + res1);
  //api二号機に役割をセット(ネガティブ)
  const messages_2: { role: string; content: string }[] = [
    {"role": "system", "content": "あなたはプロの投資家です。不動産クラウドファンディングにポシティブなことを言われたら30文字以内で反論してください。"},
    {"role": "user", "content": res1}
  ];
  chatGPT_api_2(messages_2).then(response2 => {
    const res2 = response2.choices[0].message.content;
    messages_2.push({"role": "assistant", "content": res2});
    console.log("chatGPT_api_2:" + res2);
  });
});