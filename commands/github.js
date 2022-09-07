import { InteractionResponseType } from "discord-interactions";
import fs from 'fs';
import { parse } from 'yaml'

var github_data = parse(fs.readFileSync('./data/github.yaml', 'utf8'))

function githubHandler(res, req, data) {
  if (!data.options) {
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "c",
      },
    });
    return
  }

  // console.log(data);
  let msg = data.options[0].value;
  // console.log(msg)
  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "GITHUB you have send msg: " + msg,
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