use crate::providers::gogoanime::{gogoanime};

pub async fn get_episode(epid: &str) -> Result<reqwest::Response, reqwest::Error> {
    let path = ["watch/", epid].join("");
    let result = gogoanime(path.as_str()).await;
    return result
}