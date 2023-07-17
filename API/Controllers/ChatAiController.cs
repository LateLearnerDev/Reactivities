using Domain;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;

namespace API.Controllers;

public class ChatAiController : BaseApiController
{
    private const string GptApiUrl = "https://api.openai.com/v1/chat/completions";

    [HttpGet]
    public async Task<ActionResult<ChatApiResponseModel>> Get(string prompt)
    {
        var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "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");
        
        var requestBody = new
        {
            model = "gpt-3.5-turbo",
            messages = new[]
            {
                new { role = "system", content = "You" },
                new { role = "user", content = prompt },
            },
        };

        var requestBodyJson = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(requestBodyJson, Encoding.UTF8, "application/json");

        var response = await httpClient.PostAsync(GptApiUrl, content);
        var responseContent = await response.Content.ReadAsStringAsync();

        var responseData = JsonSerializer.Deserialize<ChatApiResponseModel>(responseContent);

        // requestBody = new
        // {
        //     model = "gpt-3.5-turbo",
        //     messages = new[]
        //     {
        //         new { role = "user", content = prompt.ToString() }
        //     },
        //     conversationId = "conversationId"
        // };

        // requestBodyJson = JsonSerializer.Serialize(requestBody);
        // content = new StringContent(requestBodyJson, Encoding.UTF8, "application/json");
        // response = await httpClient.PostAsync(GptApiUrl, content);
        // responseContent = await response.Content.ReadAsStringAsync();
        // responseData = JsonSerializer.Deserialize<ChatApiResponseModel>(responseContent);

        return responseData;
    }
}