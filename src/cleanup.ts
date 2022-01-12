import * as core from "@actions/core";
import * as exec from "@actions/exec";

import { BotFileNames, BotFilePaths, State } from "./constants";

async function run(): Promise<void> {
    core.info("Start cleanup bot server.");

    const data_dir = core.getState(State.CacheDataDirKey);
    await exec.exec("sudo", ["systemctl", "stop", "telegram-bot"]);
    await exec.exec("sudo", ["systemctl", "daemon-reload"]);
    await exec.exec("sudo", ["rm", `${BotFilePaths.Bin}/${BotFileNames.Bin}`]);
    await exec.exec("sudo", [
        "rm",
        `${BotFilePaths.Service}/${BotFileNames.Service}`
    ]);
    await exec.exec("sudo", ["rm", "-rf", data_dir]);
}

run();

export default run;
