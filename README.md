# BraggingPositions

A Discord Bot made to track you and your friends' stock and options purchases. BraggingPositions supports cross-channel log tracking by storing entries in JSON files. In future iterations I'd like to add support for live stock trading, but the free APIs available currently seem to be lacking. 


**Made with Node.js and Discord.js v14.7**


**Steps for deployment**


**Step 1**: Install node.js


**Step 2**: Run the 'setup environment' batch file included in the zip.


**Step 3**: Copy and paste your personal bot API token into tokenfile.json (do not share this token)


**Step 4**: Run the 'start' batch file.



# **Commands**


![7cc6417f05881f9d5064a227fbda287c](https://user-images.githubusercontent.com/113802864/204685160-81267af8-b7ef-4372-bc3d-ebf2eab160d8.png)



# **JSON Storage**
**sharestorage.JSON and storage.JSON locally store any valid commands that have been processed by the bot. Please ensure that the files are not empty or else storage functionality willl fail.**

![8b74c30386a01321d1912e65d3271109](https://user-images.githubusercontent.com/113802864/204685538-45f0ab13-849c-424e-81c0-e7bef7e26e10.png)



# **Prefixes**
The default prefix is '!', however this value can be modified in botconfig.JSON
