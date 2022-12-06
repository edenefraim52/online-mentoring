To run this project please follow the following instructions:

1.	Go to the main folder of the project and run the command : npm start
2.	Go to the folder /backend and run the command: npm start
**now the server and the front are running**
3.	In the front page that opened for you go to :" http://localhost:3000/login"
For Login please use the following login info:
Username: eden_efraim
Password: mentor11
**you're logged in as a mentor now and redirected to the lobby page.
4.	Please choose one code block from the lobby. (Choose case 2)
5.	Then choose the student from the list. (Choose aviCohen)
6.	Click submit and you will receive 2 links, one for you and one for the student you chose. Please notice that in the student link, the student needs to log in with his password before he sees the code block.
**open the mentor link and the student link in different browser windows.
**in the student link you need to log in as a student to verify this is the current student:
the student login info:
username: aviCohen (already showing in the username input)
password: cohen
7.	Now you can see the student is able to edit the code and the mentor is able to view the student changes (mentor in read only mode).
8.	In the student editor paste the exact code:
"var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();"
and you will see a big smiley on the screen (for 3 seconds) since you wrote the correct line for solving this code block. ("var self = this;" in line 4 is the addition code that the student added. Notice that the tabs for this line need to be exact as the following line to see the smiley).

Have fun😊

