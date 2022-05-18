using Newtonsoft.Json;

namespace Slack.API.Net48.Model.Response
{
    public class ChatPostMessageResponse
    {
        [JsonProperty("ok", Required = Required.Always)]
        public bool Ok { get; set; }

        [JsonProperty("channel")]
        public string Channel { get; set; }

        [JsonProperty("ts")]
        public string Ts { get; set; }
    }
}
