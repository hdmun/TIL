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

        public static ChatPostMessage Create(string channel, Attachment[] attachments, string threadTimeStamp)
        {
            return new ChatPostMessage
            {
                Channel = channel,
                Attachments = attachments,
                ThreadTimeStamp = threadTimeStamp
            };
        }
    }
}
