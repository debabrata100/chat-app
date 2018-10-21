const expect = require('expect');
const {Users} = require('./users');

describe('Users',()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.userList = [
          {id: '1', name: 'Deb', room: 'Node Course'},
          {id: '2', name: 'Max', room: 'React Course'},
          {id: '3', name: 'Andrew', room: 'Node Course'},
      ];
    });


    it('should add a new user',()=>{
        const users = new Users();
        var user = {
            id: '123',
            name: 'Deb',
            room: 'The Office'
        }
        let resUser = users.addUser(user.id, user.name, user.room);
        expect(users.userList).toEqual([resUser]);
    });
    it('should remove a user',()=>{
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.userList.length).toBe(2);
    })
    it('should not remove a user',()=>{
        var userId = '10';
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.userList.length).toBe(3);
    })
    it('should find a user',()=>{
        var userId = '1';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    })
    it('should not find a user',()=>{
        var userId = '10';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    })
    it('should return names for Node Course',()=>{
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Deb','Andrew']);
    })
    it('should return names for React Course',()=>{
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Max']);
    })
})
