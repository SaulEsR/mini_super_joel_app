use once_cell::sync::Lazy;
use surrealdb::{
    engine::local::{Db as LocalDb, Mem},
    Surreal,
};
use tracing::{event, Level};

use crate::utils::env::Vars;

type Db = Surreal<LocalDb>;
static DB: Lazy<Db> = Lazy::new(Surreal::init);

pub async fn init(vars: Vars) {
    match DB.connect::<Mem>(()).await {
        Ok(_) => {
            event!(Level::DEBUG, "Conectado a la base de datos");
        }
        Err(why) => {
            event!(
                Level::ERROR,
                "Ocurrio un error al momento de conectarse a la base de datos, Razon: {}",
                why
            );
        }
    }
    event!(Level::DEBUG, "Base de datos conectado en memoria");
    let version = DB.version().await;
    event!(
        Level::DEBUG,
        "La version de la base de datos es {:?}",
        version
    );
    match DB
        .use_ns(vars.surrealdb_namespace)
        .use_db(vars.surrealdb_database)
        .await
    {
        Ok(_) => {
            event!(Level::DEBUG, "Conectado al namespace y a la base de datos");
        }
        Err(why) => {
            event!(Level::ERROR, "Ocurrio un error al momento de conectar la base de datos con un namespace, Razon {}", why);
        }
    }
}
