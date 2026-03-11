const { mkdir, readFile, writeFile } = require('fs/promises');
const path = require('path');

function resolvePath(filePath) {
  return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
}

async function saveRegisteredUser(filePath, data) {
  const resolved = resolvePath(filePath);
  const dir = path.dirname(resolved);
  await mkdir(dir, { recursive: true });
  await writeFile(resolved, JSON.stringify(data, null, 2), 'utf-8');
}

async function loadRegisteredUser(filePath) {
  const resolved = resolvePath(filePath);
  const content = await readFile(resolved, 'utf-8');
  return JSON.parse(content);
}

module.exports = { saveRegisteredUser, loadRegisteredUser };
