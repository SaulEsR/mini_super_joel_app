use axum::Router;
use tracing::{event, Level};

use crate::routes;

pub async fn create_server() -> Router {
    event!(Level::INFO, "Creando servidor...");

    Router::new().merge(routes::status::create_route())
}
