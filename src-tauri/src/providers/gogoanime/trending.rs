use crate::providers::gogoanime::{gogoanime};

pub async fn get_trending() -> Result<reqwest::Response, reqwest::Error> {
    let result = gogoanime("trending").await;
    return result
}