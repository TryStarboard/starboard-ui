'use strict';

const join = require('path').join;
const basename = require('path').basename;
const Promise = require('bluebird');
const glob = Promise.promisify(require('glob'));
const co = require('co');
const R = require('ramda');
const mime = require('mime');
const gcloud = require('gcloud')({
  projectId: 'starboard-1277',
  keyFilename: join(__dirname, '../local/starboard-ui-deploy.json'),
});

const gcs = gcloud.storage();
const bucket = gcs.bucket('static.getstarboard.xyz');

Promise.promisifyAll(Object.getPrototypeOf(bucket));

const DEFAULT = {
  gzip: true,
  metadata: {
    cacheControl: 'max-age=31556926'
  },
  public: true,
};

const mergeDest = R.merge(DEFAULT);

co(function *() {
  const files = yield glob(join(__dirname, '../public/*'));
  yield Promise.all(files.map(upload));
})
.catch(console.error);

function upload(file) {
  console.log(`Uploading ${file}`);
  const opts = mergeDest({
    desination: basename(file),
  });
  opts.metadata['contentType'] = mime.lookup(file);
  return bucket.uploadAsync(file, opts);
}
