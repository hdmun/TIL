using Newtonsoft.Json;

namespace Slack.API.Net48.Model.Request
{
    // https://api.slack.com/methods/chat.postMessage
    public class ChatPostMessage
    {
        [JsonProperty("channel", Required = Required.Always)]
        public string Channel { get; set; }

        [JsonProperty("attachments")]
        public Attachment[] Attachments { get; set; }

        [JsonProperty("thread_ts")]
        public string ThreadTimeStamp { get; set; }

        [JsonProperty("link_names")]
        public bool LinkNames { get; set; }

        public static ChatPostMessage Create(string channel, Attachment[] attachments, string threadTimeStamp, bool linkNames = false)
        {
            return new ChatPostMessage
            {
                Channel = channel,
                Attachments = attachments,
                ThreadTimeStamp = threadTimeStamp,
                LinkNames = linkNames
            };
        }
    }
}
