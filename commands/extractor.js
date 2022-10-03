import { InteractionResponseType } from "discord-interactions";
import rake from "node-rake"

function extractorHandler(data) {
  if (!data.options) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Sorry, Did you say anything?",
      },
    };
  }

  let msg = data.options[0].value;
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "Result: " + rake.generate(msg),
    },
  };
}

// Simple extractor command
export const EXTRACTOR_COMMAND = {
  name: "extractor",
  description: "Preview key word extractor",
  type: 1,
  options: [
    {
      name: "question",
      description: "Question user want to ask",
      type: 3,
      required: false,
    },
  ],
  handler: extractorHandler,
};
