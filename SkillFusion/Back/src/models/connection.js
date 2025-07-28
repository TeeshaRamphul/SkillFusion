import 'dotenv/config';
import { Sequelize } from 'sequelize';

const PG_URL = process.env.PG_URL;

if (!PG_URL) {
  throw new Error('PG_URL environment variable is required');
}

const sequelize = new Sequelize(PG_URL, {
  dialect: 'postgres',
  define: {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  logging: process.env.NODE_ENV === 'test' ? false : console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export { sequelize };
