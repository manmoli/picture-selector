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
      const matchPicture = picturesNames.find((pic) => pic.includes(fileName));
      if (matchPicture) {
        return fs.copyFile(
          "./" + matchPicture,
          picDirectory + "/" + matchPicture
        );
      }
    })
  );
}

main();
