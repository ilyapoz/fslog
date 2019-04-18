#!/bin/bash

git stash && git checkout gh-pages && mv dist/* . && git commit -am 'release' && git push && git checkout - && git
stash pop
