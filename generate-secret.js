const { generateApiKey } = require("generate-api-key");
const fs = require("fs");

const filename = ".env";
fs.readFile(filename, "utf8", function (err, data) {
  let lines = [];
  if (!err) {
    lines = data.split("\n").filter((line) => {
      return !line.includes("API_SECRET");
    });
  }

  lines.unshift(`API_SECRET=${generateApiKey()}`);
  lines = lines.join("\n");

  fs.writeFile(filename, lines, (err) => {
    if (err) throw err;
    console.log("SUCCESS. API_SECRET GENERATED.");
    process.exit();
  });
});
