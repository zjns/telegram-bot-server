export enum Inputs {
    ApiId = "api_id",
    ApiHash = "api_hash",
    Port = "server-port"
}

export enum Outputs {
    Server = "server"
}

export enum State {
    CacheDataDirKey = "CACHE_DATA_DIR"
}

export enum BotFileNames {
    Service = "telegram-bot.service",
    Bin = "telegram-bot-api"
}

export enum BotFilePaths {
    Data = "/usr/local/tbot_data",
    Service = "/etc/systemd/system",
    Bin = "/usr/local/bin"
}
