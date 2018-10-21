const expect = require('expect');
const {isRealString} = require('./validation');
describe("isRealString",()=>{
    it("should reject non string values",()=>{
        var res = isRealString(1);
        expect(res).toBe(false);
    })
    it("should reject string only with spaces",()=>{
        var res = isRealString('  ');
        expect(res).toBe(false);
    })
    it("should allow string with non-space character",()=>{
        var res = isRealString(" Deb ");
        expect(res).toBe(true);
    })
})
