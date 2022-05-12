using Newtonsoft.Json;

namespace Slack.API.Net48.Model.Request
{
    public class Attachment
    {
        [JsonProperty("color", Required = Required.Always)]
        public string Color { get; set; }

        [JsonProperty("title", Required = Required.Always)]
        public string Title { get; set; }

        [JsonProperty("fields")]
        public AttachmentField[] Fields { get; set; }

        public static Attachment Create(string color, string title, AttachmentField[] fields)
        {
            return new Attachment
            {
                Color = color,
                Title = title,
                Fields = fields
            };
        }
    }
}
