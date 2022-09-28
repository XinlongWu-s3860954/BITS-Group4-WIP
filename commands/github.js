import { InteractionResponseType } from "discord-interactions";
import rake from "node-rake"
import fs from 'fs';
import { parse, stringify } from 'yaml'

var github_data = parse(fs.readFileSync('./data/github.yaml', 'utf8'))

function toString(array){
  let res = null;
  array.forEach((str) => {
    if (res == null){
      res = str;
    }
    else{
      res += '\n'+str
    }
  });
  
  return res;
}

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
        content: "Sorry, Did you say anything?",
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
      // added \n and a space bar for better visuals. -Kayla on 14 Sept
      content: ans == null ? "Sorry, I'm unable to answer your query :( \n Would you like to log a ticket to GitHub Support directly? \n If so, you may log a ticket at https://support.github.com/contact" : toString(ans.answer) + (ans.link ? " \n\n For more information, see: " + ans.link: ""),
    },
  });
  
  fs.appendFile('./failure_log.txt',"[Can't find answer]:" + msg + " key words:" + key_words, 
    // 写入文件后调用的回调函数
    function(err) {  
        if (err) throw err; 
        // 如果没有错误
        console.log("[Can't find answer]:" + msg + " key words:" + key_words);
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