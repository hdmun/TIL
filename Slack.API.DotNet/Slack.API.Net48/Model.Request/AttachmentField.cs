using Newtonsoft.Json;

namespace Slack.API.Net48.Model.Request
{
    public class AttachmentField
    {
        [JsonProperty("title", Required = Required.Always)]
        public string Title { get; set; }

        [JsonProperty("value", Required = Required.Always)]
        public string Value { get; set; }

        [JsonProperty("short")]
        public bool Short { get; set; }

        public static AttachmentField Create(string title, string value, bool short_ = false)
        {
            return new AttachmentField
            {
                Title = title,
                Value = value,
                Short = short_
            };
        }
    }
}
