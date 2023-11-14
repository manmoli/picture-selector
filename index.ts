import * as fs from "node:fs/promises";
import * as childProcess from "child_process";

const listDoc = "./selection.txt";
const picDirectory = "./selections";

async function main() {
  childProcess.exec(`mkdir ${picDirectory}`);
  const data = await fs.readFile(listDoc, "utf-8");
  const fileNames = data.split(/\r?\n/);
  const picturesNames = await fs.readdir("./");

  await Promise.all(
    fileNames.map((fileName) => {
      const matchPicture = picturesNames.find((pic) => pic.includes(extractConsecutiveNumbers(fileName)));
      if (matchPicture) {
        return fs.copyFile(
          "./" + matchPicture,
          picDirectory + "/" + matchPicture
        );
      }
    })
  );
}

function extractConsecutiveNumbers(inputString: string) {
  // Use a regular expression to find all sequences of 4 or more consecutive digits
  const matches = inputString.match(/\d{4,}/g);

  if (matches) {
    // Join the sequences if there are multiple matches
    return matches.join('');
  } else {
    // Return an empty string if no such sequences are found
    return '';
  }
}

main();
