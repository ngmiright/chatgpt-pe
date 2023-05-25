require('dotenv').config();

// load API key
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// helper function
const getCompletion = async (prompt) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: prompt}],
    temperature: 0,
  });
  return completion.data.choices[0].message["content"];
}

// provide context to the model to extend the conversation
const getCompletionFromMessages = async (messages, temperature) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: temperature,
  });
  return completion.data.choices[0].message["content"];
}


// UNCOMMENT the following parts of the code delimited by /* and */ ONE AT A TIME to implement the corresponding tasks

// ask it to speak like Shakespeare
/*
let messages = [  
  {'role':'system', 'content':'You are an assistant that speaks like Shakespeare.'},    
  {'role':'user', 'content':'tell me a joke'},   
  {'role':'assistant', 'content':'Why did the chicken cross the road'},   
  {'role':'user', 'content':'I don\'t know'} 
];

getCompletionFromMessages(messages, 1).then((response) => console.log(response));
*/


// all relevant context is required for the model to "remember" previous conversations
// for example, in the case below, the model won't remember your name
/*
let messages = [  
  {'role':'system', 'content':'You are friendly chatbot.'},    
  {'role':'user', 'content':'Hi, my name is Isa'}
];

getCompletionFromMessages(messages, 1).then((response) => console.log(response));

messages = [  
  {'role':'system', 'content':'You are friendly chatbot.'},    
  {'role':'user', 'content':'Yes,  can you remind me, What is my name?'}
]

getCompletionFromMessages(messages, 1).then((response) => console.log(response));
*/

// to let it "remember" your name, you must provide the context all at once
/*
let messages = [  
  {'role':'system', 'content':'You are friendly chatbot.'},
  {'role':'user', 'content':'Hi, my name is Isa'},
  {'role':'assistant', 'content': "Hi Isa! It's nice to meet you. \
  Is there anything I can help you with today?"},
  {'role':'user', 'content':'Yes, you can remind me, What is my name?'}
]

getCompletionFromMessages(messages, 1).then((response) => console.log(response));
*/


