const fs = require('fs');
const path = require('path');
const https = require('https');

const OWNER = 'maheshs4621-hub';
const REPO = 'shritej';
const TOKEN = 'YOUR_GITHUB_TOKEN';
const ROOT_DIR = 'C:\\Users\\Mahesh\\OneDrive\\Desktop\\website';

const IGNORE_PATTERNS = [
  'node_modules',
  '.next',
  '.git',
  '.gemini',
  'website_backup',
  'cloudflared.exe',
  'test_node.txt',
  '.env.local',
  'push_to_github.js',
  'push_supabase.js',
  'b64.tmp',
  'tools.py'
];

function shouldIgnore(relPath) {
  const parts = relPath.split(path.sep);
  for (const part of parts) {
    if (IGNORE_PATTERNS.includes(part)) return true;
  }
  return false;
}

function getAllFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const relPath = path.relative(baseDir, fullPath);
    if (shouldIgnore(relPath)) continue;
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, baseDir));
    } else {
      results.push({ fullPath, relPath: relPath.replace(/\\/g, '/') });
    }
  }
  return results;
}

function ghRequest(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.github.com',
      path: urlPath,
      method: method,
      headers: {
        'User-Agent': 'NodeJS-Uploader',
        'Authorization': `token ${TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        ...(postData ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) } : {})
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data ? JSON.parse(data) : null);
        } else {
          reject(new Error(`GitHub API ${res.statusCode} ${method} ${urlPath}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function run() {
  const refRes = await ghRequest('GET', `/repos/${OWNER}/${REPO}/git/ref/heads/main`);
  const parentCommitSha = refRes.object.sha;
  const files = getAllFiles(ROOT_DIR);

  const treeItems = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    let content = fs.readFileSync(f.fullPath);
    // Sanitize any accidental PAT token string from pushed files
    let text = content.toString('utf8');
    if (text.includes('ghp_')) {
      text = text.replace(/ghp_[A-Za-z0-9_]+/g, 'YOUR_GITHUB_TOKEN');
      content = Buffer.from(text, 'utf8');
    }
    const base64 = content.toString('base64');
    const blobRes = await ghRequest('POST', `/repos/${OWNER}/${REPO}/git/blobs`, {
      content: base64,
      encoding: 'base64'
    });
    treeItems.push({
      path: f.relPath,
      mode: '100644',
      type: 'blob',
      sha: blobRes.sha
    });
  }

  const treeRes = await ghRequest('POST', `/repos/${OWNER}/${REPO}/git/trees`, {
    tree: treeItems
  });

  const commitRes = await ghRequest('POST', `/repos/${OWNER}/${REPO}/git/commits`, {
    message: 'Add Supabase client configuration, API endpoints & database schema',
    tree: treeRes.sha,
    parents: [parentCommitSha]
  });

  await ghRequest('PATCH', `/repos/${OWNER}/${REPO}/git/refs/heads/main`, {
    sha: commitRes.sha,
    force: true
  });

  console.log('Successfully pushed sanitized Supabase updates to GitHub!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});