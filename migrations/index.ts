import * as migration_20261104_122132_initial from './20261104_122132_initial';
import * as migration_20261104_152122_blob_storage from './20261104_152122_blob_storage';

export const migrations = [
  {
    up: migration_20261104_122132_initial.up,
    down: migration_20261104_122132_initial.down,
    name: '20261104_122132_initial',
  },
  {
    up: migration_20261104_152122_blob_storage.up,
    down: migration_20261104_152122_blob_storage.down,
    name: '20261104_152122_blob_storage'
  },
];
