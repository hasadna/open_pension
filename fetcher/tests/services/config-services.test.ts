import {safeGet} from "services/config-service";

describe("Testing the config service", () => {

    const reset = () => {
        jest.resetAllMocks()
        jest.resetModules()
    };

    afterEach(() => reset);
    afterAll(() => reset);

    it('Testing when a key does not exists in the env', () => {
        try {
            safeGet('pizza')
            expect(false).toBeTruthy();
        } catch (e) {
            expect(e.message).toBe('pizza must be defined');
        }
    })

    it('Testing when a key exists in the env', () => {
        process.env['pizza'] = '🍕';
        const pizzaValue = safeGet('pizza');
        expect(pizzaValue).toBe('🍕');
    })
});
