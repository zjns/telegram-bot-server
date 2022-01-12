# Telegram Bot Server
This action allow you run a local telegram bot server in workflows.

With this action, you'll unlock some limitations, details in [here](https://core.telegram.org/bots/api#using-a-local-bot-api-server). If you only need do something about telegram in github workflows, like upload a larger(bigger than 50MB) app to telegram channel when build finished, it's a good choice.

## Usage

### Inputs
* `api_id` - Telegram [api_id](https://core.telegram.org/api/obtaining_api_id), required.
* `api_hash` - Telegram [api_hash](https://core.telegram.org/api/obtaining_api_id), required.
* `server-port` - Local server port to deploy, optional, default to `8088`.

### Outputs
* `server` - Server address. it will be `http://127.0.0.1:8088` if `server-port` not changed.

## State
Only support `Ubuntu` now. Not support `Windows` and `macOS` yet.

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE).
