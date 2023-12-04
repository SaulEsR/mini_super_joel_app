use std::env;

#[derive(Clone, Debug)]
pub struct Vars {
    pub server_url: String,
    pub server_port: String,
    pub surrealdb_username: String,
    pub surrealdb_password: String,
    pub surrealdb_namespace: String,
    pub surrealdb_database: String,
}

impl Vars {
    pub fn init() -> Self {
        // Cargando las variables de entorno para la conexion del servidor
        let server_url = env::var("SERVER_URL").unwrap_or("127.0.0.1".to_string());
        let server_port = env::var("SERVER_PORT").unwrap_or("8000".to_string());
        // Cargando las variables de entorno para la conexion con la base de datos
        let surrealdb_username = env::var("SURREALDB_USERNAME").unwrap_or("root".to_string());
        let surrealdb_password = env::var("SURREALDB_PASSWORD").unwrap_or("root".to_string());
        let surrealdb_namespace =
            env::var("SURREALDB_NAMESPACE").unwrap_or("abarrotes".to_string());
        let surrealdb_database =
            env::var("SURREALDB_DATABASE").unwrap_or("minisuperjoel".to_string());

        Self {
            server_url,
            server_port,
            surrealdb_username,
            surrealdb_password,
            surrealdb_namespace,
            surrealdb_database,
        }
    }
}
