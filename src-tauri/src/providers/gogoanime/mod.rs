use crate::http::client::{ client };
use reqwest::Url;

pub mod search;
pub mod info;
pub mod trending;
pub mod popular;
pub mod episode;

pub async fn gogoanime(url: &str) -> Result<reqwest::Response, reqwest::Error>{
    let base_url = Url::parse("https://api.consumet.org/meta/anilist/").unwrap();
    let final_url = base_url.join(url).unwrap();
    let response = client(reqwest::Method::GET, final_url).await;
    return response;
}