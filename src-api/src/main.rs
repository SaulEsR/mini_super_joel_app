mod db;
mod errors;
mod models;
mod routes;
mod server;

use tracing::{event, Level};

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    tracing_subscriber::fmt()
        .with_writer(std::io::stdout)
        .init();
    event!(Level::INFO, "Inicializando...");

    let server = server::create_server().await;
    // La url se encuentra en el archivo .env que es donde se almacenaran las variables de entorno,
    // aqui estara la url con la cual se conectara el servidor, y para abrirlo estara en localhost:3000
    let port =
        std::env::var("API_URL").expect("No se encontro el puerto en las variables de entorno");

    let listener = tokio::net::TcpListener::bind(port).await.unwrap();

    axum::serve(listener, server).await.unwrap();
}
