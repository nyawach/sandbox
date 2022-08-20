FROM ruby:3.1

RUN mkdir /web-root

RUN apt-get update && \
    apt-get install -y \
        nodejs \
        npm \
        yarn

WORKDIR /web-root

COPY Gemfile Gemfile.lock ./

RUN gem update --system && \
    bundle update --bundler && \
    bundle install

COPY . ./

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
