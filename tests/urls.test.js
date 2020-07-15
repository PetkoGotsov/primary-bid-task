const request = require('supertest')
const app = require('../dist/index');

describe('Post and Get Url', () => {
    var url;
    it('should create a new url', async () => {
        const res = await request(app)
            .post('/url/api/urls')
            .send({
                value: 'test.com',
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('value');
        url = res.body;
    })
    it('should get list of urls', async () => {
        const res = await request(app)
            .get('/url/api/urls')
        expect(res.statusCode).toEqual(201)
        expect(res.body).toContain(url)
    })
})
