# Sidekeep

## General information

Chrome extension for information gathering. 
It creates a sidebar where users can collect quotes, links and comments.
Collected information can then be exported to Google Doc.
Details in [Chrome Web Store](https://chrome.google.com/webstore/detail/sidekeep-collect-informat/npemijcgijffdalpljalmjifahplkcac)

## Technical overview

The extension is implemented with React using Flux architecture adapted to Chrome extension API. Application state and logic are contained in the background page, while UI is running in the content page. This allows to share state across multiple pages and display changes across multiple pages. The state is persisted in Firebase.
