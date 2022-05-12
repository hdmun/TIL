using Slack.API.Net48.Model.Request;
using Xunit;

namespace Slack.API.Net48.Tests
{
    public class SlackClientTest
    {
        [Fact]
        public void PostMessageTest()
        {
            string token = "";
            string channelId = "";

            Assert.True(token.Length > 0);
            Assert.True(channelId.Length > 0);

            var attachments = new Attachment[] {
                Attachment.Create("good", "테스트 메세지"
                    , new AttachmentField[] {
                        AttachmentField.Create("title1", "value1", true),
                        AttachmentField.Create("title2", "value2", true),
                        AttachmentField.Create("title3", "value3"),
                    })
            };
            var message = ChatPostMessage.Create(channelId, attachments, null);
            var slackClient = new SlackClient(token);
            var response = slackClient.PostMessage(message)
                                    .GetAwaiter()
                                    .GetResult();

            Assert.True(response.Ok);
        }
    }
}
