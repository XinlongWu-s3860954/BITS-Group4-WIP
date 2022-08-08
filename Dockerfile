FROM node:16.16

RUN adduser app
WORKDIR /home/app
USER app

ADD . /home/app
EXPOSE 3000

CMD npm install && npm run dev

# docker image build -t bits .
# docker run -d --name qabot -v "$PWD":/home/app -p 3000:3000 bits