use db::database::Database;

mod db;

#[tokio::main]
async fn main() {
    let db = Database::init().await.expect("err connecting to database");
    dbg!(db);
}
