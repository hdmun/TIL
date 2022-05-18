using Newtonsoft.Json;

namespace Slack.API.Net48.Model.Request
{
    public class Attachment
    {
        [JsonProperty("color")]
        public string Color { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("fields")]
        public AttachmentField[] Fields { get; set; }

        public static Attachment Create(string color, string title, string text, AttachmentField[] fields)
        {
            return new Attachment
            {
                Color = color,
                Title = title,
                Text = text,
                Fields = fields
            };
        }
    }
}
