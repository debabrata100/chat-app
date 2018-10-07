const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', ()=> {
    it('should generate correct mesaage object', ()=> {
        var from = "Deb";
        var text = "Some test";
        let message = generateMessage(from,text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    })
})
