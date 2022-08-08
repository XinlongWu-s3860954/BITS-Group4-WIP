import { InteractionResponseType } from "discord-interactions";

function gitHandler(res, req, data) {
  if (data.options.length === 0) {
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Sorry, Did you say anything?",
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
      content: "GIT you have send msg: " + msg,
    },
  });
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
