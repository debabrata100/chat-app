const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=> {
    it('should generate correct mesaage object', ()=> {
        var from = "Deb";
        var text = "Some test";
        let message = generateMessage(from,text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    })
})

describe('generateLocationMessage',()=>{
    it('should generate correct location message',()=>{
        var from  = 'Deb', latitude = 1,longitude = 1;
        var url = 'https://www.google.com/maps?q=1,1';
        let message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});
    })
})
