import 'dotenv/config'; // Cette ligne DOIT être en haut et sans erreur
import { Sequelize } from 'sequelize';

const PG_URL = process.env.PG_URL || 'postgresql://skillfusion_api_1avj_user:S69eCdLVEgD2owU6XqfOSMKvd4Mu1IoA@dpg-d23vbrqdbo4c7389cen0-a.frankfurt-postgres.render.com/skillfusion_api_1avj';

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