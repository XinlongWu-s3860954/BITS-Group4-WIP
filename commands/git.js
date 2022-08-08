function gitHandler(res,req,data){
  res.send("Git command")
}

// Simple git command
export const GIT_COMMAND = {
  name: 'git',
  description: 'Git command Q&A bot',
  type: 1,
  handler: gitHandler
};