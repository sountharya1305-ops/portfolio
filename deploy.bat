@echo off
set PATH=C:\Program Files\Git\bin;C:\Program Files\GitHub CLI;%PATH%
git add -A
git commit -m "Update contact details with real profile links"
git push origin master
