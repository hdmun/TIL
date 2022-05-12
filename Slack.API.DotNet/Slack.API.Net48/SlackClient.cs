using Newtonsoft.Json;
using Slack.API.Net48.Model.Request;
using Slack.API.Net48.Model.Response;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Slack.API.Net48
{
    public class SlackClient
    {
        private readonly string baseAddress = "https://slack.com";
        private readonly string token;

        public SlackClient(string token)
        {
            this.token = token;
        }

        public async Task<ChatPostMessageResponse> PostMessage(ChatPostMessage message)
        {
            var content = JsonConvert.SerializeObject(message);

            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseAddress);
                httpClient.DefaultRequestHeaders.Accept
                      .Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var request = new HttpRequestMessage(HttpMethod.Post, "/api/chat.postMessage")
                {
                    Content = new StringContent(content, Encoding.UTF8, "application/json"),
                };
                request.Headers.Authorization
                    = new AuthenticationHeaderValue("Bearer", token);

                var response = await httpClient.SendAsync(request);
                var responseBody = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<ChatPostMessageResponse>(responseBody);
            }
        }
    }
}
