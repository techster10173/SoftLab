FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY frontend/build frontend/build
COPY server server

CMD ["python3", "-m" , "flask", "run"]