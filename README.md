
# Sketch AI: Interactive Whiteboard

SketchAI is an advanced interactive whiteboard application designed for dynamic and collaborative environments. By combining real-time drawing capabilities with AI-driven analysis, SketchAI transforms the way teams collaborate and communicate. Whether in educational settings, remote meetings, or creative brainstorming sessions, SketchAI enhances user interaction with intelligent feedback and suggestions based on live content generation.

# How to run

git clone https://github.com/Saisiva123/Sketchboard.git

cd Sketchboard

npm install

npm run dev

# Install nginx

And edit the nginx.conf file as below

http {
  server {
        listen 8080;

        location / {
            proxy_pass http://localhost:3000;
        }

        location /api/ { 
            proxy_pass http://localhost:4000/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
  }
