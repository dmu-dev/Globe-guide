export default {
    get: jest.fn().mockResolvedValue({data:{}}),
    // get: jest.fn().m÷
    post: jest.fn(()=>Promise.resolve({data:{}}))
};