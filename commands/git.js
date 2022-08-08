import { InteractionResponseType } from "discord-interactions";

function gitHandler(res, req, data) {
  console.log(data);
  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "GIT you have send msg: ",
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
      required: true,
    },
  ],
  handler: gitHandler,
};
