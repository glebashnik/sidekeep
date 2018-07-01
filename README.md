# Sidekeep

## General information

Chrome extension for information gathering. 
It creates a sidebar where users can collect quotes, links and comments.
Collected information can then be exported to Google Doc.
Details in [Chrome Web Store](https://chrome.google.com/webstore/detail/sidekeep-collect-informat/npemijcgijffdalpljalmjifahplkcac)

## Technical overview

The extension is implemented using React. It implements a Flux architecture adapted to the Chrome extension architecture. Application state and logic are implemented in the background page, while UI is in the content page. This allows to share state across multiple pages, while UI is integrated as a sidebar in multiple pages.
