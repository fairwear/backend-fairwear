#!/bin/bash
docker build  -t fairwear/fairwear-backend --platform linux/amd64 .
docker push fairwear/fairwear-backend