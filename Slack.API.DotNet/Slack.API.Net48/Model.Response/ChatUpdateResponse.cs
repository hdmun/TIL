using Newtonsoft.Json;

namespace Slack.API.Net48.Model.Response
{
    public class ChatUpdateResponse
    {

        [JsonProperty("ok", Required = Required.Always)]
        public bool Ok { get; set; }

        [JsonProperty("channel", Required = Required.Always)]
        public string Channel { get; set; }

        [JsonProperty("ts", Required = Required.Always)]
        public string Ts { get; set; }
    }
}
