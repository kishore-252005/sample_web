const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');

// Helper to ask user questions in the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

// Helper for https requests to the GitHub API (no extra dependencies required!)
function githubRequest(method, urlPath, token, bodyData = null) {
  return new Promise((resolve, reject) => {
    const postData = bodyData ? JSON.stringify(bodyData) : '';
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: urlPath,
      method: method,
      headers: {
        'User-Agent': 'node-uploader',
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    };
    
    if (bodyData) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data || '{}'));
        } else {
          reject(new Error(`GitHub API returned status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    if (bodyData) {
      req.write(postData);
    }
    req.end();
  });
}

// Recursively retrieve all file paths in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Exclude build outputs, local keys, and modules
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== '.system_generated' && file !== 'brain' && file !== 'scratch') {
        getAllFiles(filePath, arrayOfFiles);
      }
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

async function main() {
  console.log("========================================");
  console.log("📦 GitHub Node.js Direct File Uploader");
  console.log("========================================\n");
  
  console.log("To upload to GitHub, you need a Personal Access Token (classic).");
  console.log("Create one in your settings with 'repo' permissions: https://github.com/settings/tokens\n");

  const token = (await askQuestion("🔑 Enter your GitHub Personal Access Token: ")).trim();
  if (!token) {
    console.error("❌ Token is required!");
    rl.close();
    return;
  }

  const repoName = (await askQuestion("📂 Enter repository name (e.g. besties-apology): ")).trim();
  if (!repoName) {
    console.error("❌ Repository name is required!");
    rl.close();
    return;
  }

  rl.close();

  try {
    // 1. Get user profile details
    console.log("\n🔄 Authenticating with GitHub...");
    const user = await githubRequest('GET', '/user', token);
    const username = user.login;
    console.log(`\n✅ Authenticated as: ${username}`);

    // 2. Create the repository
    console.log(`\n🔄 Creating repository '${repoName}'...`);
    try {
      await githubRequest('POST', '/user/repos', token, {
        name: repoName,
        description: "Besties Forever interactive apology web application",
        private: false
      });
      console.log("✅ Repository created successfully!");
    } catch (err) {
      if (err.message.includes("422")) {
        console.log("ℹ️ Repository already exists, uploading files to it...");
      } else {
        throw err;
      }
    }

    // 3. Scan local files
    console.log("\n🔍 Scanning files to upload...");
    const rootDir = __dirname;
    const allFiles = getAllFiles(rootDir);
    
    // Ignore uploader script itself and environment secrets
    const filesToUpload = allFiles.filter(f => 
      f !== __filename && 
      !f.includes('.env.local') && 
      !f.includes('.git')
    );

    console.log(`📋 Found ${filesToUpload.length} files to upload.`);

    // 4. Upload each file recursively
    for (const filePath of filesToUpload) {
      const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
      console.log(`⬆️ Uploading: ${relativePath}...`);
      
      const content = fs.readFileSync(filePath);
      const base64Content = content.toString('base64');
      
      // Check if file already exists in repository to get its SHA hash (required to overwrite)
      let sha = undefined;
      try {
        const fileInfo = await githubRequest('GET', `/repos/${username}/${repoName}/contents/${relativePath}`, token);
        sha = fileInfo.sha;
      } catch (e) {
        // File doesn't exist, which is expected
      }

      await githubRequest('PUT', `/repos/${username}/${repoName}/contents/${relativePath}`, token, {
        message: `Upload ${relativePath}`,
        content: base64Content,
        sha: sha
      });
    }

    console.log("\n🚀 ========================================");
    console.log("🎉 SUCCESS! Your project is uploaded to GitHub!");
    console.log(`🔗 Link: https://github.com/${username}/${repoName}`);
    console.log("========================================\n");

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
  }
}

main();
