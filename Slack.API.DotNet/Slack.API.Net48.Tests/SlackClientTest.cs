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
                Attachment.Create("good", "message (test)", null
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
                Attachment.Create("good", "message (test)", null, null)
            };
            var message = ChatPostMessage.Create(channelId, attachments, null);
            var slackClient = new SlackClient(token);
            var response = slackClient.PostMessage(message)
                                    .GetAwaiter()
                                    .GetResult();

            Assert.True(response.Ok);

            var replyattachments = new Attachment[] {
                Attachment.Create("good", "reply message (test)", null, null)
            };
            var replymessage = ChatPostMessage.Create(channelId, replyattachments, response.Ts);
            var replyresponse = slackClient.PostMessage(replymessage)
                                    .GetAwaiter()
                                    .GetResult();

            Assert.True(replyresponse.Ok);
        }

        [Theory]
        [InlineData("")]
        public void MemberMentionTest(string memberId)
        {
            Assert.True(token.Length > 0);
            Assert.True(channelId.Length > 0);
            Assert.True(memberId.Length > 0);

            ChatPostMessage message = new ChatPostMessage()
            {
                Channel = channelId,
                Attachments = new Attachment[]
                {
                    Attachment.Create(null, $"<@{memberId}> mention! (title)", "<@{userId}> mention! (text)", null)
                },
                ThreadTimeStamp = "",
            };

            var slackClient = new SlackClient(token);
            var response = slackClient.PostMessage(message)
                                    .GetAwaiter()
                                    .GetResult();
            Assert.True(response.Ok);
        }
    }
}
