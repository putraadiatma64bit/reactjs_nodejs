const mysql = require("mysql");

// Buat pool koneksi
const pool = mysql.createPool({
  connectionLimit: 10, // Jumlah maksimal koneksi yang dapat dibuka dalam pool
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Fungsi untuk mendapatkan nilai dari tabel berdasarkan inputan
function field(field, table, pk_field, pk_value) {
  return new Promise((resolve, reject) => {
    // Lakukan query untuk mendapatkan data dari tabel menggunakan pool koneksi
    const query = `SELECT ${field} FROM ${table} WHERE ${pk_field} = ? LIMIT 1`;

    pool.query(query, [pk_value], (error, results) => {
      if (error) {
        console.error("Error while fetching data from table:", error);
        return reject(error);
      }

      if (results.length > 0) {
        return resolve(results[0][field]);
      } else {
        return resolve(null);
      }
    });
  });
}
// Fungsi untuk menjalankan query ke database
function query(queryString, params) {
  return new Promise((resolve, reject) => {
    pool.query(queryString, params, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return reject(error);
      }
      resolve(results);
    });
  });
}

// Fungsi untuk mendapatkan satu nilai dari sebuah field dalam sebuah tabel berdasarkan kriteria tertentu
function field_ex(field, table, where) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT ${field} FROM ${table} WHERE ? LIMIT 1`;
      const results = await query(query, where);
      if (results.length > 0) {
        resolve(results[0][field]);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan total jumlah dari sebuah field dalam sebuah tabel berdasarkan kriteria tertentu
function field_sum(field, table, pk_field, pk_value) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT SUM(${field}) AS total FROM ${table} WHERE ${pk_field} = ? LIMIT 1`;
      const results = await query(query, pk_value);
      if (results.length > 0) {
        resolve(results[0].total);
      } else {
        resolve(0);
      }
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan total jumlah dari sebuah field dalam sebuah tabel berdasarkan kriteria tertentu dengan array where
function field_sum_ex(field, table, where) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT SUM(${field}) AS total FROM ${table} WHERE ? LIMIT 1`;
      const results = await query(query, where);
      if (results.length > 0) {
        resolve(results[0].total);
      } else {
        resolve(0);
      }
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan data dari sebuah tabel
function fields(table, perpage = null) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table} ${
        perpage > 0 ? "LIMIT ? OFFSET 0" : ""
      }`;
      const results = await query(query, perpage);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan data dari sebuah tabel berdasarkan primary key dan jumlah data per halaman
function fields_list(table, pk_field, pk_value, perpage = null) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table} WHERE ${pk_field} = ? ${
        perpage > 0 ? "LIMIT ? OFFSET 0" : ""
      }`;
      const params = perpage ? [pk_value, perpage] : [pk_value];
      const results = await query(query, params);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan data dari sebuah tabel berdasarkan kriteria dengan array where dan jumlah data per halaman
function fields_list_ex(table, where, perpage = null) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table} WHERE ? ${
        perpage > 0 ? "LIMIT ? OFFSET 0" : ""
      }`;
      const params = perpage ? [where, perpage] : [where];
      const results = await query(query, params);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan data dari sebuah tabel berdasarkan primary key dengan urutan tertentu dan jumlah data per halaman
function fields_list_order(
  table,
  pk_field,
  pk_value,
  pk_order,
  perpage = null
) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table} WHERE ${pk_field} = ? ORDER BY ${pk_order} ASC ${
        perpage > 0 ? "LIMIT ? OFFSET 0" : ""
      }`;
      const params = perpage ? [pk_value, perpage] : [pk_value];
      const results = await query(query, params);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan data dari sebuah tabel kecuali data dengan primary key tertentu dan jumlah data per halaman
function fields_except(table, pk_field, pk_value, perpage = null) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table} WHERE ${pk_field} <> ? ${
        perpage > 0 ? "LIMIT ? OFFSET 0" : ""
      }`;
      const params = perpage ? [pk_value, perpage] : [pk_value];
      const results = await query(query, params);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan data dari sebuah tabel kecuali data dengan primary key tertentu dengan kriteria array where dan jumlah data per halaman
function fields_except_ex(table, pk_field, pk_value, where, perpage = null) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table} WHERE ${pk_field} <> ? AND ? ${
        perpage > 0 ? "LIMIT ? OFFSET 0" : ""
      }`;
      const params = perpage ? [pk_value, where, perpage] : [pk_value, where];
      const results = await query(query, params);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan data dari sebuah tabel kecuali data dengan primary key tertentu dan dengan kriteria array where, serta jumlah data per halaman
function fields_except_su(
  table,
  pk_field,
  list_pk_value,
  where,
  perpage = null
) {
  return new Promise(async (resolve, reject) => {
    try {
      const array_pk_value = list_pk_value.split(",");
      const whereCondition = array_pk_value
        .map((value) => `${pk_field} <> ?`)
        .join(" AND ");
      const query = `SELECT * FROM ${table} WHERE ${whereCondition} AND ? ${
        perpage > 0 ? "LIMIT ? OFFSET 0" : ""
      }`;
      const params = perpage
        ? [...array_pk_value, where, perpage]
        : [...array_pk_value, where];
      const results = await query(query, params);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan data dari sebuah tabel hanya berisi field tertentu dengan jumlah data per halaman
function fields_list_field(field, table, pk_field, pk_value, perpage = null) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT ${field} FROM ${table} WHERE ${pk_field} = ? ${
        perpage > 0 ? "LIMIT ? OFFSET 0" : ""
      }`;
      const params = perpage ? [pk_value, perpage] : [pk_value];
      const results = await query(query, params);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan data dari sebuah tabel hanya berisi field tertentu dengan kriteria array where dan jumlah data per halaman
function fields_list_field_ex(field, table, where, perpage = null) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT ${field} FROM ${table} WHERE ? ${
        perpage > 0 ? "LIMIT ? OFFSET 0" : ""
      }`;
      const params = perpage ? [where, perpage] : [where];
      const results = await query(query, params);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan jumlah data dalam sebuah tabel
function num_row(table) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT COUNT(*) AS total FROM ${table}`;
      const results = await query(query, []);
      resolve(results[0].total);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan jumlah data dalam sebuah tabel berdasarkan primary key
function num_rows(table, pk_field, pk_value) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT COUNT(*) AS total FROM ${table} WHERE ${pk_field} = ?`;
      const results = await query(query, pk_value);
      resolve(results[0].total);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan jumlah data dalam sebuah tabel berdasarkan kriteria dengan array where
function num_rows_ex(table, where) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT COUNT(*) AS total FROM ${table} WHERE ?`;
      const results = await query(query, where);
      resolve(results[0].total);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan nilai maksimal dari sebuah field dalam sebuah tabel
function id_max(table, field) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT MAX(${field}) AS max_value FROM ${table}`;
      const results = await query(query, []);
      const max_value = results[0].max_value;
      resolve(max_value ? max_value + 1 : 1);
    } catch (error) {
      reject(error);
    }
  });
}

// Fungsi untuk mendapatkan nilai maksimal dari sebuah field dalam sebuah tabel berdasarkan kriteria dengan array where
function id_max_ex(table, field, where) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT MAX(${field}) AS max_value FROM ${table} WHERE ?`;
      const results = await query(query, where);
      const max_value = results[0].max_value;
      resolve(max_value ? max_value + 1 : 1);
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = {
  field,
  field_ex,
  field_sum,
  field_sum_ex,
  fields,
  fields_list,
  fields_list_ex,
  fields_list_order,
  fields_except,
  fields_except_ex,
  fields_except_su,
  fields_list_field,
  fields_list_field_ex,
  num_row,
  num_rows,
  num_rows_ex,
  id_max,
  id_max_ex,
};
