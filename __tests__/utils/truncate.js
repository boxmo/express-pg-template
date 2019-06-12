import connection from "../../src/database/connection";

module.exports = () => {
  return Promise.all(
    Object.keys(connection.models).map(key => {
      return connection.models[key].destroy({ truncate: true, force: true });
    })
  );
};
