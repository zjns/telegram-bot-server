import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as io from "@actions/io";

import {
    BotFileNames,
    BotFilePaths,
    Inputs,
    Outputs,
    State
} from "./constants";

async function run(): Promise<void> {
    const api_id = core.getInput(Inputs.ApiId, { required: true });
    const api_hash = core.getInput(Inputs.ApiHash, { required: true });
    const port = core.getInput(Inputs.Port);
    const data_dir = BotFilePaths.Data;

    const tbotfiles = "../../tbotfiles";
    const server = `http://127.0.0.1:${port}`;
    const workspace = "./workspace";

    core.setSecret(api_id);
    core.setSecret(api_hash);

    core.saveState(State.CacheDataDirKey, data_dir);

    core.setOutput(Outputs.Server, server);

    await io.mkdirP(workspace);
    await io.cp(tbotfiles, workspace, { recursive: true });

    core.info("Start setup bot server.");
    await exec.exec("sed", [
        "-i",
        `s@\${TID}@${api_id}@g`,
        `${workspace}/${BotFileNames.Service}`
    ]);
    await exec.exec("sed", [
        "-i",
        `s@\${THASH}@${api_hash}@g`,
        `${workspace}/${BotFileNames.Service}`
    ]);
    await exec.exec("sed", [
        "-i",
        `s@\${TPORT}@${port}@g`,
        `${workspace}/${BotFileNames.Service}`
    ]);
    await exec.exec("sed", [
        "-i",
        `s@\${TDATA}@${data_dir}@g`,
        `${workspace}/${BotFileNames.Service}`
    ]);

    const bin_file = `${BotFilePaths.Bin}/${BotFileNames.Bin}`;
    const service_file = `${BotFilePaths.Bin}/${BotFileNames.Service}`;
    await exec.exec("sudo", [
        "cp",
        `${workspace}/${BotFileNames.Bin}`,
        bin_file
    ]);
    await exec.exec("sudo", [
        "cp",
        `${workspace}/${BotFileNames.Service}`,
        service_file
    ]);
    await exec.exec("sudo", ["chmod", "755", bin_file]);
    await exec.exec("sudo", ["chmod", "644", service_file]);
    await exec.exec("sudo", ["chown", "root:root", bin_file]);
    await exec.exec("sudo", ["chown", "root:root", service_file]);
    await exec.exec("sudo", ["mkdir", "-p", data_dir]);
    await exec.exec("sudo", ["chmod", "755", data_dir]);

    await exec.exec("sudo", ["systemctl", "daemon-reload"]);
    await exec.exec("sudo", ["systemctl", "start", "telegram-bot"]);
    // wait to make sure service running
    // not found a better way yet
    await exec.exec("sudo", ["sleep", "1"]);

    core.info("Bot server setup finished.");
}

run();

export default run;
