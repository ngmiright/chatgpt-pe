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


// a product review
let prodReview = `
Needed a nice lamp for my bedroom, and this one had \
additional storage and not too high of a price point. \
Got it fast.  The string to our lamp broke during the \
transit and the company happily sent over a new one. \
Came within a few days as well. It was easy to put \
together.  I had a missing part, so I contacted their \
support and they very quickly got me the missing piece! \
Lumina seems to me to be a great company that cares \
about their customers and products!!
`;

// a news article
let story = `
In a recent survey conducted by the government, \
public sector employees were asked to rate their level \
of satisfaction with the department they work at. \
The results revealed that NASA was the most popular \
department with a satisfaction rating of 95%.

One NASA employee, John Smith, commented on the findings, \
stating, "I'm not surprised that NASA came out on top. \
It's a great place to work with amazing people and \
incredible opportunities. I'm proud to be a part of \
such an innovative organization."

The results were also welcomed by NASA's management team, \
with Director Tom Johnson stating, "We are thrilled to \
hear that our employees are satisfied with their work at NASA. \
We have a talented and dedicated team who work tirelessly \
to achieve our goals, and it's fantastic to see that their \
hard work is paying off."

The survey also revealed that the \
Social Security Administration had the lowest satisfaction \
rating, with only 45% of employees indicating they were \
satisfied with their job. The government has pledged to \
address the concerns raised by employees in the survey and \
work towards improving job satisfaction across all departments.
`;


// UNCOMMENT the following parts of the code delimited by /* and */ ONE AT A TIME to implement the corresponding tasks

// infer sentiment (positive/negative)
/*
let prompt = `
What is the sentiment of the following product review, \
which is delimited with triple quotes?

Review text:
"""${prodReview}"""
`;

getCompletion(prompt).then((response) => console.log(response));
*/


// identify various types of emotions
/*
let prompt = `
Identify a list of emotions that the writer of the \
following review is expressing. Include no more than \
five items in the list. Format your answer as a list of \
lower-case words separated by commas.

Review text:
"""${prodReview}"""
`;

getCompletion(prompt).then((response) => console.log(response));
*/


// identify anger
/*
let prompt = `
Is the writer of the following review expressing anger?\
The review is delimited with triple quotes. \
Give your answer as either yes or no.

Review text:
"""${prodReview}"""
`;

getCompletion(prompt).then((response) => console.log(response));
*/


// extract product and company name from customer reviews
/*
let prompt = `
Identify the following items from the review text: 
- Item purchased by reviewer
- Company that made the item

The review is delimited with triple quotes. \
Format your response as a JSON object with \
"Item" and "Brand" as the keys. 
If the information isn't present, use "unknown" \
as the value.
Make your response as short as possible.
  
Review text:
"""${prodReview}"""
`;

getCompletion(prompt).then((response) => console.log(response));
*/


// do multiple tasks at once
/*
let prompt = `
Identify the following items from the review text: 
- Sentiment (positive or negative)
- Is the reviewer expressing anger? (true or false)
- Item purchased by reviewer
- Company that made the item

The review is delimited with triple quotes. \
Format your response as a JSON object with \
"Sentiment", "Anger", "Item" and "Brand" as the keys.
If the information isn't present, use "unknown" \
as the value.
Make your response as short as possible.
Format the Anger value as a boolean.

Review text:
"""${prodReview}"""
`;

getCompletion(prompt).then((response) => console.log(response));
*/


// infer topics from a news article
/*
let prompt = `
Determine five topics that are being discussed in the \
following text, which is delimited by triple quotes.

Make each item one or two words long.

Format your response as a list of items separated by commas.

Text sample: 
"""${story}"""
`;

// convert tags from a string to an array containing the topics
let tags;
getCompletion(prompt)
  .then((response) => {
    tags = response.split(',').map((str) => str.trim());
    return tags;
  })
  .then((tags) => {
    console.log(tags);
    // make alerts for certain topics (let's say "NASA" here)
    if (tags.includes("NASA")){
      console.log("ALERT: new NASA story!");
    }
  });
*/







