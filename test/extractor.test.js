import { EXTRACTOR_COMMAND } from "../commands/extractor.js";
import { InteractionResponseType } from "discord-interactions";

test('test no input', () => {
    expect(EXTRACTOR_COMMAND.handler({
        options: false
    })).toEqual({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: "Sorry, Did you say anything?",
          }
    });
});

test('test input', () => {
    expect(EXTRACTOR_COMMAND.handler({
        options: [{value: "How can I test this?"}]
    })).toEqual({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: "Result: test",
          }
    });
});