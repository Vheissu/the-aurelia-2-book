import sqlite from 'sqlite3';

const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database('catstore.db');

export const get = async (query, placeholders) => {
    return new Promise((resolve, reject) => {
        db.get(query, query, (error, row) => {
            if (error) {
                return reject(error);
            }

            return resolve(row);
        });
    });
};

export const all = async (query, placeholders) => {
    return new Promise((resolve, reject) => {
        db.all(query, placeholders, (error, rows) => {
            if (error) {
                return reject(error);
            }

            resolve(rows);
        });
    });
};

export const run = async (query, placeholders): Promise<sqlite.RunResult> => {
    return new Promise((resolve, reject) => {
        db.run(query, placeholders, function(error) {
            if (error) {
                return reject(error);
            }

            resolve(this);
        });
    });
};