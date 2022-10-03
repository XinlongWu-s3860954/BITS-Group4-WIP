import { InteractionResponseType } from "discord-interactions";
import { GITHUB_COMMAND } from "../commands/github";

test("test no input", () => {
  expect(
    GITHUB_COMMAND.handler({
      options: false,
    })
  ).toEqual({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "Sorry, Did you say anything?",
    },
  });
});

test("test invalid question", () => {
  expect(
    GITHUB_COMMAND.handler({
      options: [{ value: "How can I test this?" }],
      test: true,
    })
  ).toEqual({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content:
        "Sorry, I'm unable to answer your query :( \n Would you like to log a ticket to GitHub Support directly? \n If so, you may log a ticket at https://support.github.com/contact",
    },
  });
});

test("test valid question", () => {
  expect(
    GITHUB_COMMAND.handler({
      options: [{ value: "how can I set up SSH key passphrases" }],
      test: false,
    })
  ).toEqual({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content:
        '1. Copy the SSH public key to your clipboard.\n2. In the upper-right corner of any page, click your profile photo, then click Settings.\n3. In the "Access" section of the sidebar, click  SSH and GPG keys.\n4. Click New SSH key or Add SSH key.\n5. In the "Title" field, add a descriptive label for the new key. For example, if you are using a personal laptop, you might call this key "Personal laptop".\n6. Select the type of key, either authentication or signing\n7. Paste your key into the "Key" field.\n8. Click Add SSH key. \n\n For more information, see: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account',
    },
  });
});
