# How to detect unfollowers

⚠️ The following steps are for macOS, but the steps for Windows are not very different.

## Prepare
Install [Deno](https://deno.com/).

## Download the HTML of your following
1. Open `https://www.duolingo.com/profile/<your-username>` in Chrome.
1. If it exists, click the "Load More" button at the end of the list.
1. Copy `<html>...</html>` using [Chrome DevTools](https://developer.chrome.com/docs/devtools/accessibility/navigation#outerhtml).
1. Run the command below in Terminal.
  ```shell
  pbpaste > ~/Desktop/following.html
  ```

## Download the HTML of your followers
1. Open `https://www.duolingo.com/profile/<your-username>` in Chrome.
1. If it exists, click the "Load More" button at the end of the list.
1. Copy `<html>...</html>` using [Chrome DevTools](https://developer.chrome.com/docs/devtools/accessibility/navigation#outerhtml).
1. Run the command below in Terminal.
  ```shell
  pbpaste > ~/Desktop/followers.html
  ```

## Find a difference between your following and followers.
Run the following commands in Terminal.
```shell
cd duolingo-unfollower-detector

# Converts `following.html` to `following.txt`, which contains only usernames.
deno run --allow-env --allow-net --allow-read --allow-write main.ts following.html following.txt

# Converts `followers.html` to `followers.txt`, which contains only usernames.
deno run --allow-env --allow-net --allow-read --allow-write main.ts followers.html followers.txt

# Prints usernames that are only found in either `following.txt` or `followers.txt`.
cd ~/Desktop
diff following.txt followers.txt

# Cleans up.
rm followers.html followers.txt following.html following.txt
```
