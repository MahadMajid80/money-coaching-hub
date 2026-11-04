import * as migration_20261104_122132_initial from './20261104_122132_initial';
import * as migration_20261104_152122_blob_storage from './20261104_152122_blob_storage';
import * as migration_20261104_153200_single_admin from './20261104_153200_single_admin';

export const migrations = [
  {
    up: migration_20261104_122132_initial.up,
    down: migration_20261104_122132_initial.down,
    name: '20261104_122132_initial',
  },
  {
    up: migration_20261104_152122_blob_storage.up,
    down: migration_20261104_152122_blob_storage.down,
    name: '20261104_152122_blob_storage',
  },
  {
    up: migration_20261104_153200_single_admin.up,
    down: migration_20261104_153200_single_admin.down,
    name: '20261104_153200_single_admin'
  },
];
