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
      key
  });
}

function githubHandler(res, req, data) {
  if (!data.options) {
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Sorry, Did you say anything?",
      },
    });
    return
  }

  let msg = data.options[0].value;
  let key_words = rake.generate(msg);
  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "key_words: " + key_words,
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