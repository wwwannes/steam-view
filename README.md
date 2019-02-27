![alt text](https://raw.githubusercontent.com/wwwannes/steam-view/master/screenshot.png)

# Steam View

A webapp that uses several API calls to display information for the requested Steam user.

## Local installation
- Add [your Steam API key](https://steamcommunity.com/dev/apikey) in the file 'GlobalVariables.js' that can be found in the folder 'process'
- In your current directory, run the following script to start a server that makes the API calls
```sh
node server.js
```
- To open the project, run the following script in the terminal
```sh
npm run dev
```

## Online installation
- Replace the API calls found in 'process->vue->General->APIcalls.vue' with the API calls found in 'server.js'

## Built With
* [VueJS](https://vuejs.org/) - The Progressive JavaScript Framework
* [Bootstrap](https://getbootstrap.com/)
