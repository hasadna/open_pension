describe('Testing the env variables', () => {

    it('Testing the env variable: getPort', () => {
        // Test the getenv.
        expect(1).toBe('2');
    });

    it('Testing the env variable: getMongoDb', () => {
        expect(1).toBe('2');
    });

    it('Testing the env variable: getUploadedPath', () => {
        expect(1).toBe('2');
    });
});
