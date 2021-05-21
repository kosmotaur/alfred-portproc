//lsof -n -i4TCP:{clipboard} | grep LISTEN

const alfy = require("alfy");
const { exec } = require("shelljs");
const port = Number(alfy.input);
const extractProcessName = (lsofOutput) => lsofOutput.split(/\s+/)[0];
const extractPID = (lsofOutput) => lsofOutput.split(/\s+/)[1];

if (!isNaN(port)) {
  const output = exec(`lsof -n -i4TCP:${port} | grep LISTEN`, {
    silent: true,
  }).stdout;
  const processName = extractProcessName(output);
  const processId = extractPID(output);
  if (processName.length > 0 && processId.length > 0) {
    alfy.output([
      {
        title: processName,
        subtitle: processId,
        arg: processId,
      },
    ]);
  }
}
