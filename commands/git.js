import { InteractionResponseType } from "discord-interactions";

function gitHandler(data) {
  if (!data.options) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Sorry, Did you say anything?",
      },
    };
  }

  // console.log(data);
  let msg = data.options[0].value;
  // console.log(msg)
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "GIT you have send msg: " + msg,
    },
  };
}

// Simple git command
export const GIT_COMMAND = {
  name: "git",
  description: "Git command Q&A bot",
  type: 1,
  options: [
    {
      name: "question",
      description: "Question user want to ask",
      type: 3,
      required: false,
    },
  ],
  handler: gitHandler,
};
