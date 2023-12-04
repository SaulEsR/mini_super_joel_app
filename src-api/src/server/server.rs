use super::routes;
use crate::utils::env::Vars;

use axum::Router;
use tracing::{event, Level};

pub async fn create_server(vars: Vars) {
    event!(Level::INFO, "Creando servidor...");

    let server = Router::new().merge(routes::status::create_route());

    let address = format!("{}:{}", vars.server_url, vars.server_port);
    dbg!(&address);

    let listener = tokio::net::TcpListener::bind(address).await.unwrap();

    axum::serve(listener, server).await.unwrap();
}
