
### `Description`

It is an application that lists, user github repositories. It is build using React and Redux.
The app does not require authentication in any kind, the downside of this is that it can only fetch up to 30 repositories at once.
In main view we see the input, where user can type github username he wants to fetch, after little loading, if such repositories exists we are going to see them in the table.
In Table user can sort repositories by columns, and if he wants more information about specific repo, there is a possibility to show detailed info by clicking on the row. Here we can see more information. In this view there are also 2 buttons. We can leave this view by clicking on the button or clicking away from this detailed info dialog.
If a user wanted to fetch the repositories of users that does not have any, or doesn't exist. The application will inform him about it.

### `Installation`
> **You must have node.js installed** 

Once you cloned repository with:
  > git clone https://github.com/FilipKowalski195/github-lister.git
 Go to the created folder na use 
  > npm install 
 It might take a little while, when its finish 
  > npm start 
 Application should start in your localhost:3000 

[![IMAGE Git Lister - Overview video](https://img.youtube.com/vi/Tm0TfDslDpM/0.jpg)](https://www.youtube.com/watch?v=Tm0TfDslDpM)

