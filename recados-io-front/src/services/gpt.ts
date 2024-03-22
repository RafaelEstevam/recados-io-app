import GPT from "@/config/gpt";

interface GptMessage {
  role: string,
  content: string
}

interface GptData {
  model: 'gpt-3.5-turbo' | string,
  messages: GptMessage[],
  max_tokens: number,
  temperature: number
}

const postToGPT = async (message:string, callback: Function, finishCallback: Function) => {

  const data:GptData = {
    model: 'gpt-3.5-turbo',
    messages: [
      {role: 'user', content: `Corriga somente a ortografia da seguinte sentença: ${message.replace(/(\r\n|\n|\r)/gm, " ")}. Sem alterar o sentido da frase.`}
    ],
    max_tokens: 56,
    temperature: 0.5
  }

  try{
    const gptResponse = await GPT.post('/chat/completions', data);
    callback(gptResponse);
  }catch(e){
    console.log(e);
  }finally{
    finishCallback();
  }
  
  // const data:GptData = {
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {role: "user",
  //     content: `Corriga somente a ortografia da seguinte sentença: ${this.message.replace(/(\r\n|\n|\r)/gm, " ")}. Sem alterar o sentido da frase.`}
  //   ],
  //   max_tokens: 56,
  //   temperature: 0.5
  // }
  // try{
  //   const gptResponse = await GPT.post('/chat/completions', data);
  //   this.acceptGptSuggestion = true;
  //   this.gptMessage = gptResponse.data.choices[0].message.content;
  // }catch(e){
  //   console.log(e)
  // }finally{
  //   this.$store.dispatch('handleShowLoading', {showLoading: false});
  // }
}

export {
  postToGPT
}