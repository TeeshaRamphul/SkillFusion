import 'dotenv/config'; // Cette ligne DOIT être en haut et sans erreur
import { Sequelize } from 'sequelize';

const PG_URL = process.env.PG_URL || 'postgres://skillfusion:skill_fusion_1234@localhost:5432/skillfusion';

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
});

export { sequelize }