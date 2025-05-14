ARG IMG=denoland/deno:2.3.1

# *** COMP *** #
FROM ${IMG} AS comp
WORKDIR /app
    
COPY . .

RUN deno cache .
RUN deno task compile


# *** ROCKET *** #
FROM ${IMG} AS rocket
WORKDIR /app
    
COPY --from=comp /app/app .

CMD ["./app"]