import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";
import {
  VerifyDiscordRequest,
  getRandomEmoji,
  DiscordRequest,
} from "./utils.js";
import { getShuffledOptions, getResult } from "./game.js";
import {
  TEST_COMMAND,
  HasGuildCommands,
  RemoveGuildCommand,
  UpdateGuildCommand,
} from "./commands.js";

import { GIT_COMMAND } from "./commands/git.js";
import { EXTRACTOR_COMMAND } from "./commands/extractor.js";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

const COMMANDS_LIST = [TEST_COMMAND, GIT_COMMAND, EXTRACTOR_COMMAND];

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    COMMANDS_LIST.forEach((command) => {
      if (name === command.name) {
        command.handler(res, req, data);
      }
    });
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);

  // Check if guild commands from commands.json are installed (if not, install them)
  HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, COMMANDS_LIST);
  // RemoveGuildCommand(process.env.APP_ID, process.env.GUILD_ID, '1006038614234374256')
  // UpdateGuildCommand(process.env.APP_ID, process.env.GUILD_ID, '1006198446455259206', GIT_COMMAND)
});
