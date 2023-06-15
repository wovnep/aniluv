use crate::providers::gogoanime::{ gogoanime };

pub async fn get_search(q: &str) -> Result<reqwest::Response, reqwest::Error> {
    let result = gogoanime(q).await;
    return result;
}