import MysqlInstance from "../lib/index";
// import MysqlInstance from "../src/index";

const mysqlConnect = new MysqlInstance({
  host: "192.168.88.85",
  port: 3306,
  database: "ws",
  user: "root",
  password: "123456",
});
console.log(mysqlConnect);
async function select() {
  const rex = await mysqlConnect.executeSql(
    "INSERT INTO users (name, phone, `password`) VALUES ('aaaa', '18717248283', 'bbbb')"
  );
  console.log(123, rex);
  const res = await mysqlConnect.executeSql("SELECT * FROM users;");
  console.log(456, res);
}
setTimeout(() => {
  select();
}, 3000);
