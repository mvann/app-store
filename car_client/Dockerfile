FROM ubuntu:16.04

RUN apt-get update && apt-get install -y python3 python3-pip locales python3-apt
RUN pip3 install Flask
#RUN python3 -m venv venv

RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && locale-gen
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8

RUN apt-get install -y netcat net-tools
#RUN mkdir -p /opt/ford/etc/apt/
RUN echo "deb http://repo:8000 /" > /etc/apt/sources.list
COPY ./pubring.gpg /root/pubring.gpg
RUN cat /root/pubring.gpg | apt-key add -

EXPOSE 5000
#ENTRYPOINT ["venv/bin/activate"]
