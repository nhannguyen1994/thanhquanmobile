const {db,} = require('../pgp');

class Categories {

  constructor(cat_id, cat_name, status) {  //Use ES6 optional parameter
    this.cat_id = cat_id;
    this.cat_name = cat_name;
    this.status = status;
  }

  static all(arr) {
    return arr;
  }

  static findById(id) {
    return db.one("SELECT * FROM cms.class WHERE id = $1", [id])
      .then(data => {
        return new Class(data.name, data.id);
      })
      .catch(error => {
        return error;
      })
  }

  /**
   * Search class by name exact or like
   * @param {string} name
   * @param {string} operator can be either = or LIKE
   * @returns {Promise.<T>}
   */
  static findByName(name, operator) {

    let query;

    switch (operator) {
      case "=":
        query = "SELECT * FROM cms.class WHERE name = $1";
        break;
      case "LIKE":
        query = "SELECT * FROM cms.class WHERE name LIKE '%$1#%'";
        break;
    }

    return db.one(query, [name])
      .then(data => {
        return new Class(data.name, data.id);
      })
      .catch(error => {
        return error;
      })
  }
}

module.exports = Categories;