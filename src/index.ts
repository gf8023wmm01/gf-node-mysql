import mysql, { Pool, PoolConnection } from "mysql2";
import type { PoolConfigType } from "./type";
import { connect } from "@/sqlFn/index";

class MysqlInstance {
  private poolConfig: PoolConfigType; //sql配置
  public instance: PoolConnection | null;
  constructor(poolConfig: PoolConfigType) {
    this.poolConfig = poolConfig;
    this.instance = null;
    this.createSqlPool();
  }
  createSqlPool() {
    return new Promise(async (resolve) => {
      if (this.instance !== null) {
        resolve(this.instance);
      } else {
        const { host, port, database, user, password } = this.poolConfig;
        const connectInstance: Pool = mysql.createPool({
          host,
          port: Number(port),
          database,
          user,
          password,
        });
        const connectInfo = await connect(connectInstance);
        this.instance = connectInfo;
        this.instance.on("error", (err) => {
          setTimeout(() => {
            this.instance = null;
            this.createSqlPool();
          }, 5000);
          console.error("MySQL连接已断开:", err);
        });
        resolve(connectInfo);
      }
    });
  }
  async executeSql(sqlStr: string, values?: any[]) {
    return new Promise((resolve) => {
      if (this.instance === null) {
        resolve("not connect");
      } else {
        // let result: any = null;
        if (values) {
          this.instance.execute(sqlStr, values, function (err, results) {
            // function (err, results, fields) {
            // console.log(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            if (!results) {
              resolve("fail");
            } else {
              resolve(results);
            }
          });
        } else {
          this.instance.execute(sqlStr, function (err, results) {
            if (!results) {
              resolve("fail");
            } else {
              resolve(results);
            }
          });
        }
      }
    });
  }
}

export default MysqlInstance;
