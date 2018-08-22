FROM ubuntu:16.04

RUN apt-get update && apt-get install -y python3 python3-pip locales
RUN pip3 install Flask deb-pkg-tools

RUN mkdir repo
WORKDIR repo
RUN mkdir debian

RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && locale-gen
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8

RUN mkdir /app
COPY publisher.py /app
COPY start_services.sh /app

VOLUME /repo

EXPOSE 5000
EXPOSE 8000

#CMD ls -l /app
CMD /app/start_services.sh