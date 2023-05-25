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
  });
  return completion.data.choices[0].message["content"];
}


// UNCOMMENT the following parts of the code delimited by /* and */ ONE AT A TIME to implement the corresponding tasks

// translation
/*
let prompt1 = `
Translate the following English text to Spanish: \
"""Hi, I would like to order a blender."""
`;

getCompletion(prompt1).then((response) => console.log(response));
*/

/*
let prompt2 = `
Tell me which language this is: 
"""Combien coûte le lampadaire?"""
`;

getCompletion(prompt2).then((response) => console.log(response));
*/

/*
let prompt3 = `
Translate the following text to French and Spanish \
and English pirate: 
"""I want to order a basketball."""
`;

getCompletion(prompt3).then((response) => console.log(response));
*/

/*
let prompt4 = `
Translate the following text to Spanish in both the \
formal and informal forms: 
"Would you like to order a pillow?"
`;

getCompletion(prompt4).then((response) => console.log(response));
*/


// universal translator
/*
let userMessages = [
    "La performance du système est plus lente que d'habitude.",  // System performance is slower than normal         
    "Mi monitor tiene píxeles que no se iluminan.",              // My monitor has pixels that are not lighting
    "Il mio mouse non funziona.",                                // My mouse is not working
];
for (let msg of userMessages) {
  let prompt = `You're given a text delimited by triple quotes.
  Your task is to tell me the language in which it is written, \
  and translate the text into English.

  """${msg}"""

  Please answer me using a format like this:
  - <the language>: <the original text> 
    - English: <the translation>

  `;

  getCompletion(prompt).then((response) => console.log(response));
}
*/


// tone transformation
/*
let prompt = `Translate the following from slang to a business letter: 
"Dude, This is Joe, check out this spec on this standing lamp."`;

getCompletion(prompt).then((response) => console.log(response));
*/


// format conversion (let's say from JSON to HTML)
/*
let data = `{
	"restaurant employees": [{
			"name": "Shyam",
			"email": "shyamjaiswal@gmail.com"
		},
		{
			"name": "Bob",
			"email": "bob32@gmail.com"
		},
		{
			"name": "Jai",
			"email": "jai87@gmail.com"
		}
	]
}`;

let prompt = `
Translate the following object delimited by triple quotes from JSON to an HTML \
table with column headers and title:
"""${data}"""
`;

getCompletion(prompt).then((response) => console.log(response));
*/


// spelling/grammar check
// check sentences one by one using for-loops
/*
let text = [
"The girl with the black and white puppies have a ball.",  // The girl has a ball.
"Yolanda has her notebook.", // ok
"Its going to be a long day. Does the car need it’s oil changed?",  // homonyms
];

for (let sentence of text) {
  let prompt = `Proofread and correct the following text delimited by ''' \
  and rewrite the corrected version. If you don't find \
  and errors, just say "No errors found". Don't use \
  any punctuation around the text:
  ${sentence}

  please answer me with a format like this:
  - <original sentence>
    - <errors found or not>
    - <corrected sentence>  
  `;

  getCompletion(prompt).then((response) => console.log(response));
}
*/

// proofread a chunk of text and ask it to follow a specific style guide
/*
let text = `
Got this for my daughter for her birthday cuz she keeps taking \
mine from my room.  Yes, adults also like pandas too.  She takes \
it everywhere with her, and it's super soft and cute.  One of the \
ears is a bit lower than the other, and I don't think that was \
designed to be asymmetrical. It's a bit small for what I paid for it \
though. I think there might be other options that are bigger for \
the same price.  It arrived a day earlier than expected, so I got \
to play with it myself before I gave it to my daughter.
`;

let prompt1 = `proofread and correct this review delimited by triple quotes: 
"""${text}"""
`;

getCompletion(prompt1).then((response) => console.log(response));

let prompt2 = `
proofread and correct this review delimited by triple quotes. \
Make it more compelling. Ensure it follows APA style guide \
and targets an advanced reader. Output in markdown format.
"""${text}"""
`;

getCompletion(prompt2).then((response) => console.log(response));
*/





