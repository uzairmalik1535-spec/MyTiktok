const port = process.env.PORT || 3000;
require('child_process').execSync(`npx next start -p ${port}`, { stdio: 'inherit' });