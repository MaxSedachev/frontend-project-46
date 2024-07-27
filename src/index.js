import fs from "node:fs";
import path from "node:path";

const getPath = (filePath) => path.resolve(process.cwd(), filePath);
const getFile = (filePath) => fs.readFileSync(filePath, "utf8");
const parse = (file1) => JSON.parse(file1);


const getDiff = (filepath1, filepath2) => {
    const path1 = getPath(filepath1);
    const path2 = getPath(filepath2);

    const file1 = getFile(path1)
    const file2 = getFile(path2)

    const parsedFile1 = parse(file1)
    const parsedFile2 = parse(file2)
    console.log("parsedFile1:", parsedFile1)
    console.log("parsedFile2:", parsedFile2)
};

export default getDiff;