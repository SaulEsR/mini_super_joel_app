use surrealdb::{
    engine::remote::ws::{Client, Ws},
    opt::auth::Root,
    Error, Surreal,
};

#[derive(Clone, Debug)]
pub struct Database {
    pub client: Surreal<Client>,
    pub name_space: String,
    pub db_name: String,
}

impl Database {
    // Remover cuando este listo la api para mandar contenido
    #[allow(dead_code)]
    pub async fn init() -> Result<Self, Error> {
        // Para que se conecte con surreal, tenemos que iniciar el servidor en remoto
        // el comando es surreal start file:abarrotes.db --user root --password root
        let client = Surreal::new::<Ws>("127.0.0.1:8000").await?;

        client
            .signin(Root {
                username: "root",
                password: "root",
            })
            .await?;
        client.use_ns("surreal").use_db("abarrotes").await.unwrap();

        Ok(Database {
            client,
            name_space: String::from("surreal"),
            db_name: String::from("abarrotes"),
        })
    }
}
