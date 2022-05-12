using Slack.API.Net48.Model.Request;
using Xunit;

namespace Slack.API.Net48.Tests
{
    public class SlackClientTest
    {
        private readonly string token = "";
        private readonly string channelId = "";

        [Fact]
        public void PostMessageTest()
        {
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

        [Fact]
        public void ReplyAfterPostMessageTest()
        {
            Assert.True(token.Length > 0);
            Assert.True(channelId.Length > 0);

            var attachments = new Attachment[] {
                Attachment.Create("good", "테스트 메세지", null)
            };
            var message = ChatPostMessage.Create(channelId, attachments, null);
            var slackClient = new SlackClient(token);
            var response = slackClient.PostMessage(message)
                                    .GetAwaiter()
                                    .GetResult();

            Assert.True(response.Ok);

            var replyattachments = new Attachment[] {
                Attachment.Create("good", "리플 메세지 테스트", null)
            };
            var replymessage = ChatPostMessage.Create(channelId, replyattachments, response.Ts);
            var replyresponse = slackClient.PostMessage(replymessage)
                                    .GetAwaiter()
                                    .GetResult();

            Assert.True(replyresponse.Ok);
        }
    }
}
