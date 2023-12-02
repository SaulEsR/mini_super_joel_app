use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;
use tokio::task::JoinError;

#[derive(thiserror::Error, Debug)]
#[error("Solicitud Incorrecta")]
pub struct BadRequest {}

#[derive(thiserror::Error, Debug)]
#[error("No Encontrado")]
pub struct NotFound {}

#[derive(thiserror::Error, Debug)]
#[error("...")]
pub enum Error {
    #[error("{0}")]
    BadRequest(#[from] BadRequest),

    #[error("{0}")]
    NotFound(#[from] NotFound),

    #[error("{0}")]
    RunSyncTask(#[from] JoinError),
}

impl Error {
    fn get_codes(&self) -> (StatusCode, u16) {
        match *self {
            // Errores de codigo - 4XX
            Error::BadRequest(_) => (StatusCode::BAD_REQUEST, 40002),
            Error::NotFound(_) => (StatusCode::NOT_FOUND, 40003),
            // Errores de codigo - 5XX
            Error::RunSyncTask(_) => (StatusCode::INTERNAL_SERVER_ERROR, 5005),
        }
    }

    // pub fn bad_request() -> Self {
    //     Error::BadRequest(BadRequest {})
    // }

    // pub fn not_found() -> Self {
    //     Error::NotFound(NotFound {})
    // }
}

impl IntoResponse for Error {
    fn into_response(self) -> Response {
        let (status_code, code) = self.get_codes();
        let message = self.to_string();
        let body = Json(json!({ "code": code, "message": message }));

        (status_code, body).into_response()
    }
}