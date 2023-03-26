FROM public.ecr.aws/docker/library/node:16.16.0-slim as runner
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.6.4 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT=3000 NODE_ENV=production 
ENV AWS_LWA_ENABLE_COMPRESSION=true
WORKDIR /app
COPY ./public ./public
COPY ./package.json ./package.json
COPY ./.next/standalone ./
# COPY ./.next/static ./.next/static
COPY ./run.sh ./run.sh

RUN ln -s /tmp/cache ./.next/cache

CMD exec ./run.sh