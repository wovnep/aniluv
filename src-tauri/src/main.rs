#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use crate::providers::gogoanime;
mod http;
mod providers;

#[tauri::command]
async fn gogo_search(q: String) -> serde_json::Value {
    let result = gogoanime::search::get_search(q.as_str()).await;
    let main_res  = result.unwrap_or_else(|_err|{ panic!("Reqwest failed")}).json().await;
    let value = match main_res {
        Ok(success_value) => {
            success_value
        },
        Err(error) => {
            let status_code = error.status().unwrap_or(reqwest::StatusCode::INTERNAL_SERVER_ERROR);
            let error_message = serde_json::json!({
                "error": true,
                "status": status_code.as_u16()
            });
            error_message
        }
    };
    value
}

#[tauri::command]
async fn gogo_info(id: String) -> serde_json::Value {
    let result = gogoanime::info::get_info(id.as_str()).await;
    let main_res  = result.unwrap_or_else(|_err|{ panic!("Reqwest failed")}).json().await;
    let value = match main_res {
        Ok(success_value) => {
            success_value
        },
        Err(error) => {
            let status_code = error.status().unwrap_or(reqwest::StatusCode::INTERNAL_SERVER_ERROR);
            let error_message = serde_json::json!({
                "error": true,
                "status": status_code.as_u16()
            });
            error_message
        }
    };
    value
}

#[tauri::command]
async fn gogo_episode(epid: String) -> serde_json::Value {
    let result = gogoanime::episode::get_episode(epid.as_str()).await;
    let main_res  = result.unwrap_or_else(|_err|{ panic!("Reqwest failed")}).json().await;
    let value = match main_res {
        Ok(success_value) => {
            success_value
        },
        Err(error) => {
            let status_code = error.status().unwrap_or(reqwest::StatusCode::INTERNAL_SERVER_ERROR);
            let error_message = serde_json::json!({
                "error": true,
                "status": status_code.as_u16()
            });
            error_message
        }
    };
    value
}

#[tauri::command]
async fn gogo_trending() -> serde_json::Value {
    let result = gogoanime::trending::get_trending().await;
    let main_res  = result.unwrap_or_else(|_err|{ panic!("Reqwest failed")}).json().await;
    let value = match main_res {
        Ok(success_value) => {
            success_value
        },
        Err(error) => {
            let status_code = error.status().unwrap_or(reqwest::StatusCode::INTERNAL_SERVER_ERROR);
            let error_message = serde_json::json!({
                "error": true,
                "status": status_code.as_u16()
            });
            error_message
        }
    };
    value
}

#[tauri::command]
async fn gogo_popular() -> serde_json::Value {
    let result = gogoanime::popular::get_popular().await;
    let main_res  = result.unwrap_or_else(|_err|{ panic!("Reqwest failed")}).json().await;
    let value = match main_res {
        Ok(success_value) => {
            success_value
        },
        Err(error) => {
            let status_code = error.status().unwrap_or(reqwest::StatusCode::INTERNAL_SERVER_ERROR);
            let error_message = serde_json::json!({
                "error": true,
                "status": status_code.as_u16()
            });
            error_message
        }
    };
    value
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![gogo_search, gogo_info, gogo_episode, gogo_trending, gogo_popular])
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}