const path = require("path");

const testname = () => {
  const filePath = path.join(__dirname, "../../../../");
  console.log(filePath);
};
testname();
