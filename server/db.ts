import sqlite from 'sqlite3';
import path from 'path';

const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database(path.join(__dirname, 'catstore.db'));

export const get = async <T = unknown>(query: string, placeholders: unknown[] = []): Promise<T | undefined> => {
    return new Promise((resolve, reject) => {
        db.get(query, placeholders, (error, row) => {
            if (error) {
                return reject(error);
            }

            return resolve(row as T | undefined);
        });
    });
};

export const all = async <T = unknown>(query: string, placeholders: unknown[] = []): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        db.all(query, placeholders, (error, rows) => {
            if (error) {
                return reject(error);
            }

            resolve(rows as T[]);
        });
    });
};

export const run = async (query: string, placeholders: unknown[] = []): Promise<sqlite.RunResult> => {
    return new Promise((resolve, reject) => {
        db.run(query, placeholders, function(error) {
            if (error) {
                return reject(error);
            }

            resolve(this);
        });
    });
};
