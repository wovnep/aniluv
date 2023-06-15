use crate::providers::gogoanime::{gogoanime};

pub async fn get_popular() -> Result<reqwest::Response, reqwest::Error> {
    let result = gogoanime("popular").await;
    return result
}