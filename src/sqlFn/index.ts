import { Pool, PoolConnection } from "mysql2";

/**
 * @function connect 连接mysql
 * @param {Pool} connections 连接实例
 *
 */
export const connect = (connections: Pool): Promise<PoolConnection> => {
  return new Promise((resolve) => {
    connections.getConnection((err, conn) => {
      conn.connect((err) => {
        if (err) {
          console.log("数据库连接失败", err);
          setTimeout(() => {
            connect(connections);
          }, 30000); //30秒后重连
        } else {
          console.log("连接数据库成功");
          resolve(conn);
        }
      });
    });
  });
};
