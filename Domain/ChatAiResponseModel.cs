// using System.Text.Json;
// using System.Text.Json.Serialization;

// namespace Domain;

// public class ChatAiResponseModel
// {
//     public JsonElement Response { get; set; }
//     public string[] Replies { get; set; }
// }

// public class Choice
// {
//     [JsonPropertyName("index")]
//     public int Index { get; set; }

//     [JsonPropertyName("message")]
//     public Message Message { get; set; }

//     [JsonPropertyName("finish_reason")]
//     public string FinishReason { get; set; }
// }

// public class Message
// {
//     [JsonPropertyName("role")]
//     public string Role { get; set; }

//     [JsonPropertyName("content")]
//     public string Content { get; set; }
// }

// public class Response
// {
//     [JsonPropertyName("id")]
//     public string Id { get; set; }

//     [JsonPropertyName("object")]
//     public string Object { get; set; }

//     [JsonPropertyName("created")]
//     public int Created { get; set; }

//     [JsonPropertyName("model")]
//     public string Model { get; set; }

//     [JsonPropertyName("choices")]
//     public List<Choice> Choices { get; set; }

//     [JsonPropertyName("usage")]
//     public Usage Usage { get; set; }
// }

// public class Completion
// {
//     [JsonPropertyName("response")]
//     public Response Response { get; set; }

//     [JsonPropertyName("replies")]
//     public List<string> Replies { get; set; }
// }

// public class Usage
// {
//     [JsonPropertyName("prompt_tokens")]
//     public int PromptTokens { get; set; }

//     [JsonPropertyName("completion_tokens")]
//     public int CompletionTokens { get; set; }

//     [JsonPropertyName("total_tokens")]
//     public int TotalTokens { get; set; }
// }

using System.Text.Json.Serialization;

public class ChatApiResponseModel
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("object")]
    public string Object { get; set; }

    [JsonPropertyName("created")]
    public long Created { get; set; }

    [JsonPropertyName("model")]
    public string Model { get; set; }

    [JsonPropertyName("choices")]
    public List<Choice> Choices { get; set; }

    [JsonPropertyName("usage")]
    public UsageData Usage { get; set; }
}

public class Choice
{
    [JsonPropertyName("index")]
    public int Index { get; set; }

    [JsonPropertyName("message")]
    public Message Message { get; set; }

    [JsonPropertyName("finish_reason")]
    public string FinishReason { get; set; }
}

public class Message
{
    [JsonPropertyName("role")]
    public string Role { get; set; }

    [JsonPropertyName("content")]
    public string Content { get; set; }
}

public class UsageData
{
    [JsonPropertyName("prompt_tokens")]
    public int PromptTokens { get; set; }

    [JsonPropertyName("completion_tokens")]
    public int CompletionTokens { get; set; }

    [JsonPropertyName("total_tokens")]
    public int TotalTokens { get; set; }

    public double PromptTokensPrice => ((float)PromptTokens) / 1000 * 0.0015;
    public double CompletionTokensPrice => ((float)PromptTokens) / 1000 * 0.002;
    public double TotalPrice => Math.Round(PromptTokensPrice + CompletionTokensPrice, 6);
}
