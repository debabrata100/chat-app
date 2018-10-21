class Users {
    constructor(){
        this.userList = []
    }
    addUser(id, name, room) {
        let user = { id, name, room };
        this.userList.push(user);
        return user;
    }
    removeUser(id) {
      let user = this.getUser(id);
      if(user){
        this.userList = this.userList.filter(user=>user.id !== id);
      }
      return user;
    }
    getUser(id){
        return this.userList.filter(user=>user.id === id)[0];
    }
    getUserList(room){
        let users = this.userList.filter(user=> user.room === room).map(user=>user.name);
        return users;
    }
}
module.exports = { Users };
