#!/bin/bash
export PATH=$PATH:/usr/local/bin
echo "Current date and time: $(date)"
/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 /Users/vuongbui/portfolio/src/test.py
cd /Users/vuongbui/portfolio
git add . 
git commit
git push
# /usr/local/bin/npm run deploy