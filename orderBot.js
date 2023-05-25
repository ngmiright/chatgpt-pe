require('dotenv').config();
const readline = require('readline');

// create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// load API key
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// helper function
// provide context to the model to extend the conversation
const getCompletionFromMessages = async (messages) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0,
  });
  return completion.data.choices[0].message["content"];
}

let messages = [{'role':'system', 'content':`
You are OrderBot, an automated service to collect orders for a pizza restaurant. \
You first greet the customer, then collects the order, \
and then asks if it's a pickup or delivery. \
You wait to collect the entire order, then summarize it and check for a final \
time if the customer wants to add anything else. \
If it's a delivery, you ask for an address. \
Finally you collect the payment.\
Make sure to clarify all options, extras and sizes to uniquely \
identify the item from the menu.\
You respond in a short, very conversational friendly style. \
The menu includes \
pepperoni pizza  12.95, 10.00, 7.00 \
cheese pizza   10.95, 9.25, 6.50 \
eggplant pizza   11.95, 9.75, 6.75 \
fries 4.50, 3.50 \
greek salad 7.25 \
Toppings: \
extra cheese 2.00, \
mushrooms 1.50 \
sausage 3.00 \
canadian bacon 3.50 \
AI sauce 1.50 \
peppers 1.00 \
Drinks: \
coke 3.00, 2.00, 1.00 \
sprite 3.00, 2.00, 1.00 \
bottled water 5.00 \
"""`,}]  // accumulate messages

const promptUser = () => {
  // prompt the user for input
  rl.question("You: ", (userInput) => {
    const userPromptObject = {'role':'user', 'content': userInput};
    messages.push(userPromptObject);
    processUserInput(userInput);
  });
};

const processUserInput = (userInput) => {
  if (userInput && userInput.toLowerCase() === "exit") {
    // terminate the conversation if the user enters "exit"
    rl.close();
    process.exit();
  } else {
    // collect user messages and generate bot responses
    getCompletionFromMessages(messages)
      .then((response) => {
        console.log("Assistant: " + response);
        const assistantResponseObject = {'role':'assistant', 'content': response};
        messages.push(assistantResponseObject);
        promptUser();
      });
  }
};

promptUser();