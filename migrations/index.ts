import * as migration_20261104_122132_initial from './20261104_122132_initial';
import * as migration_20261104_152122_blob_storage from './20261104_152122_blob_storage';
import * as migration_20261104_153200_single_admin from './20261104_153200_single_admin';
import * as migration_20261105_081630_security_hardening from './20261105_081630_security_hardening';
import * as migration_20261112_090000_crypto_three_sessions from './20261112_090000_crypto_three_sessions';
import * as migration_20261113_160000_blog_article_1 from './20261113_160000_blog_article_1';
import * as migration_20261113_170000_blog_article_1_cover from './20261113_170000_blog_article_1_cover';
import * as migration_20261114_140000_column_bets_husband from './20261114_140000_column_bets_husband';
import * as migration_20261115_230000_blog_week_16_nov from './20261115_230000_blog_week_16_nov';
import * as migration_20261115_235500_blog_week_16_nov_tidy_media from './20261115_235500_blog_week_16_nov_tidy_media';
import * as migration_20261118_090000_january_crypto_ta from './20261118_090000_january_crypto_ta';
import * as migration_20261118_100000_restore_ta_content from './20261118_100000_restore_ta_content';
import * as migration_20261118_110000_restore_crypto_content from './20261118_110000_restore_crypto_content';
import * as migration_20261118_120000_ta_included_reviews from './20261118_120000_ta_included_reviews';
import * as migration_20261118_130000_ta_dedupe from './20261118_130000_ta_dedupe';
import * as migration_20261118_140000_home_side_hustle_card from './20261118_140000_home_side_hustle_card';
import * as migration_20261120_090000_side_hustle_open_booking from './20261120_090000_side_hustle_open_booking';

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
    name: '20261104_153200_single_admin',
  },
  {
    up: migration_20261105_081630_security_hardening.up,
    down: migration_20261105_081630_security_hardening.down,
    name: '20261105_081630_security_hardening'
  },
  {
    up: migration_20261112_090000_crypto_three_sessions.up,
    down: migration_20261112_090000_crypto_three_sessions.down,
    name: '20261112_090000_crypto_three_sessions',
  },
  {
    up: migration_20261113_160000_blog_article_1.up,
    down: migration_20261113_160000_blog_article_1.down,
    name: '20261113_160000_blog_article_1',
  },
  {
    up: migration_20261113_170000_blog_article_1_cover.up,
    down: migration_20261113_170000_blog_article_1_cover.down,
    name: '20261113_170000_blog_article_1_cover',
  },
  {
    up: migration_20261114_140000_column_bets_husband.up,
    down: migration_20261114_140000_column_bets_husband.down,
    name: '20261114_140000_column_bets_husband',
  },
  {
    up: migration_20261115_230000_blog_week_16_nov.up,
    down: migration_20261115_230000_blog_week_16_nov.down,
    name: '20261115_230000_blog_week_16_nov',
  },
  {
    up: migration_20261115_235500_blog_week_16_nov_tidy_media.up,
    down: migration_20261115_235500_blog_week_16_nov_tidy_media.down,
    name: '20261115_235500_blog_week_16_nov_tidy_media',
  },
  {
    up: migration_20261118_090000_january_crypto_ta.up,
    down: migration_20261118_090000_january_crypto_ta.down,
    name: '20261118_090000_january_crypto_ta',
  },
  {
    up: migration_20261118_100000_restore_ta_content.up,
    down: migration_20261118_100000_restore_ta_content.down,
    name: '20261118_100000_restore_ta_content',
  },
  {
    up: migration_20261118_110000_restore_crypto_content.up,
    down: migration_20261118_110000_restore_crypto_content.down,
    name: '20261118_110000_restore_crypto_content',
  },
  {
    up: migration_20261118_120000_ta_included_reviews.up,
    down: migration_20261118_120000_ta_included_reviews.down,
    name: '20261118_120000_ta_included_reviews',
  },
  {
    up: migration_20261118_130000_ta_dedupe.up,
    down: migration_20261118_130000_ta_dedupe.down,
    name: '20261118_130000_ta_dedupe',
  },
  {
    up: migration_20261118_140000_home_side_hustle_card.up,
    down: migration_20261118_140000_home_side_hustle_card.down,
    name: '20261118_140000_home_side_hustle_card',
  },
  {
    up: migration_20261120_090000_side_hustle_open_booking.up,
    down: migration_20261120_090000_side_hustle_open_booking.down,
    name: '20261120_090000_side_hustle_open_booking',
  },
];
