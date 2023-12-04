mod db;
mod server;
mod utils;

use crate::{db::database::init, server::server::create_server, utils::env::Vars};

use tracing::{event, Level};

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    tracing_subscriber::fmt()
        .with_writer(std::io::stdout)
        .init();

    event!(Level::INFO, "Inicializando...");

    // Guardar todas las variables de entorno en una structura guardada en esta variable
    let env_vars = Vars::init();

    // Conectarse con la base de datos
    init(env_vars.clone()).await;

    // Conectarse con el servidor
    create_server(env_vars).await;
}
