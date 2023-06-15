use serde_json::{ Value, Map };
use reqwest::header::{ HeaderMap, CONTENT_TYPE };
// headers: HeaderMap, body:Map<String, Value>,
pub async fn client(method: reqwest::Method, url: reqwest::Url) ->  Result<reqwest::Response, reqwest::Error>  {
    let mut default_headers = HeaderMap::new();
        default_headers.insert(CONTENT_TYPE, "application/json".parse().unwrap());
    let client_builder = reqwest::ClientBuilder::new()
        .default_headers(default_headers);
    let client = client_builder.build().expect("TLS backend error");
    let response = client
        .request(method, url)
        // .headers(headers)
        // .json(&body)
        .send()
        .await;

    return response;
}