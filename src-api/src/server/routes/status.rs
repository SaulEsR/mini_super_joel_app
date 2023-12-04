use crate::utils::errors::Error;
use axum::{routing::get, Json, Router};
use serde::{Deserialize, Serialize};
use tracing::{event, Level};

#[derive(Serialize, Deserialize, Debug)]
pub struct Status {
    status: String,
}

pub fn create_route() -> Router {
    Router::new().route("/status", get(get_status))
}

async fn get_status() -> Result<Json<Status>, Error> {
    event!(Level::DEBUG, "Retornando el estado de la api");

    Ok(Json(Status {
        status: "Ok".to_owned(),
    }))
}
