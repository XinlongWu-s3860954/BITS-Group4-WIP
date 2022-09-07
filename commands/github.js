import { InteractionResponseType } from "discord-interactions";
import rake from "node-rake"
import fs from 'fs';
import { parse, stringify } from 'yaml'

var github_data = parse(fs.readFileSync('./data/github.yaml', 'utf8'))

function findAnswer(key_words){
  let ans = {};
  let max_hit_count = 0;
  
  github_data.forEach((element) => {
    let hit_count = 0;
    // compare the key_words with the element
    element.key_words.forEach((value) => {
        if(key_words.includes(value)){
            hit_count++;
            console.log("hit:" + value);
        }
    });
    if(hit_count > max_hit_count){
        max_hit_count = hit_count;
        ans = element;
    }
  });
  
  if (Object.keys(ans).length === 0) {
    return null; 
  }
  
  return ans;
}

function githubHandler(res, req, data) {
  if (!data.options) {
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Sorry, Did you say \n anything?",
      },
    });
    return
  }

  let msg = data.options[0].value;
  let key_words = rake.generate(msg);
  let ans = findAnswer(key_words);
  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: ans == null ? "Sorry, I can't help you now ;(" : ans.answer,
    },
  });
}

// Simple github command
export const GITHUB_COMMAND = {
  name: "github",
  description: "github command Q&A bot",
  type: 1,
  options: [
    {
      name: "question",
      description: "Question user want to ask",
      type: 3,
      required: false,
    },
  ],
  handler: githubHandler,
};