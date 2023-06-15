use crate::providers::gogoanime::{gogoanime};

pub async fn get_info(id: &str) -> Result<reqwest::Response, reqwest::Error>  {
    let path = ["info/", id, "?provider=gogoanime"].join("");
    let result = gogoanime(path.as_str()).await;
    return result
}