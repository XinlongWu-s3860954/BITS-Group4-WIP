import rake from "node-rake"
export function extractor(req, res) {
  if (req.params.str) res.send(rake.generate(req.params.str));
  else res.send("No word");
}
