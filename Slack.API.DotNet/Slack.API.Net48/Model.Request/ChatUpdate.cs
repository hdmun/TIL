using Newtonsoft.Json;

namespace Slack.API.Net48.Model.Request
{
    // https://api.slack.com/methods/chat.update
    public class ChatUpdate
    {
        [JsonProperty("channel", Required = Required.Always)]
        public string Channel { get; set; }

        [JsonProperty("attachments", Required = Required.Always)]
        public Attachment[] Attachments { get; set; }

        [JsonProperty("thread_ts", Required = Required.Always)]
        public string ThreadTS { get; set; }
    }
}
